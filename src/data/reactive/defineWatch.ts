import exportSelfMsg from './../utils/exportSelfMsg'
import defineProperty from './../object/defineProperty'
import defineReactive from './defineReactive'
import { objectAny } from '../../../ts'

type optionFunction = (val: any, oldVal: any, currentProp?: any) => any

type optionObject = {
  handler: optionFunction,
  deep?: boolean,
  currentProp?: string,
  deepId?: number,
  deepInside?: boolean,
  immediate?: boolean
}

export type optionType = optionFunction | optionObject

let deepIdCounter = 1

const deepIdProp = '$deepId_auto_prop$'
/**
 * 定义侦听器
 * @param {object} obj 对象
 * @param {string} prop 属性
 * @param {function | object} option 参数
 * @returns 操作是否成功
 */
function defineWatch(obj: objectAny, prop: string, option: optionType) {
  const optionType = typeof option
  if (optionType == 'function') {
    option = {
      handler: (option as optionFunction)
    }
  } else if (optionType != 'object') {
    exportSelfMsg(`defineWatch函数传参错误，option格式为:${optionType}`)
    return false
  }
  const reactiveOption = {
    set: function(val: any, oldVal: any) {
      (option as optionObject).handler(val, oldVal)
    }
  }
  const fg = defineReactive(obj, prop, reactiveOption)
  if (fg) {
    console.error('Deep模式下，输出的对象格式数据被其他复用时回调依然会在此对象处生效，避免getter/setter的多个覆盖的情况理论上无法直接删除，考虑恢复状态函数后继续')
    if ((option as optionObject).deep) {
      let deepId = (option as optionObject).deepId
      if (!deepId) {
        deepId = deepIdCounter
        deepIdCounter++
      }
      const value = obj[prop]
      const currentProp = (option as optionObject).currentProp
      if (typeof value === 'object') {
        if (!value[deepIdProp]) {
          defineProperty(value, deepIdProp, {
            value: [],
            enumerable: false
          })
        }
        if (value[deepIdProp].indexOf(deepId) < 0) {
          value[deepIdProp].push(deepId)
          for (const key in value) {
            const nextProp = currentProp ? currentProp + '.' + key : key
            const nextOption = {
              deep: true,
              deepId: deepId,
              deepInside: true,
              currentProp: nextProp,
              handler: !(option as optionObject).deepInside ? function(val: any, oldVal: any, currentProp?: string) {
                (option as optionObject).handler(obj[prop], obj[prop], {
                  prop: currentProp,
                  val: val,
                  oldVal: oldVal
                })
              } : function(val: any, oldVal: any) {
                (option as optionObject).handler(val, oldVal, nextProp)
              }
            }
            defineWatch(value, key, nextOption)
          }
        }
      }
    }
    if ((option as optionObject).immediate) {
      (option as optionObject).handler(obj[prop], obj[prop])
    }
  }
  return fg
}

export default defineWatch
