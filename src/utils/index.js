// 工具集合

const searchToObj = (search) => {
  const result = {}
  if (Object.prototype.toString.call(search) === "[object string]") {
    const arr = search.slice(1).split('&')
    arr.forEach(item => {
      const kv = item.split('=');
      const [k, v] = kv
      result[k] = kv[v]
    })
  }
  return result
}
export default {
  searchToObj
}