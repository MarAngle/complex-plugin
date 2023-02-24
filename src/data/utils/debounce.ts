import { anyFunction } from '../../../ts'

/**
* @desc 函数防抖，触发事件N秒后执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
* @param func 函数
* @param wait 延迟执行毫秒数
* @param immediate true 表立即执行，false 表非立即执行.非立即执行的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。立即执行的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
*/
function debounce(func: anyFunction, wait: number, immediate?: boolean) {
  let timeout: any
  return function(this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = undefined
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

export default debounce
