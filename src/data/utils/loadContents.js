import triggerFunc from './../function/triggerFunc'

/**
 * 加载require contents
 * @param {*} contents
 * @param {function} fn
 */
function loadContents(contents, fn) {
  let contentList = contents.keys()
  contentList.forEach((path, index) => {
    triggerFunc(fn, contents(path), path, index)
  })
}

export default loadContents
