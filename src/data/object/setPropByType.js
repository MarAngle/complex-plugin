import formatDataByType from './formatDataByType'
import setProp from './setProp'

/**
 * 根据type设置对象属性值
 * @param {object} value 目标对象
 * @param {string} prop 属性字符串
 * @param {*} propData 属性值
 * @param {string} type 属性值类型
 * @param {boolean} [useSetData] 为真时通过setData进行赋值操作,主要针对框架中直接赋值无法响应的操作
 */
function setPropByType(value, prop, propData, type = 'string', useSetData) {
  let targetdata = formatDataByType(propData, type)
  return setProp(value, prop, targetdata, useSetData)
}

export default setPropByType
