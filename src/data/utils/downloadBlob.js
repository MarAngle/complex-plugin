import downloadFileByAnchor from './downloadFileByAnchor'

let URL = window.URL || window.webkitURL

/**
 * 下载blob文件
 * @param {*} blobValue
 * @param {string} type
 * @param {string} [name]
 * @returns {boolean} 是否成功
 */
function downloadBlob(blobValue, type, name) {
  let blob
  if (typeof window.Blob == 'function') {
    blob = new Blob([blobValue], { type: type })
  } else {
    let BlobBuilder = window.MSBlobBuilder
    let blobData = new BlobBuilder()
    blobData.append(blobValue)
    blob = blobData.getBlob(type)
  }
  let blobUrl = URL.createObjectURL(blob)
  downloadFileByAnchor(blobUrl, name)
  URL.revokeObjectURL(blobUrl)
  return true
}

export default downloadBlob
