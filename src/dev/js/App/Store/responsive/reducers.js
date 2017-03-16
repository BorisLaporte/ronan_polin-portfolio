import { RESIZING, LANDSCAPE } from './actions'

export default function responsiveReducer(state = {
  width: 0,
  height: 0,
  orientation: LANDSCAPE,
  thumbnailSize: 0,
  squareSize: 0
}, action) {
  switch (action.type) {
    case RESIZING:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
        orientation: action.orientation,
        thumbnailSize: action.thumbnailSize,
        squareSize: action.squareSize
      })
    default:
      return state
  }
}