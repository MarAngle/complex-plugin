import { OBNAME } from './config'
import defineProperty from '../../object/defineProperty'
import buildReactive from './buildReactive'
import Dep from './Dep'
import observe from '../observe'
import { objectAny } from '../../../ts'


/**
 * Define a property.
 */
 function def (obj: objectAny, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
const arrayProto: any = Array.prototype;
const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator (this: Observer) {
    const args = []
    let len = arguments.length;
    while (len--) {
      // eslint-disable-next-line prefer-rest-params
      args[ len ] = arguments[ len ]
    }

    const result = original.apply(this, args);
    const ob = this[OBNAME];
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  })
})

function copyAugment (target: any[], src: any, keys: any) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

class Observer {
  dep: Dep
  [OBNAME]: any
  constructor(value: objectAny) {
    // 每个Observer实例上都存在dep
    this.dep = new Dep()
    defineProperty(value, OBNAME, {
      value: this,
      enumerable: false,
      writable: true
    })
    if (Array.isArray(value)) {
      copyAugment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(items: any[]) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
  /**
   * 遍历
   * @param {*} value 需要遍历的值
   */
  walk(value: objectAny) {
    for (const k in value) {
      buildReactive(value, k)
    }
  }
}

export default Observer
