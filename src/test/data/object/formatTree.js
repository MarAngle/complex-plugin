import runText from '../../main';
import formatTree from './../../../data/object/formatTree'

runText(function({ checkSame }) {
  // formatTree相关
  const list = [
    {
      pid: 3,
      id: 6,
      name: '3-6'
    },
    {
      pid: 0,
      id: 2,
      name: '2',
      children: [
        {
          pid: 2,
          id: 100,
          name: '2-100'
        }
      ]
    },
    {
      pid: 0,
      id: 1,
      name: '1'
    },
    {
      pid: 2,
      id: 3,
      name: '2-3'
    },
    {
      pid: 1,
      id: 4,
      name: '1-4'
    },
    {
      pid: 2,
      id: 5,
      name: '2-5'
    }
  ]
  let treeList = formatTree(list, {
    parentId: 'pid'
  })
  checkSame(treeList, [
    {
      pid: 0,
      id: 2,
      name: '2',
      children: [
        {
          children: [
            {
              pid: 3,
              id: 6,
              name: '3-6'
            }
          ],
          pid: 2,
          id: 3,
          name: '2-3'
        },
        {
          pid: 2,
          id: 5,
          name: '2-5'
        }
      ]
    },
    {
      pid: 0,
      id: 1,
      name: '1',
      children: [
        {
          pid: 1,
          id: 4,
          name: '1-4'
        }
      ]
    }
  ], 'formatTree未成功')
  let treeList2 = formatTree(list, {
    parentId: 'pid',
    children: {
      merge: true
    }
  })
  checkSame(treeList2, [
    {
      pid: 0,
      id: 2,
      name: '2',
      children: [
        {
          pid: 2,
          id: 100,
          name: '2-100'
        },
        {
          children: [
            {
              pid: 3,
              id: 6,
              name: '3-6'
            }
          ],
          pid: 2,
          id: 3,
          name: '2-3'
        },
        {
          pid: 2,
          id: 5,
          name: '2-5'
        }
      ]
    },
    {
      pid: 0,
      id: 1,
      name: '1',
      children: [
        {
          pid: 1,
          id: 4,
          name: '1-4'
        }
      ]
    }
  ], 'formatTree2未成功')
  let treeList3 = formatTree(list, {
    parentId: 'pid',
    children: {
      merge: true,
      build: true
    }
  })
  checkSame(treeList3, [
    {
      pid: 0,
      id: 2,
      name: '2',
      children: [
        {
          pid: 2,
          id: 100,
          name: '2-100'
        },
        {
          children: [
            {
              pid: 3,
              id: 6,
              name: '3-6',
              children: []
            }
          ],
          pid: 2,
          id: 3,
          name: '2-3'
        },
        {
          pid: 2,
          id: 5,
          name: '2-5',
          children: []
        }
      ]
    },
    {
      pid: 0,
      id: 1,
      name: '1',
      children: [
        {
          pid: 1,
          id: 4,
          name: '1-4',
          children: []
        }
      ]
    }
  ], 'formatTree3未成功')
}, 'formatTree');
