import getTag from './getTag'

/**
 * 是否是Date
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is Date
 */
function isDate(value) {
  return getTag(value) === '[object Date]'
}

export default isDate
