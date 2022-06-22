import isPromise from '../type/isPromise'

/**
 * Promise.allFinished
 * @param {Promise[]} list Promise列表
 * @returns {Promise}
 */
function promiseAllFinished(list) {
  return new Promise((resolve) => {
    let remainder
    let resList = []
    /**
     * next
     * @param {number} remainder
     * @param {*} resolve
     * @param {*[]} resList
     * @param {number} index
     * @param {*} res
     */
    function next(index, res) {
      resList[index] = res
      remainder--
      if (remainder == 0) {
        resolve(resList)
      }
    }
    if (list && list.length > 0) {
      let size = list.length
      remainder = size
      for (let n = 0; n < size; n++) {
        let item = list[n]
        if (isPromise(item)) {
          item.then(res => {
            next(n, { status: 'success', data: res })
          }, err => {
            next(n, { status: 'fail', data: err })
          })
        } else {
          next(n, { status: 'fail', data: undefined })
        }
      }
    } else {
      resolve(resList)
    }
  })
}

export default promiseAllFinished
