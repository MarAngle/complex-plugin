import getProp from './getProp'

/**
 * 数组属性快速输出到控制台
 * @param {object[]} list 目标数组
 * @param {string} prop 属性字符串,.类型
 */
function showArrayProp(list, prop) {
  let proplist = []
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    proplist.push(getProp(item, prop))
  }
  console.log(JSON.stringify(proplist))
}

export default showArrayProp
