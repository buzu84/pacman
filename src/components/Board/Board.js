import React, { Component } from 'react'
import './style.css'
import Pacman from '../Pacman'
import Ghost from '../Ghost'
import Food from '../Food'

class Board extends Component {

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();

    this.ghost1Ref = React.createRef();
    this.ghost2Ref = React.createRef();
    this.ghost3Ref = React.createRef();
    this.ghost4Ref = React.createRef();

    this.foods = [];
    this.currentFood = [];

    this.amountOfFood = (
      (window.innerWidth - this.props.foodSize)
      * (window.innerHeight - this.props.topScoreBoardHeight)
    ) / (this.props.foodSize * this.props.foodSize) - 1;


    for (let i = 0; i < this.amountOfFood; i++) {
      this['food' + i] = React.createRef();
    }
  }

  componentDidMount () {
    this.foodInterval = setInterval(this.lookForFood, 100);
    this.collisionInterval = setInterval(this.lookForCollision, 100);
  }

  componentWillUnmount () {
    clearInterval(this.foodInterval);
    clearInterval(this.collisionInterval);
  }

  lookForCollision = () => {
    const ghost1X = this.ghost1Ref.current.state.position.left;
    const ghost1Y = this.ghost1Ref.current.state.position.top;
    // const ghost2X = this.ghost2Ref.current.state.position.left;
    // const ghost2Y = this.ghost2Ref.current.state.position.top;
    // const ghost3X = this.ghost3Ref.current.state.position.left;
    // const ghost3Y = this.ghost3Ref.current.state.position.top;
    // const ghost4X = this.ghost4Ref.current.state.position.left;
    // const ghost4Y = this.ghost4Ref.current.state.position.top;
    // TODO: dokoncz dla reszty duchow.
    const ghostSize = this.ghost1Ref.current.props.size

    const ghost1LastX = ghost1X + ghostSize / 2;
    const ghost1LastY = ghost1Y + ghostSize / 2;

    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    if (
      (pacmanX >= ghost1X && pacmanX <= ghost1LastX)
      || (pacmanLastX >= ghost1X && pacmanLastX <= ghost1LastX)) {
      if ((pacmanY >= ghost1Y && pacmanY <= ghost1LastY)
        || (pacmanLastY >= ghost1Y && pacmanLastY <= ghost1LastY)) {
        console.log("duzek 1 spotkal pacmana:)")
      }
    }


  }

  lookForFood = () => {
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;


    for (let i = 0; i <= this.amountOfFood; i++) {
      let currentFood = this['food' + i].current;
      if (currentFood) {
        let currentFoodX = currentFood.state.position.left;
        let currentFoodY = currentFood.state.position.top;
        let currentFoodSize = currentFood.props.foodSize;
        let currentFoodLastX = currentFoodX + currentFoodSize / 2;
        let currentFoodLastY = currentFoodY + currentFoodSize / 2;

        if (
          (pacmanX >= currentFoodX && pacmanX <= currentFoodLastX)
          || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
          if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY)
            || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
            if (!currentFood.state.hidden) {
              currentFood.ate(); // !hidden
              this.props.setScore((value) => value + 1)
            }
          }
        }
      }
    }
  }

  render () {
    const { foodSize, border, topScoreBoardHeight} = this.props;
    let foods = [];
    let currentLeft = 1 * foodSize;
    let currentTop = 0;

    for (let i = 0; i < this.amountOfFood; i++) {
      if (currentLeft + foodSize >= window.innerWidth - border) {
        currentTop += foodSize;
        currentLeft = 0;
      }

      if (currentTop + foodSize >= (window.innerHeight - topScoreBoardHeight - border)) {
        break;
      }

      const position = {
        left: currentLeft,
        top: currentTop
      }

      currentLeft += foodSize;
      foods.push(
        <Food
        key={`food-elem-${i}`}
        position={position}
        ref={this['food' + i]}
        />
      )
    }

    return (
      <div className="board">
        {foods}
        <Pacman ref={this.pacmanRef}/>
        <Ghost ref={this.ghost1Ref} color={'red'}/>
        <Ghost ref={this.ghost2Ref} color={'yellow'}/>
        <Ghost ref={this.ghost3Ref} color={'pink'}/>
        <Ghost ref={this.ghost4Ref} color={'blue'}/>
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
