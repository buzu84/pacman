import React, { Component } from 'react'
import './style.css'
import { ReactComponent as PacmanSvg } from './pacman.svg'

class Pacman extends Component {
  state = {
    direction: 'right',
    position: {
      top: 0,
      left: 0
    }
  }

  render () {
    return (
      <div
      className="pacman"
      style={this.state.position}
      >
        <PacmanSvg />
      </div>
    )
  }
}

Pacman.defaultProps = {
  // TODO move to config
  step: 50,
  size: 50,
  border: 20,
  topScoreBoardHeight: 50
}

export default Pacman;
