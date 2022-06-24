import option from './option/index'

/**
 * 规则检查
 * @param {*} data 需要检查的值
 * @param {string} prop 检查规则名称
 * @param  {any[]} args 参数
 * @returns
 */
function checkRule(data: any, prop: string, ...args: any[]) {
  const ruleItem = option.data[prop]
  if (ruleItem) {
    return ruleItem.check(data, ...args)
  } else {
    console.error(`rule不存在${prop}校验规则，请检查代码`)
    return false
  }
}

export default checkRule
