
/**
 * 解析数字，返回数组，第一位为整数，第二位为小数，数字格式
 * @param {*} value 需要解析的数据
 * @returns {[Number, Number]}
 */
function parseNum(value: any): [number, number] {
  if (value) {
    if (typeof value !== 'string') {
      value = value.toString()
    }
    const valueList = (value as string).split('.')
    const integerStr = valueList.shift()
    const decimalStr = valueList.join('')
    const integer = integerStr ? Number(integerStr) : 0
    const decimal = decimalStr ? Number('0.' + decimalStr) : 0
    return [integer, decimal]
  } else {
    return [0, 0]
  }
}

export default parseNum
