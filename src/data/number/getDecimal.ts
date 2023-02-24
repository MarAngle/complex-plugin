import parseNum from './parseNum'

/**
 * 获取数字的小数部分
 * @param {*} value 需要解析的数字
 * @returns {Number}
 */
function getDecimal(value: any): number {
  return parseNum(value)[1]
}

export default getDecimal
