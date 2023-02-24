import isSymbol from '../type/isSymbol'

/**
 * 将value转换为数字并返回
 * @param {string | number} value 需要转换的值
 * @returns {number}
 */
function formatNum(value: unknown): number {
  if (typeof value === 'number') {
    return value
  }
  if (isSymbol(value)) {
    return Number.NaN
  }
  return Number(value)
}

export default formatNum
