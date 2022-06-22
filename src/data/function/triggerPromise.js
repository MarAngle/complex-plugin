import exportSelfMsg from './../utils/exportSelfMsg'
import isPromise from './../type/isPromise'
import triggerFunc from './triggerFunc'

/**
 * 触发Promise函数:接收func必须返回Promise或者promise为Promise对象
 * @param {object} option 设置项
 * @param {function} [option.func] 返回Promise的函数
 * @param {any[]} [option.args] 函数参数
 * @param {Promise} [option.promise] Promise对象,不存在时则会通过func(..args)返回
 * @param {function} [option.error] 错误回调=>不触发完成
 * @param {function} [option.start] 开始回调
 * @param {function} [option.success] 成功回调
 * @param {function} [option.fail] 失败回调
 * @param {function} [option.finish] 完成回调
 */
function triggerPromise({
  func,
  args,
  promise,
  error,
  start,
  success,
  fail,
  finish
}) {
  let next = true
  let code = ''
  if (!promise) {
    if (!func) {
      next = false
      code = 'argsError'
    } else {
      if (!args) {
        args = []
      }
      promise = func(...args)
    }
  }
  if (next) {
    if (!isPromise(promise)) {
      next = false
      code = 'notPromise'
    }
  }
  if (next) {
    triggerFunc(start)
    promise.then(res => {
      triggerFunc(success, res)
      triggerFunc(finish, res)
    }, err => {
      triggerFunc(fail, err)
      triggerFunc(finish, err)
    })
  } else {
    if (!triggerFunc(error, code)) {
      exportSelfMsg(`triggerPromise函数运行错误，code: ${code}`)
    }
  }
}

export default triggerPromise
