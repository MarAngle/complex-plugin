import { anyFunction } from '../../../ts'

/**
 * @desc 函数节流，就是指连续触发事件但是在 n 秒中只执行一次函数。 节流会稀释函数的执行频率
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版.时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。
 */
function throttle(func: anyFunction, wait: number, type: 1 | 2 = 1) {
  let previous: number, timeout: any
  if (type === 1) {
    previous = 0
  }
  return function(this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    if (type === 1) {
      const now = Date.now()
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = undefined
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

export default throttle
