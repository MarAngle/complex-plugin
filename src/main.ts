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
import noticeData, { noticeDataType } from './option/noticeData'
import setData from './option/setData'
import { anyFunction, objectAny, baseObject } from './ts'

// 测试加载
// import './test/index'
// 自动引用加载
// import './buildContentImport'

type methodsType = {
  data: anyFunction,
  replace?: boolean
}

export type initOptionType = {
  root?: objectAny,
  data?: objectAny,
  methods?: baseObject<methodsType | anyFunction>,
  notice?: noticeDataType
} 


const data: any = {}

const $func = {
  current: current,
  page: page,
  data: data,
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

  // notice
  setMsg: noticeData.setMsg.bind(noticeData),
  setModal: noticeData.setModal.bind(noticeData),
  showMsg: noticeData.showMsg.bind(noticeData),
  alert: noticeData.alert.bind(noticeData),
  confirm: noticeData.confirm.bind(noticeData),
  /**
   * 添加函数
   * @param {string} methodName 函数名
   * @param {Function} methodData 函数体
   * @param {object} [target] this
   */
  $appendMethod: function (this: any, methodName: string, methodData: methodsType | anyFunction, target?: any) {
    let append = false
    if (methodData) {
      const methodType = typeof methodData
      if (methodType == 'function') {
        methodData = {
          data: (methodData as anyFunction)
        }
        append = true
      } else if (methodType == 'object') {
        append = true
      }
    }
    if (append) {
      if (!this[methodName]) {
        append = true
      } else if ((methodData as methodsType).replace) {
        append = true
        this.exportSelfMsg(`appendMethod: ${methodName} is replace`, 'warn')
      } else {
        this.exportSelfMsg(`appendMethod: ${methodName} is defined`)
      }
      if (append) {
        if (target) {
          this[methodName] = (methodData as methodsType).data.bind(target)
        } else {
          this[methodName] = (methodData as methodsType).data
        }
      }
    }
  },
  init: function(this: any, initOption: initOptionType) {
    if (initOption.root) {
      for (const n in initOption.root) {
        if (this[n]) {
          this.exportSelfMsg(`root属性${n}设置冲突，请检查!`)
        } else {
          this[n] = initOption.root[n]
          const type = getType(this[n])
          if (type !== 'object') {
            this.exportSelfMsg(`root属性${n}类型为${type}，非object的值推荐赋值到data对象中，否则无法构建为响应式数据！`, 'warn')
          }
        }
      }
    }
    if (initOption.data) {
      this.data = initOption.data
    }
    if (initOption.methods) {
      for (const n in initOption.methods) {
        this.$appendMethod(n, initOption.methods[n])
      }
    }
    if (initOption.notice) {
      let n: keyof noticeDataType
      for (n in initOption.notice) {
        noticeData[n] = initOption.notice[n]
      }
    }
  },
  installVue: function(Vue: any, options: {
    prop?: string,
    toGlobal?: boolean
  } = {}) {
    if (options.prop === undefined) {
      options.prop = '$func'
    }
    if (options.toGlobal) {
      (window as any)[options.prop] = this
    }
    const version = Vue.version.split('.')[0]
    if (version == '2') {
      // 设置属性重置为Vue.set
      setData.set = function(target, prop, data) {
        Vue.set(target, prop, data)
      }
      if (options.prop) {
        // 构建响应式数据
        for (const prop in this) {
          if (this.getType((this as any)[prop] == 'object')) {
            Vue.observable((this as any)[prop])
          }
        }
        Vue.prototype[options.prop] = this
      }
    } else if (version == '3') {
      Vue.config.globalProperties[options.prop] = this
    }
  }
}

export default $func
