import isExist from './../type/isExist'

/**
 * 获取value[prop]，当value[prop]不存在时获取默认值defaultData，注意判断条件是isExist
 * @param {*} value 值
 * @param {string} prop 属性
 * @param {*} defaultData 默认值
 * @param {*[]} [existList] 存在列表
 * @param {*[]} [unExistList] 不存在列表
 * @returns {*}
 */
function getDefaultData(value: any, prop: string, defaultData?: any, existList?: any[], unExistList?: any[]) {
  if (value && isExist(value[prop], existList, unExistList)) {
    return value[prop]
  } else {
    return defaultData
  }
}

export default getDefaultData
