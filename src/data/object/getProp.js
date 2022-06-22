import getPropByList from './getPropByList'

/**
 * 根据'mainprop.prop'格式字符串获取对象值
 * @param {object} value 对应对象
 * @param {string} prop 对应属性
 * @param {boolean} [intervalRepeat] 分隔符.重复判断值, 默认为否;为真时连续.会全部删除,为否时连续和开始结束分隔符会保留,此时.视为属性,.a直接取[.a],a..b取[.a][.b],理论上无法对[a.]取值
 * @param {boolean} [showError] 显示错误输出
 * @returns
 */
function getProp(value, prop, intervalRepeat = false, showError) {
  if (!value || !prop) {
    return undefined
  } else {
    const interval = '.'
    let originPropList = prop.split(interval)
    let propList = []
    let lastEmpty = 0
    for (let n = 0; n < originPropList.length; n++) {
      let originProp = originPropList[n]
      if (originProp) {
        if (lastEmpty && !intervalRepeat) {
          originProp = interval.repeat(lastEmpty) + originProp
          lastEmpty = 0
        }
        propList.push(originProp)
      } else {
        lastEmpty++
      }
    }
    if (lastEmpty) {
      propList.push(interval.repeat(lastEmpty))
    }
    return getPropByList(value, propList, showError)
  }
}

export default getProp
