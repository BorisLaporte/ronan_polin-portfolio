import {SETUP_TIME} from './actions'

function projectAnimationReducer(state = {
  timers: {}
}, action) {
  switch (action.type) {
    case SETUP_TIME:
      return Object.assign({}, state, {
        timers: action.timers
      })
    default:
      return state
  }
}

export default projectAnimationReducer