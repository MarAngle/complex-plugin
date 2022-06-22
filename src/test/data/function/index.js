import runText from '../../main';
import runFunction from './../../../data/function/runFunction'
import triggerPromise from './../../../data/function/triggerPromise'

runText(function() {
  let baseFunction = function(name) {
    return name
  }
  let promiseFunction = function(name) {
    return new Promise((resolve, reject) => {
      resolve({ name: name })
    })
  }

  triggerPromise({
    func: function() {},
    args: [],
    error: (code) => {
      if (code != 'notPromise') {
        throw new Error('triggerPromise错误')
      }
    }
  })
  triggerPromise({
    func: promiseFunction,
    args: ['promise'],
    error: (code) => {
      throw new Error('triggerPromise错误')
    },
    start: () => {
    },
    success: (res) => {
      if (res.name != 'promise') {
        throw new Error('triggerPromise错误')
      }
    },
    fail: (res) => {
      throw new Error('triggerPromise错误', res)
    }
  })

  runFunction(baseFunction, ['base'], function(res) {
    if (res.data != 'base') {
      throw new Error('runFunction错误', res)
    }
  })
  runFunction(promiseFunction, ['promise'], function(res) {
    if (res.data.name != 'promise') {
      throw new Error('runFunction错误', res)
    }
  })
}, 'function相关模块错误');
