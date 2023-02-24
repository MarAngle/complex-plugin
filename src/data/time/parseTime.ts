import config from '../../../config'
import getType from '../type/getType'


export type optionType = {
  format?: string,
  current?: boolean
}

type formatOptionType = {
  format: string,
  current?: boolean
}

export const parseTimeOption = function(option?: string | optionType): formatOptionType {
  if (getType(option) !== 'object') {
    option = {
      format: (<string>option)
    }
  }
  if (!(<optionType>option).format) {
    (<optionType>option).format = config.time.format.default
  }
  return (<formatOptionType>option)
}


/**
 * 将Date字符串转换为Date
 * @param {string} data data
 * @param {string | object} [option]
 * @param {string} [option.format] Date字符串格式YYYY-MM-DD HH:ss:mm
 * @param {string} [option.current] 未传递参数是否按照当前时间为基准
 * @returns {Date}
 */
function parseTime(data: number, option: 'X'): Date
function parseTime(data: number | string, option: 'x'): Date
function parseTime(data: string, option?: string | optionType): Date
function parseTime(data: string | number, option?: string | optionType): Date {
  const { format, current } = parseTimeOption(option)
  if (format === 'X') {
    return new Date((<number>data) * 1000)
  } else if (format === 'x') {
    return new Date(data)
  } else {
    let currentDate: any
    const args: number[] = []
    for (let i = 0; i < config.time.dict.list.length; i++) {
      const prop = config.time.dict.list[i]
      const dict = (config.time.dict.data as any)[prop]
      const index = format.indexOf(dict.code)
      if (index > -1) {
        let item = Number((<string>data).substring(index, index + dict.code.length))
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
    return new (Date as any)(...args)
  }
}

export default parseTime
