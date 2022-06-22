import updateData from './updateData'

/**
 * 将originList中的值经过updateData后push到targetList中
 * @param {object[]} originList 源数组
 * @param {object} [option] updateData设置项
 * @param {object[]} [targetList] 目标数组
 * @returns targetList
 */
function formatList(originList, option, targetList = []) {
  for (let n in originList) {
    targetList.push(updateData({}, originList[n], option))
  }
  return targetList
}

export default formatList
