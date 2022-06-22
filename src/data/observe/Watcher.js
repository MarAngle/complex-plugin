import getType from '../type/getType'
import Dep from './data/Dep'
import parsePath from './data/parsePath'
import traverse from './data/traverse'

var uid = 0
class Watcher {
  constructor(target, expression, option) {
    this.id = uid++
    this.deps = {
      current: {
        ids: new Set(),
        list: []
      },
      newTmp: {
        ids: new Set(),
        list: []
      }
    }
    this.active = true
    this.target = target
    this.getter = parsePath(expression)
    let optionType = getType(option)
    if (optionType != 'object') {
      option = {
        handler: option
      }
    }
    this.callback = option.handler
    this.deep = !!option.deep
    this.value = this.get()
  }
  /**
   * 触发更新
   */
  update() {
    this.run()
  }
  /**
   * 添加依赖
   * @param {Dep} dep 依赖
   */
  addDep(dep) {
    const id = dep.id
    if (!this.deps.newTmp.ids.has(id)) {
      this.deps.newTmp.ids.add(id)
      this.deps.newTmp.list.push(dep)
      if (!this.deps.current.ids.has(id)) {
        dep.addSub(this)
      }
    }
  }
  cleanupDeps() {
    let i = this.deps.current.list.length
    // 将不存在于新数据的依赖清空
    while (i--) {
      const dep = this.deps.current.list[i]
      if (!this.deps.newTmp.ids.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    // 切换新旧依赖
    let tmp = this.deps.current.ids
    this.deps.current.ids = this.deps.newTmp.ids
    this.deps.newTmp.ids = tmp
    this.deps.newTmp.ids.clear()

    tmp = this.deps.current.list
    this.deps.current.list = this.deps.newTmp.list
    this.deps.newTmp.list = tmp
    this.deps.newTmp.list.length = 0
  }
  /**
   * 获取数据
   * @returns {*}
   */
  get() {
    // 进入依赖收集阶段,让全局的Dep.target设置为watcher本身
    Dep.target = this
    const obj = this.target
    let value
    try {
      value = this.getter(obj)
    } finally {
      if (this.deep) {
        traverse(value)
      }
      // 退出依赖收集阶段
      Dep.target = null
      this.cleanupDeps()
    }
    return value
  }
  /**
   * 运行
   */
  run() {
    if (this.active) {
      const value = this.get()
      if (value !== this.value || typeof value == 'object') {
        const oldValue = this.value
        this.value = value
        this.callback.call(this.target, value, oldValue)
      }
    }
  }
  /**
   * 关闭watcher
   */
  stop() {
    if (this.active) {
      let i = this.deps.current.list.length
      while (i--) {
        this.deps.current.list[i].removeSub(this)
      }
      this.active = false
    }
  }
}

export default Watcher
