import deepCloneData from './deepCloneData'
import deepCloneDataWithOption from './deepCloneDataWithOption'
import { optionType } from './updateDataWidthOption'

/**
 * 深拷贝
 * @param {*} origindata 需要进行深拷贝的对象
 * @param {boolean | object} [option] 用户设置的设置项,根据此项调用不同方法
 * @param {'total' | 'add'} [option.type] 全更新/附加更新判断值
 * @param {boolean} option.reset 重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
 * @param {boolean | number} [option.depth] 属性深度判断值
 * @param {LimitData} [option.limitData] 属性限制判断值
 * @param {object} [option.limit] 属性限制判断值limitData生成参数
 * @param {'forbid' | 'allow'} [option.limit.type] 属性限制判断值limitData生成参数-type
 * @param {string[]} [option.limit.list] 属性限制判断值limitData生成参数-list
 * @returns
 */
function deepClone<T>(origindata:T, option?: true | optionType):T {
  if (!option) {
    return JSON.parse(JSON.stringify(origindata))
  } else if (option === true) {
    return deepCloneData(origindata)
  } else {
    return deepCloneDataWithOption(origindata, option)
  }
}

export default deepClone
