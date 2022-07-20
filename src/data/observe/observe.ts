import { OBNAME } from './data/config'
import Observer from './data/Observer'

const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * 将value设置为观察者数据
 * @param {*} value 需要设置的数据
 * @returns {Observer}
 */
function observe(value: any) {
  if (typeof value !== 'object' || value === null) {
    return
  }
  let ob
  if (hasOwnProperty.call(value, OBNAME) && value[OBNAME] instanceof Observer) {
    ob = value[OBNAME]
  } else {
    ob = new Observer(value)
  }
  return ob
}

export default observe
