import {RECEIVE_CONTENT} from './actions'

function contentReducer(state = {
  items: {}
}, action) {
  switch (action.type) {
    case RECEIVE_CONTENT:
      return Object.assign({}, state, {
        items: action.data
      })
    default:
      return state
  }
}

export default contentReducer