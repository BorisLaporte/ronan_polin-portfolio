import {SET_COLOR, BLACK} from './actions'

function colorReducer(state = {
  color: BLACK
}, action) {
  switch (action.type) {
    case SET_COLOR:
      return Object.assign({}, state, {
        color: action.color
      })
    default:
      return state
  }
}

export default colorReducer