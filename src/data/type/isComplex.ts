/**
 * 是否是复杂对象
 * @param {*} value 需要判断的类型值
 * @returns {boolean} value is 复杂对象
 */
function isComplex(value: string): boolean {
  const complex = ['object', 'array']
  return complex.indexOf(value) > -1
}

export default isComplex
