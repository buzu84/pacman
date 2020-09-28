import React, { Component } from 'react'
import './style.css'
import Pacman from '../Pacman'
import Ghost from '../Ghost'
import Food from '../Food'

class Board extends Component {

  constructor(props) {
    super(props);

    this.amountOfFood = (
      (window.innerWidth - this.props.foodSize)
      * (window.innerHeight - this.props.topScoreBoardHeight)
    ) / (this.props.foodSize * this.props.foodSize) - 1;

    console.log("ile zmiesci sie jedzenia: ", this.amountOfFood);
    console.log("wys okna: ", window.innerHeight);
    console.log("szer okna: ", window.innerWidth);
    console.log("wielkosc jedzenia: ", this.props.foodSize);
    console.log("wys score panelu: ", this.props.topScoreBoardHeight);

  }

  render () {
    return (
      <div className="board">
        <Pacman />
        <Ghost color={'red'}/>
        <Ghost color={'yellow'}/>
        <Ghost color={'pink'}/>
        <Ghost color={'blue'}/>
        <Food position={{top: 100, left: 100}}/>
      </div>
    )
  }
}

// TODO: refactoring
Board.defaultProps = {
  foodSize: 50,
  border: 10 * 2,
  topScoreBoardHeight: 50
}

export default Board;
