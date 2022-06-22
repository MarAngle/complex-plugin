import config from '../../../config'
import fillString from '../string/fillString'

/**
 * 将Date对象转换为Date字符串
 * @param {Date} date
 * @param {string} [format] Date字符串格式YYYY-MM-DD HH:ss:mm
 * @returns {string}
 */
function showTime(date, format) {
  if (!format) {
    format = config.time.format.default
  }
  let dateStr = format
  for (let i = 0; i < config.time.dict.list.length; i++) {
    const prop = config.time.dict.list[i]
    const dict = config.time.dict.data[prop]
    const index = dateStr.indexOf(dict.code)
    if (index > -1) {
      let data = date[dict.func]() + dict.offset
      dateStr = dateStr.replace(dict.code, fillString(data, dict.code.length))
    }
  }
  return dateStr
}

export default showTime
