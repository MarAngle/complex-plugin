import exportSelfMsg from './../utils/exportSelfMsg'

interface descriptorType<T> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: T;
  get?: () => T;
  set?: (value: T) => void;
}

/**
 * 设置属性描述
 * @param {object} obj 对象
 * @param {string} prop 属性
 * @param {object} descriptor 属性描述
 * @param {boolean} [descriptor.configurable] 可配置描述
 * @param {boolean} [descriptor.enumerable] 可遍历描述
 * @param {function} [descriptor.get] getter
 * @param {function} [descriptor.set] setter
 * @param {*} [descriptor.value] 值
 * @param {boolean} [descriptor.writable] 可读写描述
 * @returns 操作成功
 */
function defineProperty(obj: unknown, prop: string, descriptor: descriptorType<any>) {
  if (typeof obj != 'object') {
    exportSelfMsg('defineProperty中obj需要对象格式')
    return false
  }
  if (typeof descriptor != 'object') {
    exportSelfMsg('defineProperty中descriptor需要传递descriptor对象')
    return false
  }
  if (descriptor.configurable === undefined) {
    descriptor.configurable = true
  }
  if (descriptor.enumerable === undefined) {
    descriptor.enumerable = true
  }
  Object.defineProperty(obj, prop, descriptor)
  return true
}

export default defineProperty
