import { anyFunction } from "../../../ts"
import isPromise from './../type/isPromise'
import exportSelfMsg from './../utils/exportSelfMsg'

type resType = {
  status: 'fail' | 'success',
  code: string,
  data?: any
}

function next(callback: anyFunction | undefined, res: resType) {
  if (callback) {
    callback(res)
  }
}
/**
 * 触发函数，通过回调的形式触发函数，存在callback时则直接进行下一步操作，可接收同步函数和Promise函数
 * @param {function} func 函数
 * @param {*[]} args 参数
 * @param {function} [callback] 回调
 */
function runFunction(func?: anyFunction, args?: any[], callback?: anyFunction) {
  const mainRes: resType = {
    status: 'fail',
    code: ''
  }
  if (typeof func == 'function') {
    const data = func(...args!)
    if (isPromise(data)) {
      data.then(res => {
        mainRes.status = 'success'
        mainRes.data = res
        next(callback, mainRes)
      }, err => {
        mainRes.code = 'promiseError'
        mainRes.data = err
        next(callback, mainRes)
      })
    } else {
      mainRes.status = 'success'
      mainRes.data = data
      next(callback, mainRes)
    }
  } else {
    mainRes.code = 'argsError'
    exportSelfMsg(`triggerTargetFunc函数运行错误，code: ${mainRes.code}`)
    next(callback, mainRes)
  }
}

export default runFunction
