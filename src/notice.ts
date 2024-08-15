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

let wait = {
  console: false,
  list: [] as { method: keyof noticeOption, args: IArguments }[],
  push(method: keyof noticeOption, args: IArguments) {
    if (!this.console) {
      console.error('notice对应方法未定义，等待定义后重新触发！')
      this.console = true
    }
    this.list.push({
      method,
      args
    })
  },
  trigger(notice: noticeType) {
    this.list.forEach(item => {
      notice[item.method](...item.args)
    })
    this.list = []
  }
}

const notice: noticeType = {
  message: function(_content, _type, _title, _duration, _option = {}) {
    wait.push('message ', arguments)
  },
  alert: function(_content, _title, _next, _okText) {
    wait.push('alert', arguments)
  },
  confirm: function(_content, _title, _next, _okText, _cancelText) {
    wait.push('confirm', arguments)
  },
  init(options: noticeOption) {
    for (const prop in options) {
      this[prop as keyof noticeOption] = options[prop as keyof noticeOption] as any
    }
    wait.trigger(this)
  }
}

export default notice
