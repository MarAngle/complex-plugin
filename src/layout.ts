import { _Data, Life, throttle } from "complex-utils"
import { DataWithLife } from "complex-utils/src/class/Life"

class DefaultLayout extends _Data implements DataWithLife {
  static $formatConfig = { name: 'DefaultLayout', level: 80, recommend: true }
  $life: Life
  constructor() {
    super()
    this.$life = new Life()
  }
  /**
   * 设置生命周期回调函数
   * @param {string} name 对应生命周期
   * @param {*} data 回调对象
   * @returns {string | string} id/idList
   */
  onLife(...args: Parameters<Life['on']>) {
    return this.$life.on(...args)
  }
  /**
   * 触发生命周期指定id函数
   * @param {string} name 生命周期
   * @param {string} id 指定ID
   * @param  {...any} args 参数
   */
  emitLife(...args: Parameters<Life['emit']>) {
    this.$life.emit(...args)
  }
  /**
   * 删除生命周期指定函数
   * @param {string} name 生命周期
   * @param {string} id 指定ID
   * @returns {boolean}
   */
  offLife(...args: Parameters<Life['off']>): boolean {
    return this.$life.off(...args)
  }
  /**
   * 触发生命周期
   * @param {string} name 生命周期
   * @param  {...any} args 参数
   */
  triggerLife(...args: Parameters<Life['trigger']>) {
    this.$life.trigger(...args)
  }
  /**
   * 清除生命周期
   * @param {string} name 生命周期
   */
  clearLife(...args: Parameters<Life['clear']>) {
    this.$life.clear(...args)
  }
  /**
   * 生命周期重置
   */
  resetLife() {
    this.$life.reset()
  }
}

export interface PluginLayoutDataInitOption {
  width?: number
  height?: number
  type?: string // 当前状态判断值
  onChange?: (...args: unknown[]) => void
  count?: (extraLayout: PluginLayoutData) => void
}

export class PluginLayoutData {
  static $formatConfig = { name: 'PluginLayoutData', level: 80, recommend: true }
  width: number
  height: number
  type?: string // 当前状态判断值
  onChange?: (...args: unknown[]) => void
  constructor(initOption: PluginLayoutDataInitOption) {
    this.width = initOption.width || 0
    this.height = initOption.height || 0
    if (initOption.type !== undefined) {
      this.type = initOption.type
    }
    if (initOption.onChange !== undefined) {
      this.onChange = initOption.onChange
    }
    if (initOption.count) {
      this.count = initOption.count
    }
  }
  change(width: number, height: number) {
    if (this.width !== width || this.height !== height) {
      this.width = width
      this.height = height
      return true
    } else {
      return false
    }
  }
  count(extraLayout: PluginLayoutData) {
    if (this.width) {
      extraLayout.width += this.width
    }
    if (this.height) {
      extraLayout.height += this.height
    }
  }
}

class PluginLayout extends DefaultLayout {
  type: string
  body: PluginLayoutData
  extra: PluginLayoutData
  main: PluginLayoutData
  data: Record<string, PluginLayoutData>
  func: (...args: any[]) => void
  constructor(modData?: Record<string, PluginLayoutDataInitOption>) {
    super()
    this.type = 'default'
    this.body = new PluginLayoutData({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
    this.extra = new PluginLayoutData({})
    this.main = new PluginLayoutData({})
    this.data = {}
    if (modData) {
      for (const prop in modData) {
        this.installLayout(prop, modData[prop])
      }
    }
    this.countBody()
    this.func = throttle(() => {
      this.countBody()
    }, 200, 'immediate')
    window.addEventListener('resize', this.func)
  }
  installLayout(prop: string, layoutDataInitOption: PluginLayoutDataInitOption, unCount?: boolean) {
    this.data[prop] = new PluginLayoutData(layoutDataInitOption)
    if (!unCount) {
      this.$countMain(true)
      this.triggerLife('install', prop)
    }
  }
  // 触发重计算
  $countMain(extraCount?: boolean) {
    if (extraCount) {
      const extra = new PluginLayoutData({})
      for (const prop in this.data) {
        const layoutData = this.data[prop]
        layoutData.count(extra)
      }
      if (this.extra.change(extra.width, extra.height)) {
        this.triggerLife('extra')
      }
    }
    // 重计算可用部分
    if (this.main.change(this.body.width - this.extra.width, this.body.height - this.extra.height)) {
      this.triggerLife('main')
    }
  }
  countBody(extraCount?: boolean) {
    if (this.body.change(document.documentElement.clientWidth, document.documentElement.clientHeight)) {
      this.$countMain(extraCount)
      this.triggerLife('body')
    } else if (extraCount) {
      this.$countMain(extraCount)
    }
  }
  triggerChange(prop: string, ...args: any[]) {
    const layoutData = this.data[prop]
    if (layoutData) {
      layoutData.onChange ? layoutData.onChange(...args) : undefined
      this.$countMain(true)
      this.triggerLife('change', prop, ...args)
    } else {
      this.$exportMsg(`触发的${prop}模块不存在，请检查！`, 'error')
    }
  }
  destory() {
    window.removeEventListener('resize', this.func)
  }
}

export default PluginLayout
