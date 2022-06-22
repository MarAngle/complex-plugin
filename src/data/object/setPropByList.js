import setData from './../../option/setData'

/**
 * 根据属性列表设置属性值
 * @param {object} value 对应对象
 * @param {string[]} propList 属性列表,父属性不存在时会创建对象
 * @param {*} propData 属性值
 * @param {boolean} [useSetData] 为真时通过setData进行赋值操作,主要针对框架中直接赋值无法响应的操作
 */
function setPropByList(value, propList, propData, useSetData) {
  let data = value
  for (let n = 0; n < propList.length; n++) {
    if (n < propList.length - 1) {
      if (!data[propList[n]]) {
        data[propList[n]] = {}
      }
      data = data[propList[n]]
    } else {
      if (!useSetData) {
        data[propList[n]] = propData
      } else {
        setData.set(data, propList[n], propData)
      }
    }
  }
}

export default setPropByList
