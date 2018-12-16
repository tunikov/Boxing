import React, { Component } from 'react'
import './App.scss'
import Score from './components/score'
import Boxer from './components/boxer'

class App extends Component {
  constructor(props){
    super(props)
    this.setBoxerPosition = this.setBoxerPosition.bind(this)
    this.setJabDamage = this.setJabDamage.bind(this)
    this.setHookDamage = this.setHookDamage.bind(this)
    this.state = {
      leftBoxerHealth: 100,
      rightBoxerHealth: 100,
      leftBoxerPosition: 350,
      rightBoxerPosition: 555,
      allowMoving: true,
      stopGame: false,
      winner: false
    }
  }
  setBoxerPosition(boxer,leftPosition){
    this.setState({allowMoving: true})
    const limitMoving = () => this.setState({allowMoving: false})

    if(boxer == 'rightBoxer'){
      if(leftPosition >= 750 || leftPosition <= (this.state.leftBoxerPosition + 50)) return limitMoving()
    }
    if(boxer == 'leftBoxer'){
      if(leftPosition <= 150 || leftPosition >= (this.state.rightBoxerPosition - 50)) return limitMoving()
    }
    this.setState({[`${boxer}Position`]: leftPosition})
  }
  toDamage(boxer,leftPosition,value){
    if(boxer == 'rightBoxer' && leftPosition <= (this.state.leftBoxerPosition + 55)){
      console.log(this.state.stopGame)
      this.setState({leftBoxerHealth: this.state.leftBoxerHealth - 20})
    }
    if(boxer == 'leftBoxer' && leftPosition >= (this.state.rightBoxerPosition - 55)){
      this.setState({rightBoxerHealth: this.state.rightBoxerHealth - 20})
    }
    if(this.state.rightBoxerHealth <= 0 || this.state.leftBoxerHealth <= 0){
      this.setState({stopGame: true})
      this.setState({winner: this.state.rightBoxerHealth <= 0 ? 'Left Boxer' : 'Right Boxer'})
    }
  }
  setJabDamage(boxer,leftPosition){
    this.toDamage(boxer,leftPosition,5)
  }
  setHookDamage(boxer,leftPosition){
    this.toDamage(boxer,leftPosition,20)
  }
  render(){
    return (
      <div className="wrapper">
        <div className="ring">
          <div className="ring-inner"></div> 
          <Score name="left" health={this.state.leftBoxerHealth} />
          <Score name="right" health={this.state.rightBoxerHealth} />
          <div className="speaker">{this.state.winner ? `${this.state.winner} wins` : ''}</div>
          <Boxer 
            classText="leftBoxer" 
            leftPosition={this.state.leftBoxerPosition}
            setPosition={this.setBoxerPosition}
            opponentPosition={this.state.rightBoxerPosition}
            setJabDamage={this.setJabDamage} 
            setHookDamage={this.setHookDamage}
            allowMoving={this.state.allowMoving}
            stopGame={this.state.stopGame}
          />
          <Boxer 
            classText="rightBoxer" 
            leftPosition={this.state.rightBoxerPosition}
            setPosition={this.setBoxerPosition}
            opponentPosition={this.state.leftBoxerPosition}
            setJabDamage={this.setJabDamage} 
            setHookDamage={this.setHookDamage}
            allowMoving={this.state.allowMoving}
            stopGame={this.state.stopGame}
          />
        </div>
      </div>
    )
  }
}
export default App
