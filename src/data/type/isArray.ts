import getTag from './getTag'

/**
 * 是否是Array
 * @param {*} value 需要判断的值
 * @returns {boolean} value is Array
 */
function isArray(value: any): value is Array<any> {
  if (Array.isArray) {
    return Array.isArray(value)
  } else {
    return getTag(value) === '[object Array]'
  }
}

export default isArray
