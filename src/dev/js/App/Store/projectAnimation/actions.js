export const SETUP_TIME = 'SETUP_TIME'

function setupTime(timers) {
  return {
    type: SETUP_TIME,
    timers: timers
  }
}

export function setupTimers(){
  return function (dispatch){
    const order = [
      "backBlur",
      "hoverColor",
      "content",
      "square"
    ]

    let timers = {
      backBlur: {
        time: 0.5
      },
      hoverColor: {
        time: 1.2
      },
      square: {
        time: 0.3
      },
      content: {
        time: 0.8
      }
    }

    const shortner = 0.2
    let allEnteringTime = 0
    let allLeavingTime = 0
    for(let i = 0; i < order.length; i++){
      allLeavingTime = allEnteringTime += timers[order[i]].time
      let leavingDelay = 0
      let updatingDelay = 0.1
      let enteringDelay = 0.8
      if ( i < order.length - 1 ){
        for(let z = i + 1; z < order.length; z++){
          leavingDelay += timers[order[z]].time - shortner
        }
      }
      if ( i > 0 ){
        for(let x = i - 1; x >= 0; x--){
          enteringDelay += timers[order[x]].time - shortner
          updatingDelay += timers[order[x]].time - shortner
        }
      }
      timers[order[i]].leavingDelay = leavingDelay
      timers[order[i]].enteringDelay = enteringDelay
      timers[order[i]].updatingDelay = updatingDelay
      if (i == 0){
        allEnteringTime += enteringDelay
      } else if ( i == order.length - 1 ){
        allLeavingTime += leavingDelay
      }
    }
    timers.allEnteringTime = allEnteringTime
    timers.allLeavingTime = allLeavingTime

    return dispatch(setupTime(timers))
  }
}