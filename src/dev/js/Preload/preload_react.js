import {Component, PropTypes} from 'react'

import sortImgPath from "./resolve"
import Preload from "./preload"


PreloadReact.propTypes = {
  data: PropTypes.object.isRequired,
  loader: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  percentage: PropTypes.func,
  prefixUrl: PropTypes.string
}


export default class PreloadReact extends Component {
  constructor(props){
    super(props)
    this.state = {
      ready: false
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (
      ( nextProps.data != null 
        && nextProps.data != this.props.data ) 
      || nextState.ready 
    ){
        return true
    } else {
        return false
    }
  }

  componentDidUpdate(){
    const {data, prefixUrl, percentage = null} = this.props
    const {ready} = this.ready
    if ( data.length > 0 && !ready){
      let img = sortImgPath( data, prefixUrl)
      new Preload(img, this.setState({ready: true}), null, percentage )
    }
  }

  render(){
    const {ready} = this.state
    const {children, loader} = this.props
    return (ready && children ? children : loader)
  }
}
