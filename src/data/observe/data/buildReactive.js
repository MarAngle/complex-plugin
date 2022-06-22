import defineReactive from './../../reactive/defineReactive'
import observe from './../observe'
import Dep from './Dep'

/**
 * 创建响应式
 * @param {object} obj 响应式的对象
 * @param {string} prop 对应的属性
 * @returns {boolean}
 */
function buildReactive(obj, prop) {
  const dep = new Dep()
  let childOb = observe(obj[prop])
  return defineReactive(obj, prop, {
    get: function() {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
    },
    set: function(val, oldVal) {
      childOb = observe(val)
      dep.notify()
    }
  })
}
export default buildReactive
