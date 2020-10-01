import React, { Component } from 'react'
import './style.css'

class Food extends Component {
  state = {
    hidden: false,
    position: {
      top: this.props.position.top,
      left: this.props.position.left
    }
  }

  ate() {
    this.setState({ hidden: !this.hidden });
  }

  render () {
    const { position, hidden } = this.state;

    return (
      <div
      className={hidden ? 'food hidden' : 'food'}
      style={position}
      >
        <div className="food-dot"></div>
      </div>
    )
  }
}

Food.defaultProps = {
  foodSize: 50,
  position: {
    top:0,
    left:0
  }
}

export default Food;
