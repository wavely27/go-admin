// 工具集合

// url请求参数转对象
const searchToObj = (search) => {
  const result = {}
  if (Object.prototype.toString.call(search) === "[object String]") {
    const arr = search.slice(1).split('&')
    arr.forEach(item => {
      const kv = item.split('=');
      const [k, v] = kv
      result[k] = v
    })
  }
  return result
}

// 对象去除undefined 与 null
const objClear = (obj) => {
  const result = {}
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    Object.keys(obj).forEach(key => {
        if (!(obj[key] === undefined || obj[key] === null)) {
          result[key] = obj[key]
        }
      }
    )
  }
  return result
}

export default {
  searchToObj,
  objClear,
}