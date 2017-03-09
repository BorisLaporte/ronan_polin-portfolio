import {WILL_PUSH, DID_PUSH} from './actions'

function navigationReducer(state = {
  isRouting: false,
  nextRoute: null,
  route: '/'
}, action) {
  switch (action.type) {
    case WILL_PUSH:
      return Object.assign({}, state, {
        isRouting: true,
        nextRoute: action.nextRoute
      })
    case DID_PUSH:
      return Object.assign({}, state, {
        isRouting: false,
        route: state.nextRoute
      })
    default:
      return state
  }
}

export default navigationReducer