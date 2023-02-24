import { objectAny } from '../../../ts'
import getType from './../type/getType'

/**
 * 将对象转换为FormData格式
 * @param {object} jsonData 对象
 * @returns {FormData}
 */
function jsonToForm(jsonData: objectAny): FormData {
  const formData = new FormData()
  for (const prop in jsonData) {
    const type = getType(jsonData[prop], true)
    if (type === 'object') {
      formData.append(prop, JSON.stringify(jsonData[prop]))
    } else {
      formData.append(prop, jsonData[prop])
    }
  }
  return formData
}

export default jsonToForm
