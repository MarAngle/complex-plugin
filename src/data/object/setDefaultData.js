import getType from '../type/getType'
import isExist from '../type/isExist'
import hasProp from './hasProp'

/**
 * 当value[prop]不存在时设置默认值defaultData，存在时不做操作，注意判断条件是存在属性而不是属性值为真
 * @param {object} value 对应值
 * @param {string} prop 属性
 * @param {*} defaultData 默认值
 * @param {object | array} exist 存在判断值
 */
function setDefaultData(value, prop, defaultData, exist) {
  let next = false
  if (exist) {
    let type = getType(exist)
    if (type === 'array') {
      if (!isExist(value[prop], exist)) {
        next = true
      }
    } else {
      if (type !== 'object') {
        exist = {}
      }
      if (!isExist(value[prop], exist.existList, exist.unExistList)) {
        next = true
      }
    }
  } else if (!hasProp(value, prop)) {
    next = true
  }
  if (next) {
    value[prop] = defaultData
  }
}

export default setDefaultData
