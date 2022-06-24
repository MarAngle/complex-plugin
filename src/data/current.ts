
const defaultOffset = 1000 * 60 * 10 // 10分钟

let callbackProp = 0

const offsetList: number[] = []

let timer: any

type callbackFunction = (currentDate: Date, from?: string) => any

const callback: {
  [prop: PropertyKey]: callbackFunction
} = {}

const data: {
  data: Date,
  [prop: PropertyKey]: any
} = {
  data: new Date()
}

const current = {
  data: data,
  offset: {
    data: defaultOffset,
    list: offsetList
  },
  callback: callback,
  /**
   * 加载当前时间
   */
  init: function() {
    this.autoUpdate('init')
  },
  /**
   * 自动更新时间
   * @param {string} from 自动更新调用判断值
   */
  autoUpdate: function(from: string) {
    this.update(from)
  },
  /**
   * 计算时间间隔
   */
  countOffset: function() {
    let data
    for (let n = 0; n < this.offset.list.length; n++) {
      if (data === undefined) {
        data = this.offset.list[n]
      } else if (data > this.offset.list[n]) {
        data = this.offset.list[n]
      }
    }
    if (data === undefined) {
      data = defaultOffset
    }
    this.offset.data = data
  },
  /**
   * 设置时间间隔
   * @param {number} offset 时间间隔
   * @param {boolean} auto 自动设置
   */
  setOffset: function(offset: number, auto = true) {
    this.offset.list.push(offset)
    this.countOffset()
    if (auto) {
      this.autoUpdate('set')
    }
  },
  /**
   * 删除对应时间间隔
   * @param {number} offset 要删除的时间间隔
   * @param {boolean} auto 自动设置
   */
  removeOffset: function(offset: number, auto = true) {
    const index = this.offset.list.indexOf(offset)
    if (index > -1) {
      this.offset.list.splice(index, 1)
      this.countOffset()
      this.countOffset()
      if (auto) {
        this.autoUpdate('remove')
      }
    }
  },
  /**
   * 更新操作
   * @param {string} from 更新来源
   */
  update: function(from: string) {
    this.clear()
    this.setData(new Date())
    this.triggerCallback(this.getData(), from)
    timer = setTimeout(() => {
      this.update('update')
    }, this.offset.data)
  },
  /**
   * 清除更新
   */
  clear: function() {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  },
  /**
   * 触发更新回调
   * @param {Date} currentDate 当前时间
   * @param {string} from 更新来源
   */
  triggerCallback: function(currentDate: Date, from?: string) {
    for (const n in this.callback) {
      if (this.callback[n]) {
        this.callback[n](currentDate, from)
      }
    }
  },
  /**
   * 设置更新回调
   * @param {function} fn 回调
   * @returns {number} 回调number
   */
  setCallback: function(fn: callbackFunction) {
    callbackProp++
    this.callback[callbackProp] = fn
    return callbackProp
  },
  /**
   * 删除回调
   * @param {number} prop 回调number
   */
  removeCallback: function(prop: PropertyKey) {
    if (this.callback[prop]) {
      delete this.callback[prop]
    }
  },
  /**
   * 设置数据
   * @param {Date | *} data 数据
   * @param {string} prop 属性
   */
  setData: function(data: any, prop = 'data') {
    this.data[prop] = data
  },
  /**
   * 获取数据
   * @param {string} prop 属性
   * @returns {*}
   */
  getData: function(prop = 'data') {
    return this.data[prop]
  }
}

current.init()

export default current
