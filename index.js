import _func from './src/main'
import setData from './src/option/setData'
import noticeData from './src/option/noticeData'

_func.install = function(Vue, options = {}) {
  this.init(options)
  if (options.prop === undefined) {
    options.prop = '_func'
  }
  if (options.toGlobal) {
    window[options.prop] = this
  }
  let version = Vue.version.split('.')[0]
  if (version == '2') {
    // 设置属性重置为Vue.set
    setData.Vue = Vue
    setData.set = function(target, prop, data) {
      this.Vue.set(target, prop, data)
    }
    if (options.prop) {
      // 构建响应式数据
      for (let prop in this) {
        if (this.getType(this[prop] == 'object')) {
          Vue.observable(this[prop])
        }
      }
      Vue.prototype[options.prop] = this
    }
  } else if (version == '3') {
    Vue.config.globalProperties[options.prop] = this
  }
}

export { noticeData, setData }

export default _func
