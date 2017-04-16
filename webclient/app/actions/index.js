import fetch from 'isomorphic-fetch'
var uuid = require('uuid4') //  unique indexes for concurrency
import {reset} from 'redux-form'  //  Action to reset controlled forms

//  Sample summary query:
//  http://138.68.249.21/v1/summary?url=http://ogp.me/
const api = {
  protocol: 'http://',
  // DigitalOcean server I've dedicated to  this assignment, not setting domain.
  host: '138.68.21.112',
  version: 'v1',
  endpoint: {
    codebreaker: 'codebreaker'
  }
}

export const addCaesarSolution = (data, source) => {
  return {
    type: 'ADD_CAESAR_SOLUTION',
    id: uuid(),
    data,
    source
  }
}

export const openModal = (data) => {  //  THUNK
  return {
    type: 'OPEN_MODAL',
    data
  }
}
export const closeModal = (data) => {  //  THUNK
  return {
    type: 'CLOSE_MODAL',
    data
  }
}

export const decodeCaesar = (data) => {  //  THUNK
  return function (dispatch) {
    let submission = data.composer

    //  Creating query w/ string literals.
    let target = `${api.protocol}${api.host}/${api.version}/${api.endpoint.codebreaker}`
    let query = `?caesar=${submission}`
    let request = target + query

    console.log('GET:', request)
    fetch(request, {
      method: 'get'
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log('DECODED:', data)
      let dataArray = Object.keys(data).map(key => data[key])
      dispatch(addCaesarSolution(dataArray, submission))
    }).catch(err => {
      dispatch(openModal(err))
      console.error(err)
    })
    dispatch(reset('composer')) //  Form reset
    // what you return here gets returned by the dispatch function that used this action creator
    return null
  }
}
