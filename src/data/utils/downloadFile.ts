import getType from './../type/getType'
import downloadFileByAnchor from './downloadFileByAnchor'


type fileData = {
  url: string,
  name?: string
}

/**
 * 下载文件
 * @param {string | object} data
 * @returns {boolean} 是否成功
 */
function downloadFile(data: string | fileData): boolean {
  if (data) {
    let url: string, name: string | undefined
    const type = getType(data)
    if (type == 'string') {
      url = <string>data
    } else {
      url = (<fileData>data).url
      name = (<fileData>data).name
    }
    return downloadFileByAnchor(url, name)
  } else {
    return false
  }
}

export default downloadFile
