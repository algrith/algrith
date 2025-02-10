const errorProcessor = (error) => {
  const message = error?.response?.data?.message || error?.message || error?.toString()
  const data = error?.response?.data
  const errorObject = { status: false, type: '', message, data }
  if (message.toLowerCase().includes('validation')) {
    errorObject.type = 'validation'
    const validationError = data?.data
    if (validationError.length) errorObject.data = { ...flattenObject(extractFieldAndMessage(validationError)) }
  }
  return errorObject
}

const extractFieldAndMessage = (data) => {
  return data.map(field => {
    const fieldObject = {}
    if (field?.param) fieldObject[field.param] = field.msg
    return fieldObject
  })  
}

const flattenObject = (obj) => {
  return Object.assign(
    {},
    ...function _flatten(o) {
      return [].concat(...Object.keys(o)
        .map(k =>
          typeof o[k] === 'object' ?
            _flatten(o[k]) :
            ({ [k]: o[k] })
        )
      );
    }(obj)
  )
}

export { errorProcessor, extractFieldAndMessage, flattenObject }