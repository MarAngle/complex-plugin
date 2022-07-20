import Watcher from '../Watcher'

let uid = 0

class Dep {
  static target?: null | Watcher
  id: number
  subs: Watcher[]
  constructor() {
    this.id = uid++
    // 用数组存储订阅者,也就是Watcher的实例
    this.subs = []
  }
  /**
   * 添加订阅Watcher
   * @param {Watcher} sub Watcher实例
   */
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }
  /**
   * 删除订阅Watcher
   * @param {Watcher} sub Watcher实例
   */
  removeSub (sub: Watcher) {
    const index = this.subs.indexOf(sub)
    if (index > -1) {
      this.subs.splice(index, 1)
    }
  }
  /**
   * 添加依赖
   */
  depend() {
    if (Dep.target) {
      // addSub将在Watcher中完成
      Dep.target.addDep(this)
    }
  }
  /**
   * 通知更新
   */
  notify() {
    // 浅拷贝
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

export default Dep
