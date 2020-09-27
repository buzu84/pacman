import React, { Component } from 'react'
import './style.css'
import { ReactComponent as GhostSvg } from './ghost.svg'

class Ghost extends Component {
  state = {
    direction: 'left',
    position: {
      top: 3 * 50,
      left: 3 * 50
    }
  }

  componentDidMount () {
    this.changeDirectionInterval = setInterval(this.changeDirection, 2000);
    this.changePositionInterval = setInterval(this.move, 2000);
  }

  componentWillUnmount () {
    clearInterval(this.changeDirectionInterval);
    clearInterval(this.changePositionInterval);
  }

  changeDirection = () => {
    const arrayOfMovement = ['up', 'right', 'down', 'left'];
    const movement = Math.floor(Math.random() * 4);

    this.setState({
      direction: arrayOfMovement[movement],
    })
  }

  move = () => {
    // TODO: refactoring
    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;
    const { direction } = this.state;
    const { step, size, border, topScoreBoardHeight } = this.props;

    if (direction === 'up') {
      this.setState({
        position: {
          top: Math.max(currentTop - step, 0),
          left: currentLeft
        }
      })
    } else if (direction === 'right') {
      this.setState({
        position: {
          top: currentTop,
          left: Math.min(currentLeft + step, window.innerWidth - border/2 - size)
        }
      })
    } else if (direction === 'down') {
      this.setState({
        position: {
          top: Math.min(currentTop + step, window.innerHeight -  size - border - topScoreBoardHeight),
          left: currentLeft
        }
      })
    } else if (direction === 'left') {
      this.setState({
        position: {
          top: currentTop,
          left: Math.max(currentLeft - step, 0)
        }
      })
    }
  }

  render () {
    const { color } = this.props;
    return (
      <div className="ghost"
      style={this.state.position}
      >
        <GhostSvg className={`ghost-${color}`}/>
      </div>
    )
  }
}

Ghost.defaultProps = {
  color: 'red',
  size: 50,
  step: 50,
  border: 20,
  topScoreBoardHeight: 50
}
export default Ghost;
