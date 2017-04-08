import fetch from 'isomorphic-fetch'
var uuid = require('uuid4')

//  Sample summary query:
//  http://138.68.249.21/v1/summary?url=http://ogp.me/
const api = {
  protocol: 'http://',
  host: '138.68.249.21',  // Name: info-ocean
  version: 'v1',
  endpoint: {
    summary: 'summary'
  }
}

export const addMessage = (data) => {
  return {
    type: 'ADD_MESSAGE',
    id: uuid(),
    data
  }
}
export const addOG = (data) => {  //  THUNK
  console.log('OG data', data)
  return {
    type: 'ADD_OG',
    id: uuid(),
    data
  }
}

export const submitMessage = (data) => {  //  THUNK
  console.log('SUBMIT')
  return function (dispatch) {
    //  TODO: Dispatch a log for this event loading like dispatch(addLinkAction(data))
    let submission = data.composer
    console.log('dispatch submit message', submission)
    //  Normal Text Submission
    if (!submission.startsWith('http')) {  // URL check
      //  TODO: Check for link vs raw text message
      console.log('Non-link (OpenGraph) content submitted. This client has not had raw messaging implemented yet')
    } else {
    //  User submitted a link to OG content
      let target = `${api.protocol}${api.host}/${api.version}/${api.endpoint.summary}`
      let query = `?url=${submission}`
      let request = target + query
      console.log('Request', request)
      fetch(request, {
        method: 'get'
      }).then(response => {
        return response.json()
      }).then(data => {
      //  Assuming we got OG data
        dispatch(addOG(data))
      }).catch(err => {
      //  TODO: Dispatch an error toast
        console.error(err)
      })
    }
    // what you return here gets returned by the dispatch function that used this action creator
    return null
  }
}
