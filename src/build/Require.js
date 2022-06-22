import axios from 'axios'
import Data from './Data'
import config from '../../config'
import RequireRule from './RequireRule'
import noticeData from './../option/noticeData'
import { getEnv } from './../data/environment/index'
import getType from '../data/type/getType'
import isArray from '../data/type/isArray'
import jsonToForm from './../data/object/jsonToForm'

class Require extends Data {
  constructor (initdata) {
    super()
    this.api = {
      baseURL: ''
    }
    this.rule = {}
    this.status = {
      403: '拒绝访问!',
      404: '很抱歉，资源未找到!',
      504: '网络超时!'
    }
    if (initdata) {
      this.initMain(initdata)
    }
  }
  initMain({ api, option, rule, status }) {
    this.$initApi(api)
    this.$initService(option)
    this.$initRule(rule)
    this.$initStatus(status)
  }
  /**
   * 加载api
   * @param {object} api
   * @param {string} api.baseURL
   */
  $initApi (api) {
    if (api && api.baseURL) {
      this.api.baseURL = api.baseURL
    }
  }
  /**
   * 创建option
   * @param {object} option
   * @returns {object}
   */
  $buildOption (option = {}) {
    if (!option.headers) {
      option.headers = {}
    }
    if (!option.headers['Content-Type']) {
      option.headers['Content-Type'] = 'text/plain;charset=UTF-8'
    }
    return option
  }
  /**
   * 构建service
   * @param {*} option
   * @returns {axios}
   */
  $buildService(option) {
    return axios.create(this.$buildOption(option))
  }
  /**
   * 创建service
   * @param {*} option
   */
  $initService (option) {
    this.service = this.$buildService(option)
  }
  /**
   * 加载规则
   * @param {object} rule
   * @param {RequireRule initdata} rule[prop]
   */
  $initRule (rule) {
    let firstProp
    for (let n in rule) {
      let ruleOption = rule[n]
      this.rule[ruleOption.prop] = new RequireRule(ruleOption)
      if (!firstProp) {
        firstProp = ruleOption.prop
      }
    }
    if (!this.rule.default) {
      this.rule.default = this.rule[firstProp]
    }
    if (getEnv('real') == 'development' && config.Require.devShowRule) {
      this.$exportMsg(`默认的请求规则处理程序为[${this.rule.default.$selfName()}]`, 'log')
    }
  }
  /**
   * 加载状态翻译值
   * @param {object} status
   */
  $initStatus (status = {}) {
    for (let n in status) {
      this.status[n] = status[n]
    }
  }
  /**
   * 检查获取当前url对应的rule
   * @param {string} url
   * @returns {RequireRule}
   */
  $checkRule (url) {
    for (let n in this.rule) {
      let fg = this.rule[n].checkUrl(url)
      if (fg) {
        return this.rule[n]
      }
    }
    return this.rule.default
  }
  /**
   * 格式化URL
   * @param {string} url
   * @returns {string}
   */
  $formatUrl (url) {
    if (this.formatUrl) {
      return this.formatUrl(url, this.api.baseURL)
    } else {
      if (this.api.baseURL && url.indexOf('https://') != 0 && url.indexOf('http://') != 0) {
        // 当前URL不以http/https开始，则认为此URL需要添加默认前缀
        url = this.api.baseURL + url
      }
      return url
    }
  }
  /**
   * 调用service进行axios请求
   * @param {*} optionData
   * @returns {Promise}
   */
  ajax (optionData = {}) {
    return new Promise((resolve, reject) => {
      this.service(optionData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
  /**
   * 传参检查和格式化
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为get
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {string} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'json' | 'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'json' | 'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @param {object} [defaultOptionData] 默认参数重置method/requestDataType/requestCurrentDataType/responseType
   * @returns {check}
   */
  $check (optionData, defaultOptionData = {}) {
    let check = {
      next: true,
      code: '',
      msg: ''
    }
    // 检查参数
    if (getType(optionData, true) != 'object') {
      check.next = false
      check.code = 'undefined optionData'
      check.msg = '未定义请求数据'
    } else {
      optionData.url = this.$formatUrl(optionData.url)
      // 检查URL
      if (!optionData.url) {
        check.next = false
        check.code = 'undefined URL'
        check.msg = '未定义请求地址'
      } else {
        // 检查RULE
        let ruleItem = this.$checkRule(optionData.url)
        if (!ruleItem) {
          check.next = false
          check.code = 'undefined rule'
          check.msg = '未检索到对应规则'
        } else {
          // 添加默认值
          if (!optionData.method) {
            optionData.method = defaultOptionData.method || 'get'
          }
          if (!optionData.data) {
            optionData.data = {}
          }
          if (!optionData.params) {
            optionData.params = {}
          }
          if (!optionData.headers) {
            optionData.headers = {}
          }
          if (!optionData.responseType) {
            optionData.responseType = defaultOptionData.responseType || 'json'
          }
          if (!optionData.requestDataType) {
            optionData.requestDataType = defaultOptionData.requestDataType || 'json'
          }
          if (!optionData.requestCurrentDataType) {
            optionData.requestCurrentDataType = defaultOptionData.requestCurrentDataType || 'json'
          }
          if (optionData.responseFormat === undefined) {
            optionData.responseFormat = defaultOptionData.responseFormat === undefined ? true : defaultOptionData.responseFormat
          }
          // RequireRule检查
          let ruleCheck = ruleItem.format(optionData)
          if (ruleCheck && !ruleCheck.next) {
            check.next = false
            check.code = ruleCheck.code
            check.msg = ruleCheck.msg
            ruleItem.tokenFail(ruleCheck.prop)
          } else {
            check.ruleItem = ruleItem
          }
        }
      }
    }
    return check
  }
  /**
   * 请求主函数
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为get
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {object} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'json' | 'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'json' | 'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @param {object} [defaultOptionData] 默认参数重置method/requestDataType/requestCurrentDataType/responseType
   * @returns {optionData}
   */
  require (optionData, defaultOptionData) {
    let check = this.$check(optionData, defaultOptionData)
    if (check.next) {
      if (optionData.requestDataType == 'formdata') {
        if (optionData.headers['Content-Type'] === undefined) {
          optionData.headers['Content-Type'] = config.Require.formContentType
        }
        if (optionData.requestCurrentDataType == 'json') {
          optionData.data = jsonToForm(optionData.data)
        }
      } else if (optionData.requestDataType == 'json') {
        optionData.data = JSON.stringify(optionData.data)
      }
      // 新版本单独处理此逻辑
      if (optionData.params) {
        for (let n in optionData.params) {
          if (isArray(optionData.params[n])) {
            optionData.params[n] = optionData.params[n].join(',')
          }
        }
      }
      return this.$requireNext(optionData, check)
    } else {
      this.$showFailMsg(true, optionData.failMsg, check.msg, 'error')
      return Promise.reject({ status: 'fail', ...check })
    }
  }
  /**
   * 请求下一步操作
   */
  $requireNext (optionData, check) {
    return new Promise((resolve, reject) => {
      this.ajax(optionData).then(response => {
        if (optionData.responseFormat && optionData.responseType == 'json') {
          let nextdata = check.ruleItem.check(response, optionData)
          if (nextdata.status == 'success') {
            resolve(nextdata)
          } else if (nextdata.status == 'login') {
            this.$showFailMsg(false, optionData.failMsg, nextdata.msg, 'error')
            reject(nextdata)
          } else if (nextdata.status == 'fail') {
            this.$showFailMsg(false, optionData.failMsg, nextdata.msg, 'error')
            reject(nextdata)
          }
        } else if (!optionData.responseFormat) {
          resolve({
            status: 'success',
            code: 'unFormat',
            data: response
          })
        } else {
          resolve({
            status: 'success',
            code: 'unJson',
            data: response
          })
        }
      }, error => {
        console.error(error)
        let errRes = this.requireFail(error, optionData, check.ruleItem)
        this.$showFailMsg(true, optionData.failMsg, errRes.msg, 'error', '警告')
        reject(errRes)
      })
    })
  }
  /**
   * 请求失败回调
   * @param {*} error
   * @param {*} optionData
   * @param {*} ruleItem
   * @returns
   */
  requireFail (error, optionData, ruleItem) {
    let errRes = {
      status: 'fail',
      optionData: optionData,
      error: error
    }
    if (error.response) {
      errRes.code = 'server error'
      let msg = ruleItem.requireFail(errRes)
      if (!msg) {
        msg = this.parseStatus(error.response.status)
        if (!msg) {
          msg = config.Require.failMsg
        }
      }
      if (errRes.msg === undefined) {
        errRes.msg = msg
      }
    } else {
      errRes.code = 'require error'
      errRes.msg = config.Require.failMsg
    }
    return errRes
  }
  /**
   * 获取status翻译值
   * @param {number} status
   * @returns {string}
   */
  parseStatus (status) {
    if (status && this.status[status]) {
      return this.status[status]
    } else {
      return ''
    }
  }
  /**
   * 自动显示失败msg
   * @param {boolean} checkFail 检查失败时的回调
   * @param {*} failMsgOption
   * @param {*} content
   * @param {*} type
   * @param {*} title
   */
  $showFailMsg (checkFail, failMsgOption, content, type, title) {
    if (failMsgOption === undefined || failMsgOption === true) {
      failMsgOption = {
        show: true
      }
    } else if (!failMsgOption) {
      failMsgOption = {
        show: false
      }
    }
    if (failMsgOption.show) {
      if (checkFail && !failMsgOption.check) {
        // 检查失败且check为否：未单独设置，则此时按照content值为基准，此时的错误是非后端接口造成的
      } else if (failMsgOption.content) {
        content = failMsgOption.content
      }
      if (failMsgOption.type) {
        type = failMsgOption.type
      }
      if (failMsgOption.title) {
        title = failMsgOption.title
      }
      if (content) {
        noticeData.showmsg(content, type, title)
      }
    }
  }
  /**
   * get请求
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为get
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {string} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'json' | 'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'json' | 'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @returns {Promise}
   */
  get (optionData) {
    return this.require(optionData, { method: 'get' })
  }
  /**
   * post请求
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为post
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {string} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'json' | 'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'json' | 'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @returns {Promise}
   */
  post (optionData) {
    return this.require(optionData, { method: 'post' })
  }
  /**
   * delete请求
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为delete
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {string} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'json' | 'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'json' | 'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @returns {Promise}
   */
  delete (optionData) {
    return this.require(optionData, { method: 'delete' })
  }
  /**
   * put请求
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为put
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {string} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'json' | 'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'json' | 'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @returns {Promise}
   */
  put (optionData) {
    return this.require(optionData, { method: 'put' })
  }
  /**
   * post请求form类型,requestDataType默认为formdata
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为post
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {string} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'json' | 'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @returns {Promise}
   */
  postform (optionData) {
    return this.require(optionData, { method: 'post', requestDataType: 'formdata' })
  }
  /**
   * post请求formfile类型,requestDataType/requestCurrentDataType默认为formdata
   * @param {object} optionData 参数
   * @param {string} optionData.url 请求地址
   * @param {string} optionData.method 请求方式,默认为post
   * @param {object} optionData.params url(query参数)
   * @param {object} optionData.data body参数
   * @param {string} optionData.headers header参数
   * @param {string | object | any[]} optionData.token token
   * @param {'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'} optionData.responseType 返回数据类型
   * @param {'formdata'} optionData.requestDataType 接口需要的数据类型
   * @param {'formdata'} optionData.requestCurrentDataType 当前data的数据类型
   * @param {boolean} optionData.responseFormat 是否对返回数据进行分析和格式化,默认为true
   * @returns {Promise}
   */
  postfile (optionData) {
    return this.require(optionData, { method: 'post', requestDataType: 'formdata', requestCurrentDataType: 'formdata' })
  }
  /**
   * 设置token
   * @param {string} tokenName token名称
   * @param {*} data token值
   * @param {string} prop 对应的rule.prop
   */
  setToken (tokenName, data, prop = 'default') {
    if (this.rule[prop]) {
      this.rule[prop].setToken(tokenName, data)
    } else {
      this.$exportMsg(`未找到[${tokenName}:${prop}]对应的规则处理程序！`)
    }
  }
  /**
   * 获取指定token的值
   * @param {string} tokenName token名称
   * @param {string} prop 对应的rule.prop
   */
  getToken (tokenName, prop = 'default') {
    if (this.rule[prop]) {
      return this.rule[prop].getToken(tokenName)
    } else {
      this.$exportMsg(`未找到[${tokenName}:${prop}]对应的规则处理程序！`)
      return false
    }
  }
  /**
   * 清除token
   * @param {string} tokenName token名称
   * @param {string} prop 对应的rule.prop
   * @returns {boolean}
   */
  removeToken (tokenName, prop = 'default') {
    if (this.rule[prop]) {
      return this.rule[prop].removeToken(tokenName)
    } else {
      this.$exportMsg(`未找到[${tokenName}:${prop}]对应的规则处理程序！`)
      return false
    }
  }
  /**
   * 删除token
   * @param {string} tokenName token名称
   * @param {string} prop 对应的rule.prop
   * @returns {boolean}
   */
  deleteToken (tokenName, prop = 'default') {
    if (this.rule[prop]) {
      return this.rule[prop].deleteToken(tokenName)
    } else {
      this.$exportMsg(`未找到[${tokenName}:${prop}]对应的规则处理程序！`)
      return false
    }
  }
  $selfName () {
    let ruleName = []
    for (let n in this.rule) {
      ruleName.push(this.rule[n].$selfName())
    }
    return `(${super.$selfName()}:[${ruleName.join(',')}])`
  }
}

Require.$name = 'Require'

export default Require
