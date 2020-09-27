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

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();
  }

  componentDidMount() {
    this.pacmanRef.current.focus();
  }

  handleKeyDown = (event) => {
    console.log(event.keyCode, event.key);
  }

  render () {
    return (
      <div
      className="pacman"
      ref={this.pacmanRef}
      style={this.state.position}
      tabIndex="0"
      onKeyDown={this.handleKeyDown}
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
