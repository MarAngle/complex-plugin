import { _Data } from "complex-utils"

export type parseType<D = unknown> = (value: Date) => D

export interface PluginDateInitOption {
  rule?: Record<string, parseType<Date>>
  parser?: Record<string, parseType>
  offset?: number
}

const defaultOffset = 1000 * 60 * 1 // 1分钟

class PluginDate extends _Data {
  static $formatConfig = { name: 'PluginDate', level: 20, recommend: false }
  $rule: Record<string, parseType<Date>>
  $parser: Record<string, parseType>
  $offset: {
    value: number
    list: number[]
  }
  value: {
    current: Date
    [prop: string]: undefined | Date
  }
  data: Record<string, Record<string, unknown>>
  $timer: number
  constructor(initOption: PluginDateInitOption = {}) {
    super()
    this.$rule = initOption.rule || {}
    this.$parser = initOption.parser || {}
    const offset = initOption.offset || defaultOffset
    this.$offset = {
      value: offset,
      list: [offset]
    }
    this.value = {
      current: new Date()
    }
    this.data = {}
    this.$timer = 0
    this.$update('init')
  }
  protected _syncValue() {
    for (const ruleName in this.$rule) {
      this._syncTargetValue(ruleName)
    }
  }
  protected _syncTargetValue(ruleName: string) {
    this.value[ruleName] = this.$rule[ruleName](this.value.current)
  }
  protected _syncData() {
    for (const parseName in this.$parser) {
      this._syncTargetData(parseName)
    }
  }
  protected _syncTargetData(parseName: string) {
    const parse = this.$parser[parseName]
    for (const ruleName in this.value) {
      this.data[parseName][ruleName] = parse(this.value[ruleName]!)
    }
  }
  protected _countOffset() {
    let data: undefined | number
    for (let n = 0; n < this.$offset.list.length; n++) {
      if (data === undefined) {
        data = this.$offset.list[n]
      } else if (data > this.$offset.list[n]) {
        data = this.$offset.list[n]
      }
    }
    if (data === undefined) {
      data = defaultOffset
    }
    this.$offset.value = data
  }
  getValue(prop = 'current') {
    return this.value[prop]
  }
  getData(parseName: string, ruleName: string) {
    return this.data[parseName][ruleName]
  }
  pushOffset(offset: number, update = true) {
    this.$offset.list.push(offset)
    this._countOffset()
    if (update) {
      this.$update('pushOffset')
    }
  }
  removeOffset(offset: number, update = true) {
    const index = this.$offset.list.indexOf(offset)
    if (index > -1) {
      this.$offset.list.splice(index, 1)
      this._countOffset()
      if (update) {
        this.$update('removeOffset')
      }
    }
  }
  pushRule(ruleName: string, rule: parseType<Date>, replace?: boolean) {
    if (replace === true || !this.$rule[ruleName]) {
      this.$rule[ruleName] = rule
      this._syncTargetValue(ruleName)
    }
  }
  pushParse(parseName: string, parse: parseType, replace?: boolean) {
    if (replace === true || !this.$parser[parseName]) {
      this.$parser[parseName] = parse
      this.data[parseName] = {}
      this._syncTargetData(parseName)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $update(from: string) {
    this.$clear()
    this.value.current = new Date()
    this._syncValue()
    this._syncData()
    this.$timer = setTimeout(() => {
      this.$update('update')
    }, this.$offset.value) as unknown as number
  }
  $clear() {
    if (this.$timer) {
      clearTimeout(this.$timer)
      this.$timer = 0
    }
  }
  destory() {
    this.$clear()
  }
}

const date = new PluginDate({
  rule: {
    today: value => {
      return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0)
    },
    tomorrow: value => {
      return new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1, 0, 0, 0)
    }
  }
})

export default date
