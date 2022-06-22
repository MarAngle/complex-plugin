import isSame from '../data/type/isSame'

/**
 * 输出错误
 * @param {String} error
 * @throws
 */
function showError(error) {
  throw new Error(error)
}
/**
 * 检查数据，不同时输出错误
 * @param {*} value
 * @param {*} other
 * @param {string} error
 */
function checkSame(value, other, error) {
  if (!isSame(value, other)) {
    console.error(value, other)
    // console.error(JSON.stringify(value))
    // console.error(JSON.stringify(other))
    showError(error)
  }
}

/**
 * 运行测试
 * @param {Function} fn
 * @param {string} log
 */
function runText(fn, log) {
  try {
    fn({
      checkSame,
      showError
    })
  } catch (e) {
    console.error(e)
    if (log) {
      console.error(log)
    }
  }
}

export default runText
