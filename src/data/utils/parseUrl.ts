import config from '../../../config'

const location = window.location


type protocolType = 'http:' | 'https:' | 'ftp:'

export type simpleLocation = {
  href: string | undefined,
  protocol: string | undefined,
  hostname: string | undefined,
  port: string | undefined

}

/**
 * 解析url为基本location对象
 * @param {string} URL
 * @returns {object} location
 */
function parseUrl(url: string): simpleLocation {
  let protocol: string | undefined, hostname: string | undefined, port: string | undefined
  if (url.indexOf('//') > -1) {
    const urlList = url.split('//')
    protocol = (urlList[0] || location.protocol).toLowerCase()
    url = urlList[1]
    if (url) {
      if (url.indexOf('/') > -1) {
        url = url.split('/')[0]
      }
      if (url.indexOf(':') > -1) {
        const portList = url.split(':')
        hostname = portList[0]
        port = portList[1]
      } else {
        hostname = url
        port = config.url.protocolPort[(protocol as protocolType)]
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
