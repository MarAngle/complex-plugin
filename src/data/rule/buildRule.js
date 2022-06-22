import option from './option/index'
import RuleData from '../../build/RuleData'

/**
 * 创建规则
 * @param {object} ruleOption RuleData initdata
 * @param {string} [prop] 规则保存属性,不存在不保存
 * @returns {RuleData}
 */
function buildRule(ruleOption, prop) {
  let ruleItem = new RuleData(ruleOption)
  if (prop) {
    option.data[prop] = ruleItem
  }
  return ruleItem
}

export default buildRule
