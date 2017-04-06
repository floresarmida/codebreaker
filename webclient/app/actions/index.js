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

export const addLinkSuccess = (data) => {  //  THUNK
  return {
    type: 'ADD_LINK_SUCCESS',
    id: uuid(),
    data
  }
}

export const addLink = (data) => {  //  THUNK
  return function (dispatch) {
    // here starts the code that actually gets executed when the
    //  addTodo action creator is dispatched

    // first of all, let's do the optimistic UI update - we need to
    // dispatch the old synchronous action object, using the renamed
    // action creator
    // dispatch(addLinkAction(data)) //Loading

    // now that the Store has been notified of the new todo item, we
    // should also notify our server - we'll use here ES6 fetch
    // function to post the data
    let target = `${api.protocol}${api.host}/${api.version}/${api.endpoint.summary}`
    let query = `?url=${data.url}`
    let request = target + query
    console.log(request)
    fetch(request, {
      method: 'get'
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      dispatch(addLinkSuccess(data))
      // you should probably get a real id for your new todo item here,
// and update your store, but we'll leave that to you
    }).catch(err => {
      // Error: handle it the way you like, undoing the optimistic update,
      //  showing a "out of sync" message, etc.
      console.error(err)
    })
    // what you return here gets returned by the dispatch function that
    // used this action creator
    return null
  }
}
