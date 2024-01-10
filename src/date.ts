import { UtilsData } from "complex-utils"

export type parseType<D = unknown> = (value: Date) => D

export interface ReactiveDateInitOption {
  rule?: Record<string, parseType<Date>>
  parser?: Record<string, parseType>
  offset?: number
}

const defaultOffset = 1000 * 60 * 10 // 10分钟

class ReactiveDate extends UtilsData {
  static $formatConfig = { name: 'Plugin:ReactiveDate', level: 20, recommend: false }
  $rule: Record<string, parseType<Date>>
  $parser: Record<string, parseType>
  $offset: {
    value: number
    list: number[]
  }
  value: Record<string, Date>
  $data: Record<string, Record<string, unknown>>
  $timer: number
  constructor(initOption: ReactiveDateInitOption = {}) {
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
    this.$data = {}
    this.$timer = 0
    this.$update('init')
  }
  protected _syncValue() {
    for (const name in this.$rule) {
      this._syncTargetValue(name)
    }
  }
  protected _syncTargetValue(name: string) {
    this.value[name] = this.$rule[name](this.value.current)
  }
  protected _syncData() {
    for (const name in this.$parser) {
      this._syncTargetData(name)
    }
  }
  protected _syncTargetData(name: string) {
    const parse = this.$parser[name]
    for (const prop in this.value) {
      this.$data[name][prop] = parse(this.value[prop])
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
  pushRule(name: string, rule: parseType<Date>, replace?: boolean) {
    if (replace === true || !this.$rule[name]) {
      this.$rule[name] = rule
      this._syncTargetValue(name)
    }
  }
  pushParse(name: string, parse: parseType, replace?: boolean) {
    if (replace === true || !this.$parser[name]) {
      this.$parser[name] = parse
      this.$data[name] = {}
      this._syncTargetData(name)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $update(from: string) {
    this.$clear()
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
  stop() {
    this.$clear()
  }
}

const date = new ReactiveDate({
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
