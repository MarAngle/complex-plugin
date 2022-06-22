import Data from './Data'
import getType from './../data/type/getType'
import exportMsg from './../data/utils/exportMsg'

const base = {
  num: '0-9',
  letter: {
    small: 'a-z',
    big: 'A-Z'
  },
  text: '\u4e00-\u9fa5',
  bd: {
    z: '，。？！‘’”“<>%',
    y: ',.?!\'\'""《》%'
  }
}

// 规则校验数据
class RuleData extends Data {
  constructor (initdata) {
    super()
    if (initdata) {
      this.$initMain(initdata)
    }
  }
  /**
   * 加载
   * @param {*} initdata 参数
   */
  $initMain(initdata) {
    if (!initdata) {
      this.$exportMsg('init无参数!')
      return false
    }
    // 类型
    this.type = initdata.type || 'reg'
    if (initdata.build) {
      this.$buildData(initdata)
    } else {
      this.data = initdata.data
    }
    // 是否组合模式
    this.merge = this.$formatMerge(initdata.merge)
  }
  /**
   * 格式化组合数据
   * @param {true | object} [mergeData] 组合式初始化数据
   * @returns {undefined | object}
   */
  $formatMerge(mergeData) {
    if (mergeData) {
      if (mergeData === true) {
        mergeData = {}
      }
      if (!mergeData.limit) {
        mergeData.limit = {}
      }
      if (mergeData.limit.start === undefined) {
        mergeData.limit.start = '^'
      }
      if (mergeData.limit.end === undefined) {
        mergeData.limit.end = '$'
      }
      if (!mergeData.num) {
        mergeData.num = {}
      }
      if (mergeData.num.min === undefined) {
        mergeData.num.min = '1'
      }
      if (mergeData.num.max === undefined) {
        mergeData.num.max = ''
      }
    }
    return mergeData
  }
  /**
   * 初始化数据
   * @param {object} initdata 数据
   */
  $buildData(initdata) {
    if (this.type == 'reg') {
      if (initdata.merge === undefined) {
        initdata.merge = true
      }
      let regData = this.$buildRegData(initdata.build, base)
      this.data = regData
    }
  }
  /**
   * 创建RegStr数据
   * @param {undefined | true | object} propObject 指定的属性prop
   * @param {object} data 属性prop的归属数据
   * @returns {string}
   */
  $buildRegData(propObject, data) {
    let regStr = ''
    if (propObject === true) {
      for (let n in data) {
        let info = data[n]
        if (getType(info) == 'object') {
          regStr += this.$buildRegData(true, info)
        } else {
          regStr += info
        }
      }
    } else {
      let type = getType(propObject)
      if (type == 'object') {
        for (let i in propObject) {
          let prop = propObject[i]
          let info = data[i]
          if (getType(info) === 'object') {
            regStr += this.$buildRegData(getType(prop) === 'string' ? true : prop, info)
          } else {
            regStr += info
          }
        }
      }
    }
    return regStr
  }
  /**
   * 根据mergeData生成regstr
   * @param {string} regData regstr
   * @param {object} mergeData 组合数据
   * @returns {string}
   */
  $buildRegStr(regData, mergeData) {
    return `${mergeData.limit.start}[${regData}]{${mergeData.num.min},${mergeData.num.max}}${mergeData.limit.end}`
  }
  /**
   * 根据regstr生成Reg
   * @param {string} regData regstr
   * @param {object} mergeData 组合数据
   * @returns {RegExp}
   */
  $buildReg(regData, mergeData) {
    return new RegExp(this.$buildRegStr(regData, mergeData))
  }
  /**
   * 检查数据
   * @param {*} data 需要检查的数据
   * @param {*} option 选项
   * @returns {boolean}
   */
  check(data, option = {}) {
    if (this.type == 'reg') {
      let reg = this.data
      if (option.merge) {
        option.merge = this.$formatMerge(option.merge)
      }
      let merge = option.merge || this.merge
      if (merge) {
        reg = this.$buildReg(reg, merge)
      }
      let type = getType(reg, true)
      if (type != 'regexp') {
        reg = new RegExp(reg)
      }
      return reg.test(data)
    } else if (this.type == 'func') {
      return this.data(data, option)
    }
  }
}

RuleData.$name = 'RuleData'

export default RuleData
