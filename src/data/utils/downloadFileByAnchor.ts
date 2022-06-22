import openAnchor from './openAnchor'

/**
 * 基于a标签下载文件
 * @param {string} url
 * @param {string} [name] 下载名称
 * @param {string} [target] 窗口目标
 * @returns {boolean} 是否成功
 */
function downloadFileByAnchor(url: string, name?: string, target = '_blank') {
  return openAnchor(url, target, name || true)
}

export default downloadFileByAnchor
