import { Player } from './player';
import { Gameboard } from './functions/gameBoardFactory';
import { bindStart, renderShipsSelection } from './functions/DOM';
import { bindResetButton } from './functions/DOMFunctions/resetButton';
import './style/style.css';
import { gameInit, getPlayerOne } from './functions/game';
import { dragHandlersInit } from './functions/DOMFunctions/dragHandlers';

// const gameLoop =




let playerOne;
let computer;

// create two players
function gameInit() {
  playerOne = Player('player');
  computer = Player('Computer');
//   playerOne.gameboard.placeNewShip([1, 2]);
  computer.gameboard.placeNewShip([1, 2]);
}

const initialLoad = () => {
    bindStart();
    renderShipsSelection();
    bindResetButton();
    gameInit();
    dragHandlersInit();
}



const getPlayerOne = () => playerOne;
const getComputer = () => computer;

export { gameInit, getComputer, getPlayerOne, initialLoad};
