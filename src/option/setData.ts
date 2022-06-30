import { objectAny } from "../../ts"

const setData = {
  set: function(target: objectAny, prop: string, data: any) {
    target[prop] = data
  }
}

export default setData
