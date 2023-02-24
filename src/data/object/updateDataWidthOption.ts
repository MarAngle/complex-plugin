import getType from './../type/getType'
import getLimitData from './../utils/getLimitData'
import LimitData, { LimitDataInitOption } from '../../build/LimitData'

const hasOwnProperty = Object.prototype.hasOwnProperty

export type optionType = {
  type?: 'total' | 'add',
  reset?: boolean,
  depth?: true | number,
  limitData?: LimitData,
  limit?: LimitDataInitOption
}

export type defaultOptionType = {
  type?: 'total' | 'add',
  reset?: boolean
}

export type formatOptionType = {
  type: 'total' | 'add',
  reset: boolean,
  depth: true | number,
  limitData: LimitData
}

/**
 * 格式化UpdateOption,updateDataWidthOption函数的设置项
 * @param {object} [option] 用户设置的设置项
 * @param {'total' | 'add'} [option.type] 全更新/附加更新判断值
 * @param {boolean} option.reset 重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
 * @param {boolean | number} [option.depth] 属性深度判断值
 * @param {LimitData} [option.limitData] 属性限制判断值
 * @param {object} [option.limit] 属性限制判断值limitData生成参数
 * @param {'forbid' | 'allow'} [option.limit.type] 属性限制判断值limitData生成参数-type
 * @param {string[]} [option.limit.list] 属性限制判断值limitData生成参数-list
 * @param {*} defaultOption 默认值
 * @returns {object}
 */
export const formatUpdateDataOption = function (option: optionType, defaultOption: defaultOptionType = {}):formatOptionType {
  // 初始化设置项
  if (typeof option !== 'object') {
    option = {}
  }
  // 格式化类型
  if (!option.type) {
    option.type = defaultOption.type ? defaultOption.type : 'total'
  }
  // 格式化类型
  if (option.reset === undefined) {
    option.reset = defaultOption.reset !== undefined ? defaultOption.reset : true
  }
  // 限制字段设置
  if (!option.limitData) {
    option.limitData = getLimitData(option.limit)
    if (option.limit) {
      delete option.limit
    }
  }
  // 深度设置项,为否不包括0时不限制深度,数组本身也是深度
  if (!option.depth && option.depth !== 0) {
    option.depth = true
  }
  return option as formatOptionType
}

/**
 * 基于origindata更新targetdata数据,type默认为add
 * @param {*} targetdata 目标数据
 * @param {*} origindata 数据源,以此数据为准对targetdata进行更新
 * @param {object} option 用户设置的设置项
 * @param {'total' | 'add'} option.type 全更新/附加更新判断值
 * @param {boolean} option.reset 重置判断值，默认为真，类型不同且reset为真时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
 * @param {LimitData} option.limitData 属性限制判断值
 * @param {boolean | number} option.depth 属性深度判断值
 * @param {number} [currentnum] 当前深度,从1开始计算
 * @param {string} [currentprop] 当前属性,多级按.
 * @param {Map} [map] 循环引用缓存
 * @returns targetdata
 */
function updateDataWidthOption(targetdata: any, origindata: any, option: formatOptionType, currentnum = 1, currentprop = '', map = new Map()) {
  const type = getType(origindata)
  // 复杂对象进行递归
  if (type == 'object' || type == 'array') {
    let unDeep = true
    let reset = false
    // 检查当前depth，深度判断通过后进行下一步判断
    if (option.depth === true || currentnum <= option.depth) {
      /*
        类型相同时进行深拷贝循环
        类型不同时，reset设置为真（默认为真）时，无法将以前的数据作为基准，将会对源数据的对应值根据类型重置后再进行深拷贝循环
        为否时则直接进行赋值操作，不进行深拷贝循环
        ！此时可能会出现赋值数据中的限制字段无效的情况发生
      */
      const targetType = getType(targetdata)
      if (targetType === type) {
        unDeep = false
      } else if (option.reset) {
        unDeep = false
        reset = true
      }
    }
    if (unDeep) {
      targetdata = origindata
    } else {
      // 循环引用判断
      const cachedata = map.get(origindata)
      if (cachedata) {
        targetdata = cachedata
      } else {
        // 此时进行深拷贝循环
        currentnum++
        let cachePropList: undefined | string[]
        /*
          cachePropList:已经设置的prop属性值列表缓存
          reset模式下无需对此值进行缓存，因为源数据没用需要删除的数据
          非reset模式下type=total时需要进行缓存，此时需要将已经进行赋值操作的属性进行缓存
        */
        if (reset) {
          targetdata = type === 'object' ? {} : []
        } else if (option.type == 'total') {
          cachePropList = []
        }
        if (Object.getPrototypeOf(targetdata) !== Object.getPrototypeOf(origindata)) {
          Object.setPrototypeOf(targetdata, Object.getPrototypeOf(origindata))
        }
        map.set(origindata, targetdata)
        for (const key in origindata) {
          if (hasOwnProperty.call(origindata, key)) {
            const nextprop = currentprop ? currentprop + '.' + key : key
            // 判断下一级的属性是否存在赋值限制，被限制的不进行赋值操作
            if (!option.limitData.getLimit(nextprop)) {
              targetdata[key] = updateDataWidthOption(targetdata[key], origindata[key], option, currentnum, nextprop, map)
              if (cachePropList) {
                // 将进行赋值操作的属性进行缓存
                cachePropList.push(key)
              }
            }
          }
        }
        if (cachePropList && cachePropList.length > 0) {
          // 存在缓存属性时说明此时模式为total模式，删除目标数据未命中的属性
          for (const n in targetdata) {
            if (cachePropList.indexOf(n) < 0) {
              delete targetdata[n]
            }
          }
        }
      }
    }
  } else {
    targetdata = origindata
  }
  return targetdata
}

export default updateDataWidthOption
