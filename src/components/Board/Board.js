import React, { Component } from 'react'
import './style.css'
import Pacman from '../Pacman'
import Ghost from '../Ghost'

class Board extends Component {
  render () {
    return (
      <div className="board">
        <Pacman />
        <Ghost color={'pink'}/>
        <Ghost color={'yellow'}/>
        <Ghost color={'green'}/>
      </div>
    )
  }
}

export default Board;
