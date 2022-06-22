
import { AxiosInstance } from 'axios'
import RequireRule from './../../../build/RequireRule'


export type optionApi = {
  baseURL: string,
  [prop: PropertyKey]: any
}

export type optionType = {
  api: optionApi,
  rule: {
    [prop: PropertyKey]: RequireRule
  },
  status: {
    [prop: PropertyKey]: string
  },
  service?: AxiosInstance
}



let option: optionType = {
  api: {
    baseURL: ''
  },
  rule: {},
  status: {
    403: '拒绝访问!',
    404: '很抱歉，资源未找到!',
    504: '网络超时!'
  },
  service: undefined
}

export default option
  