
/**
 * 获取字符串每个字符的code值和
 * @param {string} str
 * @returns {number}
 */
function strCodeNum(str: string) {
  let num = 0
  for (let n = 0; n < str.length; n++) {
    num = num + str.charCodeAt(n)
  }
  return num
}

export default strCodeNum
