export const RESIZING = 'RESIZING'

export const LANDSCAPE = 'LANDSCAPE'
export const PORTRAIT = 'PORTRAIT'

function resizing(width, height, orientation, thumbnailSize, thumbnailFinalSize) {
  return {
    type: RESIZING,
    width,
    height,
    orientation,
    thumbnailSize,
    thumbnailFinalSize
  }
}


export function getWindowSize(){
	return function (dispatch) {
    const width = window.innerWidth
    const height = window.innerHeight

    let orientation
    if (height <= width){
      orientation = LANDSCAPE
    } else {
      orientation = PORTRAIT
    }

    let thumbnailSize
    let thumbnailFinalSize
    if (width > 1600 ){
      thumbnailSize = 550
      thumbnailFinalSize = 700
    } else if ( width <= 1600 && width > 1400){
      thumbnailSize = 480
      thumbnailFinalSize = 600
    } else if ( width <= 1400 && width > 1200){
      thumbnailSize = 435
      thumbnailFinalSize = 500
    } else if ( width <= 1200 && width > 1000){
      thumbnailSize = 400
      thumbnailFinalSize = 500
    } else if ( width <= 1000){
      thumbnailSize = 330
      thumbnailFinalSize = 500
    }

    dispatch(resizing(width, height, orientation, thumbnailSize, thumbnailFinalSize ))
  }
}