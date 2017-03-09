import React, {Component, PropTypes} from 'react'
import $ from 'jquery'
import {TweenLite, TimelineLite, Power2} from 'gsap'
import sortImgPath from "./resolve"
import Preload from "./preload"


export default class PreloadReact extends Component {
  constructor(props){
    super(props)
    this.state = {
      ready: false,
      preloading: false,
      status: 0,
      tl: null
    }

    this.percentage = this.percentage.bind(this)
    this.itsReady = this.itsReady.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (
      ( nextProps.data != null 
        && nextProps.data != this.props.data ) 
      || nextState.ready 
      || ( nextState.status != this.state.status )
    ){
        return true
    } else {
        return false
    }
  }

  componentWillMount() {
    this.setState({tl: new TimelineLite()})
  }

  componentDidMount() {
    const {tl} = this.state
    tl.from(this.container, 1,
    {
      opacity: 0,
      ease: Power2.easeOut
    })
  }


  componentDidUpdate(prevProps, prevState){
    if ( !this.state.preloading ){
      this.start()
    } 
  }

  start(){
    const {data, prefixUrl = ""} = this.props
    const {ready} = this.state
    if ( !$.isEmptyObject(data) && !ready){
      let img = sortImgPath( data, prefixUrl)
      if ( img.length > 0 ){
        this.setState({preloading: true})
        new Preload(img, this.itsReady, null, this.percentage )
      }
    }
  }

  itsReady(){
    this.leavingAnim(() => {
      const {onSuccess} = this.props
      this.setState({ready: true, preloading: false})
      if (typeof onSuccess === "function"){
        onSuccess()
      }
    })
  }

  leavingAnim(callback){
    callback()
    // const {tl} = this.state
    // tl.to(this.container, 1,
    // {
    //   opacity:0,
    //   ease: Power2.easeOut,
    //   onComplete: callback
    // })
  }

  percentage(status){
    const new_status = Math.floor(status * 100)
    this.setState({status: new_status})
  }

  render(){
    const {ready, status} = this.state
    const {children} = this.props
    return (
      ready && children ? 
      children 
      : 
      <div className="sub-wrapper center shadowy" ref={c => this.container = c}>{status}%</div>
    )
  }
}

PreloadReact.propTypes = {
  data: PropTypes.object.isRequired,
  loader: PropTypes.element,
  children: PropTypes.element.isRequired,
  percentage: PropTypes.func,
  onSuccess: PropTypes.func,
  prefixUrl: PropTypes.string
}