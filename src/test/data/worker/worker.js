import runText from '../../main';
import setWorker from '../../../data/worker/setWorker';

runText(function({ showError }) {
  setWorker({
    func: function(list) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ a: 1, list: list })
        }, 5000)
      })
    },
    args: [[1, 23]],
    log: true
  }).then(
    res => {
      // console.log(res)
      if (res.a != 1) {
        showError('worker数据错误')
      }
     },
    err => { console.log(err) }
  )

  setWorker({
    func: function(list) {
      return 123
    },
    sync: true,
    args: [[1, 23]],
    log: true
  }).then(
    res => {
      // console.log(res)
      if (res != 123) {
        showError('worker数据错误')
      }
    },
    err => { console.log(err) }
  )
});
