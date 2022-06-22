import runText from '../../main'
import updateData from './../../../data/object/updateData'
import deepClone from './../../../data/object/deepClone'
import mergeData from '../../../data/object/mergeData'

runText(function({ checkSame }) {
  // 拷贝相关
  let targetdata = {
    name: 'target',
    data: {
      list: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        }
      ]
    }
  }
  let origindata = {
    name: 'origin',
    data: {
      list: [
        {
          id: 1,
          name: '11'
        },
        {
          id: 3,
          name: '3'
        }
      ]
    }
  }
  updateData(targetdata, origindata)
  checkSame(targetdata, {
    name: 'origin',
    data: {
      list: [
        {
          id: 1,
          name: '11'
        },
        {
          id: 3,
          name: '3'
        }
      ]
    }
    }, 'UpdateData未成功')
  // 拷贝相关
  let targetdata2 = {
    name: 'target',
    data: {
      name: 't',
      list: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        }
      ]
    }
  }
  let origindata2 = {
    name: 'origin',
    data: {
      name: 's',
      list: [
        {
          id: 1,
          name: '11'
        },
        {
          id: 3,
          name: '3'
        }
      ]
    }
  }
  updateData(targetdata2, origindata2, {
    limit: {
      list: ['data.name']
    },
    depth: 2
  })
  checkSame(targetdata2, {
    name: 'origin',
    data: {
      name: 't',
      list: [
        {
          id: 1,
          name: '11'
        },
        {
          id: 3,
          name: '3'
        }
      ]
    }
  }, 'UpdateData未成功')
}, 'updateData')

runText(function() {
  // 拷贝相关
  let obj = {
    a: 1,
    b: [1, 2, 3],
    c: {
      h: 20
    },
    d: () => {}
  }
  obj.b.push(obj.c)
  obj.c.j = obj.b
  deepClone(obj, true)
  deepClone(obj, {})
}, 'deepClone深拷贝的循环引用报错')

runText(function({ checkSame }) {
  // 拷贝相关
  let data = {
    name: 'name',
    num: 1
  }
  let list = [
    {
      id: 'id',
      num: 2
    },
    {
      index: 'index',
      num: 3
    }
  ]
  let newdata = mergeData(data, ...list)
  checkSame(newdata, {
    name: 'name',
    num: 3,
    id: 'id',
    index: 'index'
  }, 'mergeData合并数组错误')
}, 'mergeData')
