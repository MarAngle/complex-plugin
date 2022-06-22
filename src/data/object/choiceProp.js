
/**
 * 更改list列表中选择的prop属性为指定值target,存在item则item更改为itemTarget
 * @param {object[]} list
 * @param {string} prop 属性
 * @param {*} [target] 目标值
 * @param {object} [item] 特殊对象
 * @param {*} [itemTarget] 特殊对象值
 */
function choiceProp(list, prop, target = false, item, itemTarget = true) {
  for (let n in list) {
    list[n][prop] = target
  }
  if (item) {
    item[prop] = itemTarget
  }
}

export default choiceProp
