
/**
 * 指定对象/FormData添加属性
 * @param {object | FormData} data 需要添加属性的对象
 * @param {string} propName 属性名
 * @param {*} propData 属性值
 * @param {'json' | 'formdata'} [type] 需要添加对象的对应类型,默认为json
 */
function appendProp(data, propName, propData, type = 'json') {
  if (type == 'json') {
    data[propName] = propData
  } else if (type == 'formdata') {
    data.set(propName, propData)
  }
}

export default appendProp
