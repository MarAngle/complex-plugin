import getRandomNum from './../number/getRandomNum'

/**
 * 从列表中随机取值
 * @param {*} list
 * @returns {*}
 */
function getRandomInList<T>(list: T[]):T {
  let size = list.length
  let index = getRandomNum(0, size)
  return list[index]
}

export default getRandomInList
