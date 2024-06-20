import { _Data, Life, throttle } from "complex-utils"
import { DataWithLife } from "complex-utils/src/class/Life"

type layoutType = {
  width: number
  height: number
}

export interface modInitOption extends Partial<layoutType> {
  type?: string
  change?: (...args: unknown[]) => void
  onRecount?: (extraData: layoutType) => void
}

export interface modType extends modInitOption {}

export class PluginLayout extends _Data implements DataWithLife {
  static $formatConfig = { name: 'PluginLayout', level: 80, recommend: true }
  type: string
  offset: number
  body: layoutType
  main: layoutType
  extra: layoutType
  $life: Life
  mod: Record<string, modType>
  constructor(modData?: Record<string, modInitOption>) {
    super()
    this.type = 'default'
    this.offset = 200
    this.body = {
      width: 0,
      height: 0
    }
    this.main = {
      width: 0,
      height: 0
    }
    this.extra = {
      width: 0,
      height: 0
    }
    this.$life = new Life()
    this.mod = {}
    this.init(modData)
  }
  init(modData?: Record<string, modInitOption>) {
    this.$recountBody()
    if (modData) {
      for (const modName in modData) {
        this.installMod(modName, modData[modName])
      }
    }
    window.onresize = throttle(() => {
      this.$recountBody()
    }, this.offset, 'immediate')
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
  installMod(name: string, modInitOption: modInitOption, unRecount?: boolean) {
    if (modInitOption) {
      if (modInitOption.onRecount == undefined) {
        modInitOption.onRecount = function(extraData) {
          if (this.width) {
            extraData.width += this.width
          }
          if (this.height) {
            extraData.height += this.height
          }
        }
      }
      this.mod[name] = modInitOption as modType
      if (!unRecount) {
        this.$recountMain(true)
        this.triggerLife('install', name)
      }
    }
  }
  triggerChange(name: string, ...args: any[]) {
    const mod = this.mod[name]
    if (mod) {
      mod.change ? mod.change(...args) : undefined
      this.$recountMain(true)
      this.triggerLife('change', name, ...args)
    } else {
      this.$exportMsg(`触发的${name}模块不存在，请检查！`, 'error')
    }
  }
  // 触发重计算
  $recountMain(extraChange?: boolean) {
    if (extraChange) {
      // 重计算额外占用部分
      this.extra.width = 0
      this.extra.height = 0
      for (const name in this.mod) {
        const modData = this.mod[name]
        if (modData && modData.onRecount) {
          modData.onRecount(this.extra)
        }
      }
      this.triggerLife('recount', 'extra')
    }
    // 重计算可用部分
    this.main.width = this.body.width - this.extra.width
    this.main.height = this.body.height - this.extra.height
    this.triggerLife('recount', 'main')
  }
  $recountBody(extraChange?: boolean) {
    this.body.width = document.documentElement.clientWidth
    this.body.height = document.documentElement.clientHeight
    this.$recountMain(extraChange)
    this.triggerLife('recount', 'body')
  }
}
