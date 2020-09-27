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
    this.changeDirectionInterval = setInterval(this.changeDirection, 2000)
  }

  componentWillUnmount () {
    clearInterval(this.changeDirectionInterval);
  }

  changeDirection = () => {
    const arrayOfMovement = ['up', 'right', 'down', 'left'];
    const movement = Math.floor(Math.random() * 4);

    this.setState({
      direction: arrayOfMovement[movement],
    }, () => {
      console.log('direction: ', this.state.direction)
    })
  }

  

  render () {
    const { color } = this.props;
    return (
      <div className="ghost"
      style={this.state.position}
      >
        <GhostSvg className={`ghost-${color}`}/>
      </div>    )
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
