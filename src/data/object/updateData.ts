import updateDataWidthOption, { formatOptionType, formatUpdateDataOption, optionType } from './updateDataWidthOption'

/**
 * 基于origindata更新targetdata数据,type默认为add
 * @param {*} targetdata 目标数据
 * @param {*} origindata 数据源,以此数据为准对targetdata进行更新
 * @param {object} [option] 用户设置的设置项
 * @param {'total' | 'add'} [option.type] 全更新/附加更新判断值
 * @param {boolean} [option.reset] 重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
 * @param {boolean | number} [option.depth] 属性深度判断值
 * @param {LimitData} [option.limitData] 属性限制判断值
 * @param {object} [option.limit] 属性限制判断值limitData生成参数
 * @param {'forbid' | 'allow'} [option.limit.type] 属性限制判断值limitData生成参数-type
 * @param {string[]} [option.limit.list] 属性限制判断值limitData生成参数-list
 * @returns targetdata
 */
function updateData(targetdata: any, origindata: any, option: optionType = {}) {
  option = formatUpdateDataOption(option, {
    type: 'add'
  })
  targetdata = updateDataWidthOption(targetdata, origindata, option as formatOptionType)
  return targetdata
}

export default updateData
