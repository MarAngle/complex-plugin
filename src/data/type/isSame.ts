import getType from './getType'

/**
 * 是否相同=>对象则直接进行属性的依次对比
 * @param {*} value 需要判断的数据
 */
function isSame(value: any, other: any): boolean {
  const type = getType(value)
  const otherType = getType(other)
  if (type !== otherType) {
    // 类型不同直接返回不同
    return false
  } else {
    if (type == 'object' || type === 'array') {
      // 对象或者数组则依次对比每个属性
      const propList = Object.keys(value)
      const otherPropList = Object.keys(other)
      if (propList.length === otherPropList.length) {
        if (propList.length === 0) {
          return true
        } else {
          for (let i = 0; i < propList.length; i++) {
            const prop = propList[i]
            if (otherPropList.indexOf(prop) < 0) {
              return false
            }
            const fg = isSame(value[prop], other[prop])
            if (!fg) {
              return false
            }
          }
        }
        return true
      } else {
        return false
      }
    } else {
      if (type === 'number' && isNaN(value) && isNaN(other)) {
        // NAN === NAN
        return true
      }
      return value === other
    }
  }
}

export default isSame
