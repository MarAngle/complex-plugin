import { Wait } from "complex-utils"

export type messageType = 'success' | 'error' | 'info' | 'warn'

export interface noticeOption {
  message: (content: string, type?: messageType, title?: string, duration?: number, option?: unknown) => void
  alert: (content: string, title?: string, next?: (act: string) => void, okText?: string) => void
  confirm: (content: string, title?: string, next?: (act: string) => void, okText?: string, cancelText?: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: (...args: any[]) => any
}

export interface noticeType extends noticeOption {
  init: (options: noticeOption) => void
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
  init(options: noticeOption) {
    for (const prop in options) {
      this[prop as keyof noticeOption] = options[prop as keyof noticeOption] as any
    }
    wait!.trigger()
    wait = undefined
  }
}

export default notice
