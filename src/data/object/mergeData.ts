import updateData from './updateData'

/**
 * 合并数据函数，可以理解为简化版本的add模式的updateData，基于源数据originData格式化目标数据targetData函数
 * @param {*} targetData 目标数据
 * @param {*[]} originList 源数据列表
 * @returns targetdata
 */
function mergeData(targetData: any, ...originList: any[]) {
  if (originList && originList.length > 0) {
    for (let n = 0; n < originList.length; n++) {
      const originData = originList[n]
      if (originData) {
        targetData = updateData(targetData, originData)
      }
    }
  }
  return targetData
}

export default mergeData
