import { throttle } from "complex-utils"

export type lifeItemType = {
  once?: boolean
  data: () => void
}

let lifeId = 0

class LifeData {
  data: Record<number, lifeItemType>
  constructor() {
    this.data = {}
  }
  push(item: lifeItemType) {
    lifeId++
    this.data[lifeId] = item
    return lifeId
  }
  remove(id: number) {
    delete this.data[id]
  }
  trigger() {
    for (const id in this.data) {
      this.data[id].data()
      if (this.data[id].once) {
        this.remove(id as unknown as number)
      }
    }
  }
}


const life: Record<string, LifeData> = {
  $all: new LifeData(),
  body: new LifeData()
}

type dataType = {
  width: number,
  height: number
}

export interface modType {
  type?: string
  width?: number
  height?: number
  change?: (...args:any[]) => any,
  recount?: false | ((extraData: dataType) => any)
}

const mod: {
  [prop: string]: modType
} = {}

const layout = {
  type: 'default',
  offset: 200,
  life: life,
  data: {
    body: {
      width: 0,
      height: 0
    },
    main: {
      width: 0,
      height: 0
    },
    extra: {
      width: 0,
      height: 0
    }
  },
  mod: mod,
  setType(type: string) {
    this.type = type
  },
  // 添加模块
  installMod(name: string, pageMod: modType, unRecount?: boolean) {
    if (pageMod) {
      this.mod[name] = pageMod
      if (pageMod.recount === undefined && (pageMod.width || pageMod.height)) {
        pageMod.recount = function(extraData) {
          if (this.width) {
            extraData.width += this.width
          }
          if (this.height) {
            extraData.height += this.height
          }
        }
      }
    }
    this.life[name] = new LifeData()
    if (!unRecount) {
      this.triggerRecount()
      this.triggerLife(name)
    }
  },
  // 触发模块变更
  triggerChange(name: string, ...args: any[]) {
    const pageMod = this.mod[name]
    if (pageMod && pageMod.change) {
      pageMod.change(...args)
      this.triggerRecount()
    } else {
      this.triggerRecountMain()
    }
    this.triggerLife(name)
  },
  onLife(name: string, data: lifeItemType) {
    this.life[name].push(data)
  },
  offLife(name: string, id: number) {
    this.life[name].remove(id)
  },
  triggerLife(name?: string) {
    if (name) {
      this.life[name].trigger()
    }
    this.life.$all.trigger()
  },
  // 触发重计算
  triggerRecount() {
    this.triggerRecountExtra()
    this.triggerRecountMain()
  },
  // 重计算额外占用部分
  triggerRecountExtra() {
    this.data.extra.width = 0
    this.data.extra.height = 0
    for (const name in this.mod) {
      const pageMod = this.mod[name]
      if (pageMod && pageMod.recount) {
        pageMod.recount(this.data.extra)
      }
    }
  },
  // 重计算可用部分
  triggerRecountMain() {
    this.data.main.width = this.data.body.width - this.data.extra.width
    this.data.main.height = this.data.body.height - this.data.extra.height
  },
  // 设置body数据
  recountBody(recountExtra?: boolean) {
    this.data.body.width = document.documentElement.clientWidth
    this.data.body.height = document.documentElement.clientHeight
    if (recountExtra) {
      this.triggerRecount()
    } else {
      this.triggerRecountMain()
    }
    this.triggerLife('body')
  },
  // 加载body
  initBody() {
    this.recountBody(true)
    window.onresize = throttle(() => {
      this.recountBody()
    }, this.offset, 2)
  }
}

export type layoutType = typeof layout

export const initLayout = function(func?: boolean | ((layoutData: layoutType) => void)) {
  if (func && func !== true) {
    func(layout)
  }
  layout.initBody()
}

export default layout
