import getTag from './getTag'
import getType from './getType'

/**
 * 是否是Promise对象
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is Promise对象
 */
function isPromise(value: any): value is Promise<any> {
  if (getTag(value) === '[object Promise]') {
    return true
  }
  const type = getType(value)
  if (type === 'object' || type === 'function') {
    return typeof value.then === 'function'
  }
  return false
}

export default isPromise
