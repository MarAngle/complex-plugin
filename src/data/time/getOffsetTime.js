import config from '../../../config'
import parseNum from '../number/parseNum'

function parseDownOffset(offset, dictList, data) {
  for (let i = 0; i < dictList.length; i++) {
    const prop = dictList[i]
    let currentData
    if (offset > 0) {
      const dict = config.time.dict.data[prop]
      const rate = dict.rate.down
      offset = offset * dict.rate.up
      if (!rate || i === (dictList.length - 1)) {
        currentData = offset
        offset = 0
      } else {
        let [currentInteger, currentDecimal] = parseNum(offset)
        if (currentDecimal) {
          currentData = currentInteger
          offset = currentDecimal
        } else {
          currentData = offset
          offset = 0
        }
      }
    } else {
      currentData = 0
    }
    addProp(data, prop, currentData)
  }
}

function parseUpOffset(offset, dictList, data) {
  for (let i = dictList.length - 1; i >= 0; i--) {
    const prop = dictList[i]
    let currentData
    if (offset > 0) {
      const dict = config.time.dict.data[prop]
      const rate = dict.rate.up
      if (!rate || i === 0) {
        currentData = offset
        offset = 0
      } else {
        let currentNum = offset / rate
        if (currentNum < 1) {
          currentData = offset
          offset = 0
        } else {
          let [currentNumInteger] = parseNum(currentNum)
          currentData = offset - currentNumInteger * rate
          offset = currentNumInteger
        }
      }
    } else {
      currentData = 0
    }
    addProp(data, prop, currentData)
  }
}
function addProp(data, prop, num) {
  if (!data[prop]) {
    data[prop] = num
  } else {
    data[prop] = data[prop] + num
  }
}
function parseOffset(offset, start, end, act) {
  for (let i = start; i < end; i++) {
    const prop = config.time.dict.list[i]
    const dict = config.time.dict.data[prop]
    const rate = dict.rate.down
    if (act == 'down') {
      offset = offset / rate
    } else {
      offset = offset * rate
    }
  }
  return offset
}

/**
 * 获取时间间隔对象
 * @param {number} offset 时间间隔
 * @param {'sec' | 'min' | 'hour' | 'date'} [unit] 时间间隔单位，默认为sec
 * @param {object} [option] 设置项
 * @param {'sec' | 'min' | 'hour' | 'date'} [option.start] 最小单位，默认为unit
 * @param {'sec' | 'min' | 'hour' | 'date'} [option.end] 最大单位，默认为date
 * @param {boolean} [option.complex] 是否返回复杂数据
 * @returns {object}
 */
function getOffsetTime(offset, unit = 'sec', option = {}) {
  let startUnit = option.start || unit
  let endUnit = option.end || 'date'
  let complex = option.complex
  let data = {}
  offset = Number(offset)
  // 最小单位，值应该>=endIndex
  let startIndex = config.time.dict.list.indexOf(startUnit)
  // 最大单位
  let endIndex = config.time.dict.list.indexOf(endUnit)
  // 当前单位
  let currentIndex = config.time.dict.list.indexOf(unit)
  if (startIndex < currentIndex) {
    // 最小单位大于当前单位时，需要将当前值换算到最小值
    offset = parseOffset(offset, startIndex, currentIndex, 'down')
    currentIndex = startIndex
  } else if (endIndex > currentIndex) {
    // 最大单位大于当前单位时，需要对当前值换算到最大值
    offset = parseOffset(offset, currentIndex, endIndex, 'up')
    currentIndex = endIndex
  }
  // 最小单位小于当前单位时，需要进行小数位的格式化操作
  if (startIndex > currentIndex) {
    let [integer, decimal] = parseNum(offset)
    // down
    if (decimal) {
      offset = integer
    }
    parseDownOffset(decimal, config.time.dict.list.slice(currentIndex + 1, startIndex + 1), data)
  }
  // 最大单位小于等于当前单位时，需要进行格式化操作
  parseUpOffset(offset, config.time.dict.list.slice(endIndex, currentIndex + 1), data)
  if (!complex) {
    return data
  } else {
    return {
      data: data,
      start: startIndex,
      end: endIndex
    }
  }
}

export default getOffsetTime
