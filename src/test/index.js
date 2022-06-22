import { getEnv } from './../data/environment/index'

function loadContents(contents, fn) {
  let contentList = contents.keys()
  contentList.forEach((path, index) => {
    fn(contents(path), path, index)
  })
}

const contents = require.context('./data', true, /\.js$/)
if (getEnv('real') == 'development') {
  loadContents(contents, function(item) {})
}
