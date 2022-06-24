
const location = window.location

type optionType = {
  pathname?: boolean
}

/**
 * 获取当前URL
 * @param {object} [option] 设置项
 * @param {boolean} [option.pathname] 是否添加pathname
 * @returns {string}
 */
function getCurrentUrl(option: optionType = {}) {
  let url = location.protocol + '//' + location.host
  if (option.pathname || option.pathname === undefined) {
    url += location.pathname
  }
  return url
}

export default getCurrentUrl
