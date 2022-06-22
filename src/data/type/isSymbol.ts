import getTag from './getTag'

/**
 * 是否是Symbol
 * @param {*} value 需要判断的数据
 * @returns {boolean} value is Symbol
 */
function isSymbol(value: any): value is symbol {
  return getTag(value) === '[object Symbol]' || typeof value === 'symbol'
}

export default isSymbol
