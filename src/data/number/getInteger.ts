import parseNum from './parseNum'

/**
 * 获取数字的整数部分
 * @param {*} value 需要解析的数字
 * @returns {Number}
 */
function getInteger(value: any): number {
  return parseNum(value)[0]
}

export default getInteger
