import Data from './Data'
import config from '../../config'
import getLocalData from '../data/local/getLocalData'
import removeLocalData from '../data/local/removeLocalData'
import setLocalData from '../data/local/setLocalData'
import getType from './../data/type/getType'
import isExist from './../data/type/isExist'

class TokenRule extends Data {
  constructor (prop, initdata) {
    super()
    let type = getType(initdata)
    if (type !== 'object') {
      initdata = {
        data: initdata
      }
    }
    this.prop = prop
    this.require = initdata.require || false
    this.data = initdata.data || undefined
    this.location = initdata.location || config.TokenRule.location
    this.empty = initdata.empty === undefined ? false : initdata.empty
    this.getCurrentData = initdata.getData || false
    this.removeCurrentData = initdata.removeData || false
    this.checkCurrentData = initdata.checkData || function(data) {
      return isExist(data)
    }
  }
  /**
   * 生成local的name
   * @param {string} parentProp 父RequireRule的prop属性
   * @returns {string}
   */
  $buildLocalTokenName(parentProp) {
    return `${parentProp || ''}-${this.prop}`
  }
  /**
   * 设置token值
   * @param {string} parentProp 父RequireRule的prop属性
   * @param {*} data token值
   * @param {boolean} [noSave] 不保存到local的判断值
   */
  setData(parentProp, data, noSave) {
    this.data = data
    if (!noSave) {
      setLocalData(this.$buildLocalTokenName(parentProp), data)
    }
  }
  /**
   * 获取token值
   * @param {string} parentProp 父RequireRule的prop属性
   * @returns {*}
   */
  getData(parentProp) {
    let data = this.getCurrentData ? this.getCurrentData() : this.data
    if (!this.checkCurrentData(data)) {
      data = getLocalData(this.$buildLocalTokenName(parentProp))
      if (this.checkCurrentData(data)) {
        this.setData(parentProp, data, true)
      }
    }
    return data
  }
  /**
   * 检查值是否存在
   * @param {*} data 需要检查的值
   * @returns {'success' | 'fail' | ''}
   */
  checkData(data) {
    let next = 'success'
    if (!this.checkCurrentData(data)) {
      // 当前值检查判断为不存在
      if (this.require) {
        next = 'fail'
      } else if (!this.empty) {
        next = ''
        // 值不存在且不要求时,empty为否不上传空值,此时为'',不进行append操作
      }
      // 值不存在且不要求时,传递,此时为success
    }
    return next
  }
  /**
   * 清除token数据
   * @param {string} parentProp 父RequireRule的prop属性
   * @param {boolean} isDelete 是否进行删除
   */
  removeData(parentProp, isDelete) {
    removeLocalData(this.$buildLocalTokenName(parentProp))
    this.data = undefined
    if (this.removeCurrentData) {
      this.removeCurrentData(isDelete, parentProp)
    }
  }
}

TokenRule.$name = 'TokenRule'

export default TokenRule
