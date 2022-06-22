
import runText from '../../main'
import getProp from '../../../data/object/getProp'
import setProp from '../../../data/object/setProp'

runText(function({ checkSame, showError }) {
  let data = {
    user: {
      name: 'name'
    }
  }
  checkSame(getProp(data, 'user.name'), 'name', 'getProp失败')
  setProp(data, 'user.id', 'id')
  if (data.user.id !== 'id') {
    showError('setProp失败')
  }
}, 'object')
