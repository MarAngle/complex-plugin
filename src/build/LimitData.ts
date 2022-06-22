import Data from './Data'

export type LimitDataType = 'forbid' | 'allow'


export interface LimitDataInitOption {
  type?: LimitDataType,
  list?: any[]
}

// 限制数据格式
// 需要保证类实例传递到initdata中依然能生成一个LimitData实例，保证数据的一致性
class LimitData extends Data {
  type: LimitDataType
  list: any[]
  constructor (initdata: LimitDataInitOption = {}, autoType?: LimitDataType) {
    super()
    this.type = 'forbid'
    this.list = []
    this.setType(initdata.type, autoType)
    this.setList(initdata.list)
  }
  /**
   * 设置类型
   * @param {'forbid' | 'allow'} [type] 类型
   * @param {'forbid' | 'allow'} [autoType = forbid] 自动类型
   */
  setType (type?: LimitDataType, autoType: LimitDataType = 'forbid') {
    this.type = type || autoType
  }
  /**
   * 设置限制列表
   * @param {*[]} [list] 限制的列表数据
   */
  setList (list: any[] = []) {
    this.list = list
  }
  /**
   * 获取限制false不限制
   * @param {*} data 需要判断限制的值
   * @returns {boolean}
   */
  getLimit (data: any): boolean {
    if (this.type == 'forbid') {
      // 存在则为限制
      return this.list.indexOf(data) > -1
    } else if (this.type == 'allow') {
      // 存在则为允许
      return this.list.indexOf(data) < 0
    } else {
      return false
    }
  }
}
export default LimitData
