import React from 'react'
import './score.scss'

const Score = props => (
    <div className={`scores-cont scores__${props.name}`}>
      <p className={`scores-cont__name ${props.name}-name`}>{props.name}</p>
      <p>
        <span className={`scores-cont__health ${props.name}-health`}>
          <span style={{width: props.health + '%'}}></span>
        </span>
      </p>
    </div>
)

export default Score