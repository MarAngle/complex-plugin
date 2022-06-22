import config from '../../../config'

/**
 * 获取本地缓存name全称
 * @param {string} name
 * @returns {string}
 */
function buildLocalDataName(name) {
  return config.local.pre + name
}

export default buildLocalDataName
