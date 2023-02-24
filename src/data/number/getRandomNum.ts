
/**
 * 获取从start开始, 最大值为size - 1 的随机数,开始和结束的可能平均
 * @param {*} start 开始值
 * @param {*} size 总长度
 * @returns {number}
 */
function getRandomNum(start = 0, size = 10): number {
  return start + Math.floor(Math.random() * size)
}

export default getRandomNum
