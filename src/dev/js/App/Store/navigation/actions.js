export const WILL_PUSH = 'WILL_PUSH'
export const DID_PUSH = 'HAS_PUSH'

function willPush(route) {
  return {
    type: WILL_PUSH,
    isRouting: true,
    nextRoute: route
  }
}

function didPush() {
  return {
    type: DID_PUSH,
    isRouting: false
  }
}

export function itWillPush(route){
  return function (dispatch){
    return dispatch(willPush(route))
  }
}