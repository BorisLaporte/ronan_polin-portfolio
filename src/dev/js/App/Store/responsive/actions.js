export const RESIZING = 'RESIZING'

export const LANDSCAPE = 'LANDSCAPE'
export const PORTRAIT = 'PORTRAIT'

function resizing(width, height, orientation, thumbnailSize, squareSize) {
  return {
    type: RESIZING,
    width,
    height,
    orientation,
    thumbnailSize,
    squareSize
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
    if (width > 1400 ){
      thumbnailSize = 550
    } else if ( width <= 1400 && width > 1200){
      thumbnailSize = 480
    } else if ( width <= 1200 && width > 1000){
      thumbnailSize = 435
    } else if ( width <= 1000){
      thumbnailSize = 380
    }

    let squareSize
    if (width > 1400 ){
      squareSize = 1170
    } else if ( width <= 1400 && width > 1200){
      squareSize = 970
    } else if ( width <= 1200 && width > 1000){
      squareSize = 870
    } else if ( width <= 1000 ){
      squareSize = 770
    }

    dispatch(resizing(width, height, orientation, thumbnailSize, squareSize ))
  }
}