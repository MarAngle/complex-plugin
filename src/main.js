// type加载
import checkComplex from './data/type/checkComplex'
import getTag from './data/type/getTag'
import getType from './data/type/getType'
import isArray from './data/type/isArray'
import isBlob from './data/type/isBlob'
import isComplex from './data/type/isComplex'
import isDate from './data/type/isDate'
import isEmpty from './data/type/isEmpty'
import isEmptyArray from './data/type/isEmptyArray'
import isEmptyObject from './data/type/isEmptyObject'
import isError from './data/type/isError'
import isExist from './data/type/isExist'
import isFile from './data/type/isFile'
import isPromise from './data/type/isPromise'
import isRegExp from './data/type/isRegExp'
import isSymbol from './data/type/isSymbol'
import isSame from './data/type/isSame'
// type加载完成
// number加载
import formatNum from './data/number/formatNum'
import getDecimal from './data/number/getDecimal'
import getInteger from './data/number/getInteger'
import getNum from './data/number/getNum'
import getRandomNum from './data/number/getRandomNum'
import parseNum from './data/number/parseNum'
// number加载完成
// string加载
import fillString from './data/string/fillString'
import findTargetInStr from './data/string/findTargetInStr'
import getRandomData from './data/string/getRandomData'
import getRandomInList from './data/string/getRandomInList'
import getRandomLetter from './data/string/getRandomLetter'
import strCodeNum from './data/string/strCodeNum'
// string加载完成
// object加载
import appendProp from './data/object/appendProp'
import arrayClearOther from './data/object/arrayClearOther'
import choiceProp from './data/object/choiceProp'
import clearArray from './data/object/clearArray'
import deepClone from './data/object/deepClone'
import deepCloneData from './data/object/deepCloneData'
import deepCloneDataWithOption from './data/object/deepCloneDataWithOption'
import defineProperty from './data/object/defineProperty'
import formatDataByType from './data/object/formatDataByType'
import formatList from './data/object/formatList'
import formatTree from './data/object/formatTree'
import getDefaultData from './data/object/getDefaultData'
import getProp from './data/object/getProp'
import getPropByList from './data/object/getPropByList'
import hasProp from './data/object/hasProp'
import jsonToForm from './data/object/jsonToForm'
import mergeData from './data/object/mergeData'
import orderArrayByProp from './data/object/orderArrayByProp'
import setDataByDefault from './data/object/setDataByDefault'
import setDefaultData from './data/object/setDefaultData'
import setProp from './data/object/setProp'
import setPropByList from './data/object/setPropByList'
import setPropByType from './data/object/setPropByType'
import showArrayProp from './data/object/showArrayProp'
import updateData from './data/object/updateData'
import updateDataWidthOption from './data/object/updateDataWidthOption'
import updateList from './data/object/updateList'
// object加载完成
// reactive加载
import defineReactive from './data/reactive/defineReactive'
import defineWatch from './data/reactive/defineWatch'
// reactive加载
// observe加载
// import observe from './data/observe/observe'
// import Watcher from './data/observe/Watcher'
// observe加载
// function加载
import runFunction from './data/function/runFunction'
import triggerFunc from './data/function/triggerFunc'
import triggerPromise from './data/function/triggerPromise'
// function加载
// utils加载
import debounce from './data/utils/debounce'
import downloadBlob from './data/utils/downloadBlob'
import downloadFile from './data/utils/downloadFile'
import downloadFileByAnchor from './data/utils/downloadFileByAnchor'
import localEncodeURIComponent from './data/utils/localEncodeURIComponent'
import formatQueryUrl from './data/utils/formatQueryUrl'
import getCurrentUrl from './data/utils/getCurrentUrl'
import getLimitData from './data/utils/getLimitData'
import getQueryData from './data/utils/getQueryData'
import getQueryUrl from './data/utils/getQueryUrl'
import isOriginUrl from './data/utils/isOriginUrl'
import loadContents from './data/utils/loadContents'
import openAnchor from './data/utils/openAnchor'
import openWindow from './data/utils/openWindow'
import exportSelfMsg from './data/utils/exportSelfMsg'
import exportMsg from './data/utils/exportMsg'
import parseUrl from './data/utils/parseUrl'
import promiseAllFinished from './data/utils/promiseAllFinished'
import showJson from './data/utils/showJson'
import throttle from './data/utils/throttle'
import transformFile from './data/utils/transformFile'
import trimData from './data/utils/trimData'
// utils加载完成
// local加载
import getLocalData from './data/local/getLocalData'
import removeLocalData from './data/local/removeLocalData'
import setLocalData from './data/local/setLocalData'
import setLocalDataPre from './data/local/setLocalDataPre'
// local加载完成
// time加载
import formatTime from './data/time/formatTime'
import getOffsetTime from './data/time/getOffsetTime'
import getOffsetTimeStr from './data/time/getOffsetTimeStr'
import parseTime from './data/time/parseTime'
import showTime from './data/time/showTime'
// time加载完成
// environment加载
import {
  checkUseItem,
  getCanUse,
  getEnv,
  getEnvMode,
  setCanUse,
  setEnv,
  setEnvMode,
  resetEnvData
} from './data/environment/index'
// environment加载完成
// worker加载
import setWorker from './data/worker/setWorker'
// worker加载完成
// rule加载
import buildRule from './data/rule/buildRule'
import checkRule from './data/rule/checkRule'
// rule加载完成
import page from './data/page'
import current from './data/current'
import Require from './build/Require'
import notice from './option/noticeData'

// 测试加载
// import './test/index'
// 自动引用加载
// import './buildContentImport'

let mainfunc = {
  requiredata: new Require(),
  current: current,
  page: page,
  data: {},
  // type
  checkComplex,
  getTag,
  getType,
  isArray,
  isBlob,
  isComplex,
  isDate,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isError,
  isExist,
  isFile,
  isPromise,
  isRegExp,
  isSymbol,
  isSame,
  // number
  formatNum,
  getDecimal,
  getInteger,
  getNum,
  getRandomNum,
  parseNum,
  // string
  fillString,
  findTargetInStr,
  getRandomData,
  getRandomInList,
  getRandomLetter,
  strCodeNum,
  // object
  appendProp,
  arrayClearOther,
  choiceProp,
  clearArray,
  deepClone,
  deepCloneData,
  deepCloneDataWithOption,
  defineProperty,
  formatDataByType,
  formatList,
  formatTree,
  getDefaultData,
  getProp,
  getPropByList,
  hasProp,
  jsonToForm,
  mergeData,
  orderArrayByProp,
  setDataByDefault,
  setDefaultData,
  setProp,
  setPropByList,
  setPropByType,
  showArrayProp,
  updateData,
  updateDataWidthOption,
  updateList,
  // reactive
  defineReactive,
  defineWatch,
  // reactive
  // reactive
  // observe,
  // Watcher,
  // reactive
  // function
  runFunction,
  triggerFunc,
  triggerPromise,
  // utils
  debounce,
  downloadBlob,
  downloadFile,
  downloadFileByAnchor,
  localEncodeURIComponent,
  formatQueryUrl,
  getCurrentUrl,
  getLimitData,
  getQueryData,
  getQueryUrl,
  isOriginUrl,
  loadContents,
  openAnchor,
  openWindow,
  exportSelfMsg,
  exportMsg,
  parseUrl,
  promiseAllFinished,
  showJson,
  throttle,
  transformFile,
  trimData,
  // local
  getLocalData,
  removeLocalData,
  setLocalData,
  setLocalDataPre,
  // time
  formatTime,
  getOffsetTime,
  getOffsetTimeStr,
  parseTime,
  showTime,
  // environment
  checkUseItem,
  getCanUse,
  getEnv,
  getEnvMode,
  setCanUse,
  setEnv,
  setEnvMode,
  resetEnvData,
  // worker
  setWorker,
  // rule
  buildRule,
  checkRule,
  // require
  ajax: function(optionData) {
    return this.requiredata.ajax(optionData)
  },
  require: function(optionData, defaultOptionData) {
    return this.requiredata.require(optionData, defaultOptionData)
  },
  get: function(optionData) {
    return this.requiredata.get(optionData)
  },
  post: function(optionData) {
    return this.requiredata.post(optionData)
  },
  delete: function(optionData) {
    return this.requiredata.delete(optionData)
  },
  put: function(optionData) {
    return this.requiredata.put(optionData)
  },
  postform: function(optionData) {
    return this.requiredata.postform(optionData)
  },
  postfile: function(optionData) {
    return this.requiredata.postfile(optionData)
  },
  setToken: function(tokenName, data, prop) {
    return this.requiredata.setToken(tokenName, data, prop)
  },
  getToken: function(tokenName, prop) {
    return this.requiredata.getToken(tokenName, prop)
  },
  removeToken: function(tokenName, prop) {
    return this.requiredata.removeToken(tokenName, prop)
  },
  deleteToken: function(tokenName, prop) {
    return this.requiredata.deleteToken(tokenName, prop)
  },
  /**
   * 加载模块
   * @param {object} mod 对应的模块
   * @param {string[] | object[]} methodList 可能的函数数组
   */
  _initMod: function (mod, methodList) {
    if (methodList) {
      for (let i in methodList) {
        let methodData = methodList[i]
        if (typeof methodData != 'object') {
          methodData = {
            originprop: methodData,
            prop: methodData
          }
        }
        this._appendMethod(methodData.prop, mod[methodData.originprop], mod)
      }
    } else {
      for (let n in mod) {
        if (typeof mod[n] == 'function') {
          this._appendMethod(n, mod[n], mod)
        }
      }
    }
  },
  /**
   * 添加函数
   * @param {string} methodName 函数名
   * @param {Function} methodData 函数体
   * @param {object} [target] this
   */
  _appendMethod: function (methodName, methodData, target) {
    let append = false
    if (methodData) {
      let methodType = typeof methodData
      if (methodType == 'function') {
        methodData = {
          data: methodData
        }
        append = true
      } else if (methodType == 'object') {
        append = true
      }
    }
    if (append) {
      if (!this[methodName]) {
        append = true
      } else if (methodData.replace) {
        append = true
        this.exportSelfMsg(`appendMethod: ${methodName} is replace`, 'warn')
      } else {
        this.exportSelfMsg(`appendMethod: ${methodName} is defined`)
      }
      if (append) {
        if (target) {
          this[methodName] = methodData.data.bind(target)
        } else {
          this[methodName] = methodData.data
        }
      }
    }
  },
  /**
   * 加载
   * @param {object} option 参数
   * @param {object} [option.data] data数据,.data数据
   * @param {object} [option.root] root数据，直接挂载到主属性上
   * @param {{Function}} [option.methods] 方法
   * @param {object} [option.require] require/initMain参数，不传则无任何参数
   * @param {object} [option.notice] notice相关函数重置
   */
  init: function({
    data, // 数据
    root, // 根对象
    methods, // 方法
    require, // 请求
    notice // 提示
  }) {
    if (data) {
      for (let n in data) {
        this.data[n] = data[n]
      }
    }
    if (root) {
      for (let n in root) {
        if (this[n]) {
          this.exportSelfMsg(`root属性${n}设置冲突，请检查!`)
        } else {
          this[n] = root[n]
          let type = getType(this[n])
          if (type !== 'object') {
            this.exportSelfMsg(`root属性${n}类型为${type}，非object的值推荐赋值到data对象中，否则无法构建为响应式数据！`, 'warn')
          }
        }
      }
    }
    if (methods) {
      for (let n in methods) {
        this._appendMethod(n, methods[n])
      }
    }
    if (require) {
      this.initRequire(require)
    }
    if (notice) {
      this.initNotice(notice)
    }
  },
  /**
   * 加载require
   * @param {*} requireInitData
   */
  initRequire: function (requireInitData) {
    this.requiredata.initMain(requireInitData)
  },
  /**
   * 加载notice
   * @param {*} noticeInitData
   */
  initNotice: function(noticeInitData = {}) {
    notice.data = noticeInitData.data || {}
    for (let n in noticeInitData.methods) {
      notice[n] = noticeInitData.methods[n]
    }
    mainfunc._initMod(notice)
  }
}

export default mainfunc
