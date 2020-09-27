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
    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;
    const { step, size } = this.props;

    if (event.key === 'ArrowUp') {
      this.setState({
        direction: 'up',
        position: {
          top: currentTop - size,
          left: currentLeft
        }
      })
    } else if (event.key === 'ArrowRight') {
      this.setState({
        direction: 'right',
        position: {
          top: currentTop,
          left: currentLeft + step
        }
      })
    } else if (event.key === 'ArrowDown') {
      this.setState({
        direction: 'down',
        position: {
          top: currentTop + size,
          left: currentLeft
        }
      })
    } else if (event.key === 'ArrowLeft') {
      this.setState({
        direction: 'left',
        position: {
          top: currentTop,
          left: currentLeft - size
        }
      })
    }
  }

  render () {
    const { direction, position } = this.state;
    return (
      <div
      className={`pacman pacman-${direction}`}
      ref={this.pacmanRef}
      style={position}
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
