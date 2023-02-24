import exportMsg, { consoleType, exportOption } from './exportMsg'
/**
 * complex-func错误信息输出函数
 * @param {string} msg 错误信息内容
 * @param {'error' | 'warn' | 'log'} [type = error] 信息提示类型
 * @param {object} [option = {}] 额外信息设置项
 * @param {string} [option.data] 额外信息内容
 * @param {'error' | 'warn' | 'log'} [option.type] 额外信息提示类型
 */
function exportSelfMsg(msg: string, type?: consoleType, option?: exportOption) {
  const preMsg = '[complex-func]'
  exportMsg(preMsg + msg, type, option)
}

export default exportSelfMsg
