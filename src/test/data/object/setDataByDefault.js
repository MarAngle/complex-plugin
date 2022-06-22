
import runText from '../../main'
import setDataByDefault from '../../../data/object/setDataByDefault'

runText(function({ checkSame }) {
  let targetData = {
    name: 'name',
    parent: {
      pid: 'pid'
    }
  }
  let defaultData = {
    id: 'did',
    name: 'dname',
    parent: {
      pid: 'dpid',
      pname: 'dpname'
    }
  }
  checkSame(setDataByDefault(targetData, defaultData), {
    id: 'did',
    name: 'name',
    parent: {
      pid: 'pid',
      pname: 'dpname'
    }
  }, 'setDataByDefault默认值设置错误！')
}, 'setDataByDefault')

runText(function({ checkSame }) {
  let targetData = {
    name: 'name',
    list: [
      {
        id: 'inid'
      }
    ]
  }
  let defaultData = {
    id: 'did',
    name: 'dname',
    list: [
      {
        id: 1,
        list: [1, 2, 3]
      },
      {
        id: 2,
        list: [
          {
            id: 3
          }
        ]
      }
    ]
  }
  checkSame(setDataByDefault(targetData, defaultData), {
    id: 'did',
    name: 'name',
    list: [
      {
        id: 'inid',
        list: [1, 2, 3]
      },
      {
        id: 2,
        list: [
          {
            id: 3
          }
        ]
      }
    ]
  }, 'setDataByDefault默认值设置错误！')
}, 'setDataByDefault')
