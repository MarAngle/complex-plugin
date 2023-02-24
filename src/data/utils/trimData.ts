import getType from './../type/getType'

/**
 * 清除开始结束空格，仅对字符串有效
 * @param {*} data
 * @returns {*}
 */
function trimData(data: any) {
  const type = getType(data)
  if (type == 'string') {
    data = data.trim()
  }
  return data
}

export default trimData
