import PropTypes from 'prop-types'
import React from 'react'

import './boxer.scss'
import { controls as C } from '../../config'
import { movementPositions, movementTypes } from '../../constants'

class Boxer extends React.Component{
  static propTypes = {
    allowAction: PropTypes.bool,
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
    checkDamage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allowAction: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      image: movementPositions.initialPosition
    }
  }

  componentDidMount() {
    const { id } = this.props
    const codes = C[id]
    window.addEventListener('keydown', ev => {
      //eslint-disable-next-line no-console
      console.log(ev.keyCode)
      switch(ev.keyCode) {
        case codes.left:
          this.move(true)
          break
        case codes.right:
          this.move()
          break
        case codes[movementTypes.jab]:
          this.hit(id, movementTypes.jab)
          break
        case codes[movementTypes.hook]:
          this.hit(id, movementTypes.hook)
          break
        default:
          return
      }
    })
  }

  _animateMoving(movingType) {
    if(!this.props.allowAction) return
    this.setState({ image: movementPositions[movingType] })
    setTimeout(() => {
      this.setState({ image: movementPositions.initialPosition })
    }, 100)
  }

  move(toLeft) {
    const { id } = this.props
    this._animateMoving(movementTypes.moving)
    toLeft ? this.props.moveLeft(id) : this.props.moveRight(id)
  }

  hit(id, hitType) {
    if(!this.props.allowAction) return
    this._animateMoving(hitType)
    this.props.checkDamage(id, hitType)
  }

  render(){
    return(
      <div
        className={`boxer ${this.props.id}`}
        style={{
          left: this.props.position,
          ...this.state.image,
        }} />
    )
  }
}

export default Boxer
