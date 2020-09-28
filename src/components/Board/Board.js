import React, { Component } from 'react'
import './style.css'
import Pacman from '../Pacman'
import Ghost from '../Ghost'
import Food from '../Food'

class Board extends Component {

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();

    this.foods = [];
    this.currentFood = [];

    this.amountOfFood = (
      (window.innerWidth - this.props.foodSize)
      * (window.innerHeight - this.props.topScoreBoardHeight)
    ) / (this.props.foodSize * this.props.foodSize) - 1;
    // console.log('szer okna: ', window.innerWidth);
    // console.log('wys okna: ', window.innerHeight);
    // console.log('wielk jedzenia: ', this.props.foodSize);
    // console.log('wys headera: ', this.props.topScoreBoardHeight);
    // console.log('ilosc jedzenia na ekran: ', this.amountOfFood);

    for (let i = 0; i < this.amountOfFood; i++) {
      this['food' + i] = React.createRef;
    }
  }

  componentDidMount () {
    this.foodInterval = setInterval(this.lookForFood, 100)
  }

  componentWillUnmount () {
    clearInterval(this.foodInterval);
  }

  lookForFood = () => {
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    console.log('przed for');

    for (let i = 0; i <= this.amountOfFood; i++) {
      console.log("po for");
      let currentFood = this['food' + i].current;
      console.log(currentFood);
      if (currentFood) {
        console.log("pierwszyPierwszy if X")
        let currentFoodX = currentFood.state.position.left;
        let currentFoodY = currentFood.state.position.top;
        let currentFoodSize = currentFood.props.foodSize;
        let currentFoodLastX = currentFoodX + currentFoodSize / 2;
        let currentFoodLastY = currentFoodY + currentFoodSize / 2;

        if (
          (pacmanX >= currentFoodX && pacmanX <= currentFoodLastX)
          || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
          console.log("pierwszy if X")
          if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY)
            || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
            console.log("pierwszy if Y")
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
        <Ghost color={'red'}/>
        <Ghost color={'yellow'}/>
        <Ghost color={'pink'}/>
        <Ghost color={'blue'}/>
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
