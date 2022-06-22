import { getEnv } from './data/environment/index'

function loadContents(contents: any, fn: any) {
  let contentList = contents.keys()
  contentList.forEach((path: any, index: number) => {
    fn(contents(path), path, index)
  })
}
function buildLoadContent(contents: any, countUrl: any) {
  // -----
  let importurl = ''
  let exportlist = ''
  let maindata = {}
  function LoadProp (data: any, contents: any) {
    loadContents(contents, function(item: any, path: any) {
      let name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
      if (!data[name]) {
        data[name] = item.default
      } else {
        console.error('auto mod load is repeat')
      }
    })
  }
  function countProp (data: any, url: any) {
    if (importurl) {
      importurl += `
`
  exportlist += `
`
    }
    for (let n in data) {
      exportlist = exportlist + `
  ${n},`
      importurl = importurl + `
import ${n} from './${url}/${n}'`
    }
  }
  LoadProp(maindata, contents)
  countProp(maindata, countUrl)

  console.log(importurl)
  console.log(exportlist)
  // -----
}
const utilsContent = (require as any).context('./data/utils', false, /\.js$/)
if (getEnv('real') == 'development') {
  buildLoadContent(utilsContent, 'data/utils')
}
