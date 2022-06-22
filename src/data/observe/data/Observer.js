import { OBNAME } from './config'
import defineProperty from '../../object/defineProperty'
import buildReactive from './buildReactive'
import Dep from './Dep'

class Observer {
  constructor(value) {
    // 每个Observer实例上都存在dep
    this.dep = new Dep()
    defineProperty(value, OBNAME, {
      value: this,
      enumerable: false,
      writable: true
    })
    this.walk(value)
  }
  /**
   * 遍历
   * @param {*} value 需要遍历的值
   */
  walk(value) {
    for (let k in value) {
      buildReactive(value, k, {})
    }
  }
}

export default Observer
