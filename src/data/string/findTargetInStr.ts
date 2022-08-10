import exportSelfMsg from './../utils/exportSelfMsg'

/**
 * 获取指定字符串在目标字符串中的位置数组,理论上不单独调用
 * @param {string} str 目标字符串
 * @param {string} target 需要查找的字符串
 * @param {number} limitNum 限制数量,false不限制
 * @param {number[]} list index位置数组
 * @param {number} index 开始查找的坐标
 * @returns {number[]}
 */
 function findTargetInStrNext(str: string, target: string, limitNum: number, list: number[] = [], index = 0): number[] {
  const data = str.indexOf(target, index)
  if (data > -1) {
    list.push(data)
    if (limitNum === 0 || limitNum > list.length) {
      list = findTargetInStrNext(str, target, limitNum, list, data + target.length)
    }
  }
  return list
}

type optionType = {
  limitNum?: number,
  case?: boolean
}

/**
 * 查找target在目标字符串中的位置数组
 * @param {string} str 目标字符串
 * @param {string} target 需要查找的字符串
 * @param {object} [option] 设置项
 * @param {boolean} option.case 是否忽略大小写,默认不忽略
 * @param {number} option.limitNum 限制数量,0不限制
 * @returns {number[]}
 */
function findTargetInStr(str: string, target: string, option: optionType = {}): number[] {
  if (str && target) {
    str = str.toString()
    target = target.toString()
    const limitNum = option.limitNum || 0
    if (option.case) {
      str = str.toUpperCase()
      target = target.toUpperCase()
    }
    return findTargetInStrNext(str, target, limitNum)
  } else {
    exportSelfMsg('str/target参数不存在')
    return []
  }
}

export default findTargetInStr
