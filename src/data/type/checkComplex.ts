import getType from './getType'
import isComplex from './isComplex'

/**
 * 通过getType获取对应的类型并判断此类型是否是复杂对象
 * @param {*} value 需要进行判断的值
 * @returns {boolean} 是否是复杂对象
 */
function checkComplex(value: any): value is object | Array<any> {
  const type = getType(value)
  return isComplex(type)
}

export default checkComplex
