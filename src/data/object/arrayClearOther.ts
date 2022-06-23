
/**
 * 数组清除其他对象
 * @param {*} list 目标数组
 * @param {*} index 清理到index
 * @param {*} startIndex 开始清理的startIndex
 */
function arrayClearOther(list: any[], index: number, startIndex = 0) {
  if (list.length - 1 >= index) {
    // 删除index + 1到结束
    let endIndex = index + 1
    if (endIndex < startIndex) {
      endIndex = startIndex
    }
    list.splice(endIndex, list.length - endIndex)
    // 删除开始到index - 1
    const startNum = index - startIndex
    if (startNum > 0) {
      list.splice(startIndex, startNum)
    }
  }
}

export default arrayClearOther
