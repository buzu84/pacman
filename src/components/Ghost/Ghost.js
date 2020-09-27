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
