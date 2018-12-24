import React from 'react'
import PropTypes from 'prop-types'

import './boxer.scss'
// import { movementPositions } from '../../contants'
class Boxer extends React.Component{
  static propTypes = {
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    isMoving: PropTypes.bool.isRequired,
    isJab: PropTypes.bool.isRequired,
    isHook: PropTypes.bool.isRequired,
  }

  render(){
    const backgroundPosition = this.props.isMoving ?
      '-580px 0' : this.props.isJab ?
        '-290px 0' : this.props.isHook ?
          '-580px -570px' : ''
    return(
      <div
        className={`boxer ${this.props.id}`}
        style={{
          left: this.props.position,
          backgroundPosition,
        }} />
    )
  }
}
export default Boxer
