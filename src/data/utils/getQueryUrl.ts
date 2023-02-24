
/**
 * 获取query字段
 * @param {string} url
 * @returns {string}
 */
function getQueryUrl(url: string): string {
  return url.split('?')[1]
}

export default getQueryUrl
