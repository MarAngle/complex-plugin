
/**
 * encodeURIComponent字符转换
 * @param {string} str
 * @returns {string}
 */
function localEncodeURIComponent(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16)
  })
}

export default localEncodeURIComponent
