import { baseObject } from '../../../ts'
import getQueryUrl from './getQueryUrl'

/**
 * 解析query数据（#此处不做判断）
 * @param {string} url
 * @returns {object}
 */
function getQueryData(url: string) {
  const queryData: baseObject<string> = {}
  const queryUrl = getQueryUrl(url)
  if (queryUrl) {
    const queryList = queryUrl.split('&')
    for (const n in queryList) {
      const oitem = queryList[n]
      if (oitem) {
        const oitemList = oitem.split('=')
        queryData[oitemList[0]] = oitemList[1]
      }
    }
  }
  return queryData
}

export default getQueryData
