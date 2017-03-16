import {WILL_PUSH, DID_PUSH, SETUP} from './actions'

function navigationReducer(state = {
  isRouting: false,
  nextRoute: null,
  nextRouteKind: null,
  route: '/',
  routeKind: null,
  comingFrom: null,
  direction: null
}, action) {
  switch (action.type) {
    case WILL_PUSH:
      return Object.assign({}, state, {
        isRouting: true,
        nextRoute: action.nextRoute,
        nextRouteKind: action.nextRouteKind,
        comingFrom: action.comingFrom,
        direction: action.direction
      })
    case DID_PUSH:
      return Object.assign({}, state, {
        isRouting: false,
        route: state.nextRoute,
        routeKind: state.nextRouteKind,
      })
    case SETUP:
      return Object.assign({}, state, {
        isRouting: false,
        nextRoute: action.nextRoute,
        nextRouteKind: action.nextRouteKind,
        route: action.route,
        routeKind: action.routeKind,
        comingFrom: action.routeKind,
        direction: action.direction
      })
    default:
      return state
  }
}

export default navigationReducer