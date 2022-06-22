import exportSelfMsg from './../utils/exportSelfMsg'
import defineProperty from './../object/defineProperty'
import defineReactive from './defineReactive'

let deepIdCounter = 1

const deepIdProp = '$deepId_auto_prop$'
/**
 * 定义侦听器
 * @param {object} obj 对象
 * @param {string} prop 属性
 * @param {function | object} option 参数
 * @returns 操作是否成功
 */
function defineWatch(obj, prop, option) {
  let optionType = typeof option
  if (optionType == 'function') {
    option = {
      handler: option
    }
  } else if (optionType != 'object') {
    exportSelfMsg(`defineWatch函数传参错误，option格式为:${optionType}`)
    return false
  }
  let reactiveOption = {
    set: function(val, oldVal) {
      option.handler(val, oldVal)
    }
  }
  let fg = defineReactive(obj, prop, reactiveOption)
  if (fg) {
    console.error('Deep模式下，输出的对象格式数据被其他复用时回调依然会在此对象处生效，避免getter/setter的多个覆盖的情况理论上无法直接删除，考虑恢复状态函数后继续')
    if (option.deep) {
      let deepId = option.deepId
      if (!deepId) {
        deepId = deepIdCounter
        deepIdCounter++
      }
      let value = obj[prop]
      let currentProp = option.currentProp
      if (typeof value === 'object') {
        if (!value[deepIdProp]) {
          defineProperty(value, deepIdProp, {
            value: [],
            enumerable: false
          })
        }
        if (value[deepIdProp].indexOf(deepId) < 0) {
          value[deepIdProp].push(deepId)
          for (let key in value) {
            let nextProp = currentProp ? currentProp + '.' + key : key
            let nextOption = {
              deep: true,
              deepId: deepId,
              deepInside: true,
              currentProp: nextProp,
              handler: !option.deepInside ? function(val, oldVal, currentProp) {
                option.handler(obj[prop], obj[prop], {
                  prop: currentProp,
                  val: val,
                  oldVal: oldVal
                })
              } : function(val, oldVal) {
                option.handler(val, oldVal, nextProp)
              }
            }
            defineWatch(value, key, nextOption)
          }
        }
      }
    }
    if (option.immediate) {
      option.handler(obj[prop], obj[prop])
    }
  }
  return fg
}

export default defineWatch
