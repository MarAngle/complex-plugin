import config from '../../../config'
import getType from '../type/getType'

export let parseTimeOption = function(option) {
  if (getType(option) !== 'object') {
    option = {
      format: option
    }
  }
  if (!option.format) {
    option.format = config.time.format.default
  }
  return option
}

/**
 * 将Date字符串转换为Date
 * @param {string} data data
 * @param {string | object} [option]
 * @param {string} [option.format] Date字符串格式YYYY-MM-DD HH:ss:mm
 * @param {string} [option.current] 未传递参数是否按照当前时间为基准
 * @returns {Date}
 */
function parseTime(data, option) {
  let { format, current } = parseTimeOption(option)
  if (format === 'X') {
    return new Date(data * 1000)
  } else if (format === 'x') {
    return new Date(data)
  } else {
    let currentDate
    let args = []
    for (let i = 0; i < config.time.dict.list.length; i++) {
      const prop = config.time.dict.list[i]
      const dict = config.time.dict.data[prop]
      const index = format.indexOf(dict.code)
      if (index > -1) {
        let item = Number(data.substring(index, index + dict.code.length))
        if (dict.offset) {
          item = item - dict.offset
        }
        args.push(item)
      } else {
        if (current || dict.default === undefined) {
          if (!currentDate) {
            currentDate = new Date()
          }
          args.push(currentDate[dict.func]())
        } else {
          args.push(dict.default)
        }
      }
    }
    return new Date(...args)
  }
}

export default parseTime
