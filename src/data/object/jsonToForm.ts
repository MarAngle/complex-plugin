import { objectAny } from '../../ts'
import getType from './../type/getType'

/**
 * 将对象转换为FormData格式
 * @param {object} jsonData 对象
 * @returns {FormData}
 */
function jsonToForm(jsonData: objectAny): FormData {
  let formData = new FormData()
  for (let prop in jsonData) {
    let type = getType(jsonData[prop], true)
    if (type === 'object') {
      formData.append(prop, JSON.stringify(jsonData[prop]))
    } else {
      formData.append(prop, jsonData[prop])
    }
  }
  return formData
}

export default jsonToForm
