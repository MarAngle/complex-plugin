import getTag from './getTag'

/**
 * 是否是File
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is File
 */
function isFile(value) {
  return getTag(value) === '[object File]'
}

export default isFile
