export const WILL_PUSH = 'WILL_PUSH'
export const DID_PUSH = 'DID_PUSH'
export const SETUP = 'SETUP'

function willPush(route, kind, comingFrom, direction) {
  return {
    type: WILL_PUSH,
    isRouting: true,
    nextRoute: route,
    nextRouteKind: kind,
    comingFrom: comingFrom,
    direction: direction
  }
}

function setup(route, kind, direction) {
  return {
    type: SETUP,
    isRouting: false,
    nextRoute: route,
    nextRouteKind: kind,
    route: route,
    routeKind: kind,
    comingFrom: kind,
    direction: direction
  }
}

function didPush() {
  return {
    type: DID_PUSH,
    isRouting: false
  }
}

export function itWillPush(route, comingFrom, direction = 1){
  return function (dispatch){
    const reg = {
      home: /^\/$/,
      about: /^\/about$/,
      projects: /^\/projects\/[a-zA-Z0-9]*\/?$/,
      detail: /detail$/
    }
    let kind = null
    if ( reg.home.test(route) ){
      kind = "home"
    } else if ( reg.about.test(route) ){
      kind = "about"
    } else if ( reg.detail.test(route) ){
      kind = "detail"
    } else if ( reg.projects.test(route) ){
      kind = "projects"
    }
    return dispatch(willPush(route, kind, comingFrom, direction))
  }
}

export function setupRoutes(route){
  return function (dispatch){
    const reg = {
      home: /^\/$/,
      about: /^\/about$/,
      projects: /^\/projects\/[a-zA-Z0-9]*\/?$/,
      detail: /detail$/
    }
    let kind = null
    if ( reg.home.test(route) ){
      kind = "home"
    } else if ( reg.about.test(route) ){
      kind = "about"
    } else if ( reg.detail.test(route) ){
      kind = "detail"
    } else if ( reg.projects.test(route) ){
      kind = "projects"
    }
    return dispatch(setup(route, kind, -1))
  }
}