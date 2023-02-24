import LimitData, { LimitDataInitOption, LimitDataType } from './../../build/LimitData'

/**
 * 获取限制对象
 * @param {'forbid' | 'allow'} [option.type] limitData生成参数-type
 * @param {string[]} [option.list] limitData生成参数-list
 * @param {'forbid' | 'allow'} autoType option.type不存在时的默认值
 * @returns {LimitData}
 */
function getLimitData(option?: LimitDataInitOption, autoType?: LimitDataType) {
  return new LimitData(option, autoType)
}

export default getLimitData
