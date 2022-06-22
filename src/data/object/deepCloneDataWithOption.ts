import updateDataWidthOption, { formatUpdateDataOption, optionType, formatOptionType } from './updateDataWidthOption'

/**
 * 可定制的深拷贝
 * @param {*} origindata 深拷贝对象
 * @param {object} [option] 用户设置的设置项
 * @param {'total' | 'add'} [option.type] 全更新/附加更新判断值
 * @param {boolean} option.reset 重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
 * @param {boolean | number} [option.depth] 属性深度判断值
 * @param {LimitData} [option.limitData] 属性限制判断值
 * @param {object} [option.limit] 属性限制判断值limitData生成参数
 * @param {'forbid' | 'allow'} [option.limit.type] 属性限制判断值limitData生成参数-type
 * @param {string[]} [option.limit.list] 属性限制判断值limitData生成参数-list
 * @returns
 */
function deepCloneDataWithOption<T>(origindata:T, option: optionType) {
  option = formatUpdateDataOption(option, {})
  return updateDataWidthOption(undefined, origindata, option as formatOptionType)
}

export default deepCloneDataWithOption
