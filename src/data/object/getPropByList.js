
/**
 * 根据属性列表获取对象属性
 * @param {object} value 对应对象
 * @param {string[]} propList 属性列表
 * @param {boolean} [showError] 显示错误输出
 * @returns
 */
function getPropByList(value, propList, showError) {
  let data = value
  try {
    for (let n = 0; n < propList.length; n++) {
      let prop = propList[n]
      if (prop || prop === 0) {
        data = data[prop]
      }
    }
    return data
  } catch (e) {
    if (showError) {
      console.error(e)
    }
    return undefined
  }
}

export default getPropByList
