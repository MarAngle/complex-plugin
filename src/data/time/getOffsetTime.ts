import config from '../../../config'
import { baseObject } from '../../../ts'
import parseNum from '../number/parseNum'


export type unitType = 'sec' | 'min' | 'hour' | 'date'

export interface optionType {
  start?: unitType,
  end?: unitType,
  complex?: true
}
export interface complexOptionType {
  start?: unitType,
  end?: unitType,
  complex: true
}
export interface SimpleOptionType {
  start?: unitType,
  end?: unitType
}

export type dataType = baseObject<number>
export type complexResType = {
  data: dataType,
  start: number,
  end: number
}

function parseDownOffset(offset: number, dictList: string[], data: dataType) {
  for (let i = 0; i < dictList.length; i++) {
    const prop = dictList[i]
    let currentData
    if (offset > 0) {
      const dict = (config.time.dict.data as any)[prop]
      const rate = dict.rate.down
      offset = offset * dict.rate.up
      if (!rate || i === (dictList.length - 1)) {
        currentData = offset
        offset = 0
      } else {
        const [currentInteger, currentDecimal] = parseNum(offset)
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

function parseUpOffset(offset: number, dictList: string[], data: dataType) {
  for (let i = dictList.length - 1; i >= 0; i--) {
    const prop = dictList[i]
    let currentData
    if (offset > 0) {
      const dict = (config.time.dict.data as any)[prop]
      const rate = dict.rate.up
      if (!rate || i === 0) {
        currentData = offset
        offset = 0
      } else {
        const currentNum = offset / rate
        if (currentNum < 1) {
          currentData = offset
          offset = 0
        } else {
          const [currentNumInteger] = parseNum(currentNum)
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
function addProp(data: dataType, prop: string, num: number) {
  if (!data[prop]) {
    data[prop] = num
  } else {
    data[prop] = data[prop] + num
  }
}
function parseOffset(offset: number, start: number, end: number, act: 'down' | 'up') {
  for (let i = start; i < end; i++) {
    const prop = config.time.dict.list[i]
    const dict = (config.time.dict.data as any)[prop]
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
function getOffsetTime(offset: number, unit: unitType, option: complexOptionType): complexResType
function getOffsetTime(offset: number, unit: unitType, option: SimpleOptionType): dataType
function getOffsetTime(offset: number, unit: unitType = 'sec', option: optionType = {}) {
  const startUnit: unitType = option.start || unit
  const endUnit: unitType = option.end || 'date'
  const complex = option.complex
  const data: dataType = {}
  offset = Number(offset)
  // 最小单位，值应该>=endIndex
  const startIndex = config.time.dict.list.indexOf(startUnit)
  // 最大单位
  const endIndex = config.time.dict.list.indexOf(endUnit)
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
    const [integer, decimal] = parseNum(offset)
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
