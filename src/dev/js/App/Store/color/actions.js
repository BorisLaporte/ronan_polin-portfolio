export const SET_COLOR = 'SET_COLOR'

export const BLACK = 'black'
export const WHITE = 'white'

export function setColor(color) {
  return {
    type: SET_COLOR,
    color: color
  }
}