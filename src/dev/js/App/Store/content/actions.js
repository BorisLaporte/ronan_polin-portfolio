export const RECEIVE_CONTENT = 'RECEIVE_CONTENT'

function receiveContent(json) {
  return {
    type: RECEIVE_CONTENT,
    data: json
  }
}

export function fillContent(json) {
  return function (dispatch) {
    return dispatch(receiveContent(json))
  }
}