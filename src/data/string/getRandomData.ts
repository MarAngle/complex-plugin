import getRandomLetter, { letterType } from './getRandomLetter'

/**
 * 获取随机字符串
 * @param {number} size 长度
 * @param {object} [letter] 字符串库
 * @param {boolean} [letter.small] 字符串库设置,小写字母,默认为真
 * @param {boolean} [letter.big] 字符串库设置,大写字母,默认为真
 * @param {boolean} [letter.number] 字符串库设置,整数,默认为真
 * @returns {string}
 */
function getRandomData(size: number, letter?: letterType) {
  let data = ''
  for (let n = 0; n < size; n++) {
    data = data + getRandomLetter(letter)
  }
  return data
}

export default getRandomData
