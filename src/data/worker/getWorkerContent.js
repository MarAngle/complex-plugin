
/**
 * 生成分支线程的代码
 * @param {function} func 函数体
 * @param {boolean} [sync] 同步判断
 * @param {boolean} [log] 日志打印判断
 * @returns {string} 分支代码字符串
 */
function getWorkerContent(func, sync, log) {
  if (sync) {
    return `
      onmessage = function (e) {
        ${log ? 'console.log("Worker Start: sync")' : ''}
        var func = ${func.toString()}
        var res = func.apply(null, e.data.args)
        postMessage({ status: 'success', data: res })
        ${log ? 'console.log("Worker Finish: success sync")' : '' }
      }
    `
  } else {
    return `
      onmessage = function (e) {
        ${log ? 'console.log("Worker Start: async")' : '' }
        var func = ${func.toString()}
        func.apply(null, e.data.args).then(res => {
          postMessage({ status: 'success', data: res })
          ${log ? 'console.log("Worker Finish: success async")' : '' }
        }, err => {
          postMessage({ status: 'fail', data: err })
          ${log ? 'console.log("Worker Finish: fail async")' : '' }
        })
      }
    `
  }
}

export default getWorkerContent
