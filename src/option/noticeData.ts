/* eslint-disable @typescript-eslint/no-unused-vars */
import { anyFunction } from './../ts/index'

export type noticeDataMsgType = 'success' | 'error' | 'info' | 'warn'

export type noticeDataType = {
  [prop: string]: anyFunction
  showMsg: (content: string, type?: noticeDataMsgType, title?: string, duration?: number, option?: any) => void,
  alert: (content: string, title?: string, next?: (act: string) => void, okText?: string) => void,
  confirm: (content: string, title?: string, next?: (act: string) => void, okText?: string, cancelText?: string) => void
}

const noticeData: noticeDataType = {
  setMsg: function(...args) {
    console.error('notice对应方法未定义')
  },
  showMsg: function(content, type, title, duration, option = {}) {
    console.error('notice对应方法未定义')
  },
  setModal: function(...args) {
    console.error('notice对应方法未定义')
  },
  alert: function(content, title, next, okText) {
    console.error('notice对应方法未定义')
  },
  confirm: function(content, title, next, okText, cancelText) {
    console.error('notice对应方法未定义')
  }
}

export default noticeData
