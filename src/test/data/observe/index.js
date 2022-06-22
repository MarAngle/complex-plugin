
import runText from '../../main'
import observe from '../../../data/observe/observe'
import Watcher from '../../../data/observe/Watcher'

runText(function({ checkSame, showError }) {
  let data = {
    id: 'id',
    user: {
      id: 'uid',
      name: 'uname',
      parent: {
        id: 'pid',
        name: 'pname'
      }
    }
  }
  observe(data)
  let watchUserIdTemp
  let watchUserId = new Watcher(data, 'user.id', (val, oldVal) => {
    watchUserIdTemp = {
      val,
      oldVal
    }
  })
  data.user.id = 'newid'
  setTimeout(() => {
    checkSame(watchUserIdTemp, {
      val: 'newid',
      oldVal: 'uid'
    }, 'observe的watch失败')
    watchUserId.stop()
  }, 0)

  let watchUserParentTemp = {}
  let watchUserParent = new Watcher(data.user, 'parent', {
    deep: true,
    handler: (val, oldVal) => {
      if (watchUserParentTemp) {
        watchUserParentTemp.val = val
      } else {
        showError('stop后触发了watch！')
      }
    }
  })
  data.user.parent.id = 'newpid'
  setTimeout(() => {
    checkSame(watchUserParentTemp, {
      val: {
        id: 'newpid',
        name: 'pname'
      }
    }, 'observe的deep watch失败')
    watchUserParentTemp = null
    watchUserParent.stop()
    data.user.parent.id = 'puis+++'
  }, 0)
}, 'observe')
