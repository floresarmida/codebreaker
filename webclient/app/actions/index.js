var uuid = require('uuid4')

export const addZip = (zip) => {
  return {
    type: 'ADD_ZIP',
    id: uuid(),
    zip
  }
}

export const addLink = (data) => {
  return {
    type: 'ADD_LINK',
    id: uuid(),
    data
  }
}
