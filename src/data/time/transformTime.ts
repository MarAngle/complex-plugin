import config from '../../../config'
import fillString from '../string/fillString'
import { parseTimeOption, optionType } from './parseTime'

function transformTime(data: string, option?: optionType, showFormat?: string) {
  const { format, current } = parseTimeOption(option)
  let currentDate
  let dateStr = showFormat || config.time.format.default
  for (let i = 0; i < config.time.dict.list.length; i++) {
    const prop = config.time.dict.list[i]
    const dict = (config.time.dict.data as any)[prop]
    const showIndex = dateStr.indexOf(dict.code)
    if (showIndex > -1) {
      const index = format.indexOf(dict.code)
      let num
      if (index > -1) {
        num = data.substring(index, index + dict.code.length)
      } else {
        if (current || dict.default === undefined) {
          if (!currentDate) {
            currentDate = new Date()
          }
          num = (currentDate as any)[dict.func]() + dict.offset
        } else {
          num = dict.default + dict.offset
        }
      }
      dateStr = dateStr.replace(dict.code, fillString(num, dict.code.length))
    }
  }
  return dateStr
}

export default transformTime
