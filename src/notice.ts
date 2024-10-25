import { Wait } from "complex-utils"

export type messageType = 'success' | 'error' | 'info' | 'warn'

export type debugConfirmOption = {
  content: string
  next: (operate: '' | 'ok' | 'cancel' | 'timeout', development: boolean, debugLevel: number) => void
  development?: boolean
  debugLevel?: number
  offset?: number
  okText?: string
  cancelText?: string
}

export interface noticeOption {
  message: (content: string, type?: messageType, title?: string, duration?: number, option?: unknown) => void
  alert: (content: string, title?: string, next?: (operate: string) => void, okText?: string) => void
  confirm: (content: string, title?: string, next?: (operate: string) => void, okText?: string, cancelText?: string) => void
  debugConfirm: (option: debugConfirmOption) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: (...args: any[]) => any
}

export interface noticeType extends noticeOption {
  init: (options: noticeOption) => void
  $debugConfirm: (development: boolean, debugLevel: number, option: debugConfirmOption) => void
}

let wait: undefined | Wait = new Wait({
  console: 'notice对应方法未定义，等待定义后重新触发！'
})

const notice: noticeType = {
  message: function(_content, _type, _title, _duration, _option = {}) {
    wait!.push(() => {
      notice.message(_content, _type, _title, _duration, _option)
    })
  },
  alert: function(_content, _title, _next, _okText) {
    wait!.push(() => {
      notice.alert(_content, _title, _next, _okText)
    })
  },
  confirm: function(_content, _title, _next, _okText, _cancelText) {
    wait!.push(() => {
      notice.confirm(_content, _title, _next, _okText, _cancelText)
    })
  },
  $debugConfirm(development: boolean, debugLevel: number, option: debugConfirmOption) {
    const targerDebugLevel = option.debugLevel || 0
    if (debugLevel > targerDebugLevel || (development && option.development !== false)) {
      // debug级别大于设置的触发级别时或开发模式下且未设置开发模式不确认情况
      let isTimeout = false
      const timer = setTimeout(function() {
        isTimeout = true
        option.next('timeout', development, debugLevel)
      }, option.offset || 5000)
      notice.confirm(option.content, debugLevel > targerDebugLevel ? '调试模式操作确认' : '开发模式操作确认', function(act) {
        if (!isTimeout) {
          // 未超时则操作后取消定时器
          clearTimeout(timer)
          if (act === 'ok') {
            option.next('ok', development, debugLevel)
          } else {
            option.next('cancel', development, debugLevel)
          }
        }
        // 超时已经触发回调,此处不做任何处理,避免回调的2次调用
      }, option.okText, option.cancelText)
    } else {
      option.next('', development, debugLevel)
    }
  },
  debugConfirm: function(_option) {
    wait!.push(() => {
      notice.debugConfirm(_option)
    })
  },
  init(options: noticeOption) {
    for (const prop in options) {
      this[prop as keyof noticeOption] = options[prop as keyof noticeOption] as any
    }
    wait!.trigger()
    wait = undefined
  }
}

export default notice
