import React, { Component } from 'react'
import './App.scss'
import Score from './components/score'
import Boxer from './components/boxer'
import { initialPositions as IP } from './contants'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      leftBoxerHealth: 100,
      rightBoxerHealth: 100,
      leftBoxerPosition: IP.leftBoxer,
      rightBoxerPosition: IP.rightBoxer,
      isLeftMoving: false,
      isRightMoving: false,
      isLeftJab: false,
      isRightJab: false,
      isLeftHook: false,
      isRightHook: false,
      winner: null,
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', ev => {
      //eslint-disable-next-line no-console
      console.log(ev.keyCode)
      switch(ev.keyCode) {
        //movements
        case 37:
          this.moveRightBoxer(true)
          break
        case 39:
          this.moveRightBoxer()
          break
        case 65:
          this.moveLeftBoxer(true)
          break
        case 68:
          this.moveLeftBoxer()
          break
        // jabs
        case 38:
          this.rightJab()
          break
        case 87:
          this.leftJab()
          break
        //hooks
        case 83:
          this.leftHook()
          break
        case 40:
          this.rightHook()
          break
        default:
          return
      }
    })
  }

  animateMovement(isRight) {
    const movingBoxer = isRight ? 'isRightMoving' : 'isLeftMoving'
    this.setState({ [movingBoxer]: true })
    setTimeout(() => {
      this.setState({ [movingBoxer]: false })
    }, 100)
  }

  moveRightBoxer(toLeft) {
    if(toLeft) {
      if(this.state.rightBoxerPosition > this.state.leftBoxerPosition) {
        this.animateMovement(true)
        this.setState({ rightBoxerPosition: this.state.rightBoxerPosition - 50 })
      }
    } else if(this.state.rightBoxerPosition < IP.rightBoxer) {
      this.animateMovement(true)
      this.setState({ rightBoxerPosition: this.state.rightBoxerPosition + 50 })
    }
  }

  moveLeftBoxer(toLeft) {
    if(toLeft) {
      if(this.state.leftBoxerPosition > IP.leftBoxer) {
        this.animateMovement()
        this.setState({ leftBoxerPosition: this.state.leftBoxerPosition - 50 })
      }
    } else if(this.state.leftBoxerPosition < this.state.rightBoxerPosition) {
      this.animateMovement()
      this.setState({ leftBoxerPosition: this.state.leftBoxerPosition + 50 })
    }
  }

  rightJab() {
    this.animateJab(true)
    if(this.state.rightBoxerPosition - this.state.leftBoxerPosition <= 50) {
      this.setState({ leftBoxerHealth: this.state.leftBoxerHealth - 10 })
    }
  }

  leftJab() {
    this.animateJab()
    if(this.state.rightBoxerPosition - this.state.leftBoxerPosition <= 50) {
      this.setState({ rightBoxerHealth: this.state.rightBoxerHealth - 10 })
    }
  }

  rightHook() {
    this.animateHook(true)
    if(this.state.rightBoxerPosition - this.state.leftBoxerPosition <= 50) {
      this.setState({ leftBoxerHealth: this.state.leftBoxerHealth - 20 })
    }
  }

  leftHook() {
    this.animateHook()
    if(this.state.rightBoxerPosition - this.state.leftBoxerPosition <= 50) {
      this.setState({ rightBoxerHealth: this.state.rightBoxerHealth - 20 })
    }
  }

  animateJab(isRight) {
    const whoJabs = isRight ? 'isRightJab' : 'isLeftJab'
    this.setState({ [whoJabs]: true })
    setTimeout(() => {
      this.setState({ [whoJabs]: false })
    }, 100)
  }

  animateHook(isRight) {
    const whoHooks = isRight ? 'isRightHook' : 'isLeftHook'
    this.setState({ [whoHooks]: true })
    setTimeout(() => {
      this.setState({ [whoHooks]: false })
    }, 100)
  }

  render(){
    return (
      <div className="wrapper">
        <div className="ring">
          <div className="ring-inner" />
          <Score health={this.state.leftBoxerHealth}
            name="left" />
          <Score health={this.state.rightBoxerHealth}
            name="right" />
          <div className="speaker">{this.state.winner ? `${this.state.winner} wins` : ''}</div>
          <Boxer
            id="leftBoxer"
            isHook={this.state.isLeftHook}
            isJab={this.state.isLeftJab}
            isMoving={this.state.isLeftMoving}
            position={this.state.leftBoxerPosition} />
          <Boxer
            id="rightBoxer"
            isHook={this.state.isRightHook}
            isJab={this.state.isRightJab}
            isMoving={this.state.isRightMoving}
            position={this.state.rightBoxerPosition} />
        </div>
      </div>
    )
  }
}
export default App
