import workerDo from './workerDo'

/**
 * 调用分支线程运行指定函数
 * @param {object} option 设置项
 * @param {function} option.func 函数体
 * @param {*[]} option.args 函数参数列表
 * @param {boolean} [option.isSync] 同步异步判断
 * @param {boolean} [option.log] 日志打印判断
 */
function setWorker(option) {
  return workerDo(option)
}

export default setWorker
