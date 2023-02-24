
/**
 * 将目标字符串中指定未知填充指定字符串到指定长度
 * @param {string} str 目标字符串
 * @param {number} [targetLength] 目标长度,默认为2
 * @param {string} [padString] 填充字符串,默认为'0'
 * @param {'start' | 'end'} [to] 填充位置,默认为start
 * @param {true} [unDivision] 是否分割填充字符串,默认分割
 * @returns {string}
 */
function fillString(str: string | number, targetLength = 2, padString = '0', to: 'start' | 'end' = 'start', unDivision?: true): string {
  str = str.toString()
  padString = padString.toString()
  if (unDivision) {
    const repeatNum = Math.ceil((targetLength - str.length) / padString.length)
    if (repeatNum > 0) {
      targetLength = str.length + padString.length * repeatNum
    }
  }
  if (to == 'start') {
    str = str.padStart(targetLength, padString)
  } else if (to == 'end') {
    str = str.padEnd(targetLength, padString)
  }
  return str
}

export default fillString
