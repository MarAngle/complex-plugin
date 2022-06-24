import { objectAny } from '../../ts'
import triggerFunc from './../function/triggerFunc'


type fnType = (mod: objectAny, path:string, index: number) => void

/**
 * 加载require contents
 * @param {*} contents
 * @param {function} fn
 */
function loadContents(contents: any, fn: fnType) {
  const contentList = contents.keys()
  contentList.forEach((path: string, index: number) => {
    triggerFunc(fn, contents(path), path, index)
  })
}

export default loadContents
