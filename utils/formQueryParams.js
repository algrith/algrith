const formQueryUsingParams = (params) => {
  let queryString
  if (Object.keys(params).length) {
    queryString = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
  }
  return `?${queryString}`
}

export { formQueryUsingParams };