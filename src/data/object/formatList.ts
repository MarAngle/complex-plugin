import { objectAny } from '../../../ts'
import updateData from './updateData'
import { optionType } from './updateDataWidthOption'

/**
 * 将originList中的值经过updateData后push到targetList中
 * @param {object[]} originList 源数组
 * @param {object} [option] updateData设置项
 * @param {object[]} [targetList] 目标数组
 * @returns targetList
 */
function formatList(originList: objectAny[], option?: optionType, targetList: objectAny[] = []) {
  for (const n in originList) {
    targetList.push(updateData({}, originList[n], option))
  }
  return targetList
}

export default formatList
