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
function isEmpty(value, checkList) {
  if (!value) {
    // undefined null '' 0 false
    return true
  } else {
    if (!checkList) {
      checkList = config.type.emptyCheckList
    }
    let type = getType(value)
    if (checkList.indexOf(type) > -1 && dict[type]) {
      return dict[type](value, type)
    } else {
      return false
    }
  }
}

export default isEmpty
