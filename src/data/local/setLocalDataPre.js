import config from '../../../config'

/**
 * 设置本地缓存的名称前缀
 * @param {string} pre
 */
function setLocalDataPre(pre) {
  config.local.pre = pre
}

export default setLocalDataPre
