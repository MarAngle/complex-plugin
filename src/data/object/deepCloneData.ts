import getType from './../type/getType'

const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * 基础版本的深拷贝
 * @param {*} origindata 深拷贝对象
 * @param {*} map 循环引用缓存
 * @returns
 */
function deepCloneData<T>(origindata: T, map = new Map()): T {
  const type = getType(origindata)
  // 复杂对象进行递归
  if (type === 'object' || type === 'array') {
    let result = map.get(origindata)
    if (result) {
      return result
    } else {
      result = type === 'object' ? {} : []
      if (Object.getPrototypeOf(result) !== Object.getPrototypeOf(origindata)) {
        Object.setPrototypeOf(result, Object.getPrototypeOf(origindata))
      }
      map.set(origindata, result)
      for (const key in origindata) {
        if (hasOwnProperty.call(origindata, key)) {
          result[key] = deepCloneData(origindata[key], map)
        }
      }
      return result
    }
  } else {
    return origindata
  }
}

export default deepCloneData
