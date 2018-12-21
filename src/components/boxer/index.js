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
  }

  render(){
    const xPosition = this.props.isMoving ?
      '-580px' : this.props.isJab ?
        '-290px' : ''
    return(
      <div
        className={`boxer ${this.props.id}`}
        style={{
          left: this.props.position,
          backgroundPositionX: xPosition,
        }} />
    )
  }
}
export default Boxer
