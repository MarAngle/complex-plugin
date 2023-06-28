/* eslint-disable @typescript-eslint/no-unused-vars */
export type noticeMsgType = 'success' | 'error' | 'info' | 'warn'

export type noticeType = {
  [prop: string]: (...args: any[]) => any
  showMsg: (content: string, type?: noticeMsgType, title?: string, duration?: number, option?: any) => void,
  alert: (content: string, title?: string, next?: (act: string) => void, okText?: string) => void,
  confirm: (content: string, title?: string, next?: (act: string) => void, okText?: string, cancelText?: string) => void
}

const notice: noticeType = {
  showMsg: function(content, type, title, duration, option = {}) {
    console.error('notice对应方法未定义')
  },
  alert: function(content, title, next, okText) {
    console.error('notice对应方法未定义')
  },
  confirm: function(content, title, next, okText, cancelText) {
    console.error('notice对应方法未定义')
  },
  init(options: noticeType) {
    for (const prop in options) {
      this[prop] = options[prop]
    }
  }
}

export default notice
