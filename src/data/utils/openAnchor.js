
let checkAnchor = document.createElement('a')
let isSupportDownload = 'download' in checkAnchor
checkAnchor = null

/**
 * 基于a标签打开文件
 * @param {string} url
 * @param {string} [target] 窗口目标
 * @param {string} [download] 下载名称
 * @returns {boolean} 是否成功
 */
function openAnchor(url, target, download) {
  let anchor = document.createElement('a')
  anchor.href = url
  if (target) {
    anchor.target = target
  }
  if (isSupportDownload && download) {
    if (download === true) {
      download = url.split('/').pop()
    }
    anchor.setAttribute('download', download)
  }
  anchor.click()
  setTimeout(function() {
    anchor = null
  }, 0)
  return true
}

export default openAnchor
