import localEncodeURIComponent from './localEncodeURIComponent'

/**
 * 设置queryUrl
 * @param {string} url
 * @param {object} data 值对象
 * @returns {string}
 */
function formatQueryUrl(url, data) {
  let type = url.indexOf('?') > -1 ? 'extra' : 'init'
  if (type == 'init') {
    url += '?'
  } else if (type == 'extra') {
    url += '&'
  }
  for (let n in data) {
    url = url + n + '=' + localEncodeURIComponent(data[n])
    url += '&'
  }
  return url.substring(0, url.length - 1)
}

export default formatQueryUrl
