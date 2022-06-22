
/**
 * 文件属性转换
 * @param {'BASE64' | 'FILE' | 'BLOB'} from
 * @param {'BASE64' | 'FILE' | 'BLOB'} to
 * @param {string | File | Blob} data
 * @param {string} [filename]
 * @returns {Promise<string | File | Blob>}
 */
function transformFile(from, to, data, filename) {
  return new Promise((resolve) => {
    if (from == 'BASE64') {
      let arr = data.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      if (to == 'BLOB') {
        resolve({ data: new Blob([u8arr], { type: mime }) })
      } else if (to == 'FILE') {
        console.log('this is never use, func this name')
        resolve({ data: new File([u8arr], '', { type: mime }) })
      }
    } else if (from == 'FILE') {
      if (to == 'BASE64') {
        let reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = function(e) {
          resolve({ data: e.target.result })
        }
      } else if (to == 'BLOB') {
        resolve({ data: new Blob([data], { type: data.type }) })
      }
    } else if (from == 'BLOB') {
      if (to == 'BASE64') {
        let reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = function(e) {
          resolve({ data: e.target.result })
        }
      } else if (to == 'FILE') {
        if (!filename) {
          let suffix = data.type.split('/')[1]
          filename = 'newfile.' + suffix
        }
        resolve({ data: new File([data], filename, { type: data.type }) })
      }
    }
  })
}

export default transformFile
