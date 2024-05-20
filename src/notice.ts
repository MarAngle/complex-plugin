/* eslint-disable @typescript-eslint/no-unused-vars */
export type noticeMsgType = 'success' | 'error' | 'info' | 'warn'

export type noticeType = {
  showMsg: (content: string, type?: noticeMsgType, title?: string, duration?: number, option?: unknown) => void
  alert: (content: string, title?: string, next?: (act: string) => void, okText?: string) => void
  confirm: (content: string, title?: string, next?: (act: string) => void, okText?: string, cancelText?: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: (...args: any[]) => any
}

const notice: noticeType = {
  showMsg: function(_content, _type, _title, _duration, _option = {}) {
    console.error('notice对应方法未定义')
  },
  alert: function(_content, _title, _next, _okText) {
    console.error('notice对应方法未定义')
  },
  confirm: function(_content, _title, _next, _okText, _cancelText) {
    console.error('notice对应方法未定义')
  },
  init(options: noticeType) {
    for (const prop in options) {
      this[prop] = options[prop]
    }
  }
}

export default notice
