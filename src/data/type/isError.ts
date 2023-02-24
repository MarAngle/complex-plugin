import getTag from './getTag'

/**
 * 是否是Error
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is Error
 */
function isError(value: any): value is Error {
  const tag = getTag(value)
  return tag === '[object Error]' || tag === '[object DOMException]'
}

export default isError
