import config from '../../../config'

let location = window.location

/**
 * 解析url为基本location对象
 * @param {string} URL
 * @returns {object} location
 */
function parseUrl(url) {
  let protocol, hostname, port
  if (url.indexOf('//') > -1) {
    let urlList = url.split('//')
    protocol = (urlList[0] || location.protocol).toLowerCase()
    url = urlList[1]
    if (url) {
      if (url.indexOf('/') > -1) {
        url = url.split('/')[0]
      }
      if (url.indexOf(':') > -1) {
        let portList = url.split(':')
        hostname = portList[0]
        port = portList[1]
      } else {
        hostname = url
        port = config.url.protocolPort[protocol]
      }
    }
  }
  return {
    href: url,
    protocol,
    hostname,
    port
  }
}

export default parseUrl
