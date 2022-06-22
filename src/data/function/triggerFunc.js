
/**
 * 触发可能存在的函数
 * @param {*} func 函数
 * @param  {...any} args func参数
 * @returns 是否触发
 */
function triggerFunc(func, ...args) {
  if (func && typeof func === 'function') {
    func(...args)
    return true
  } else {
    return false
  }
}

export default triggerFunc
