import config from '../../../config'
import getType from './getType'
import isEmptyArray from './isEmptyArray'
import isEmptyObject from './isEmptyObject'

const dict = {
  object: isEmptyObject,
  array: isEmptyArray
}

/**
 * 是否为空
 * @param {*} value 需要判断的值
 * @param {string[]} [checkList] 需要深入判断的数据类型，对象和数组可选
 * @returns {boolean} value is Empty
 */
function isEmpty(value: any, checkList?: string[]) {
  if (!value) {
    // undefined null '' 0 false
    return true
  } else {
    if (!checkList) {
      checkList = config.type.emptyCheckList
    }
    const type = getType(value)
    if (checkList.indexOf(type) > -1 && (dict as any)[type]) {
      return (dict as any)[type](value, type)
    } else {
      return false
    }
  }
}

export default isEmpty
