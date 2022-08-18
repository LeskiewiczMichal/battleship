import { Player } from './player';
import { bindStart, renderShipsSelection } from './DOM';
import { bindResetButton } from './DOMFunctions/resetButton';
import { dragHandlersInit } from './DOMFunctions/dragHandlers';

// const gameLoop =




let playerOne;
let computer;

// create two players
function gameInit() {
  playerOne = Player('player');
  computer = Player('Computer');
//   playerOne.gameboard.placeNewShip([1, 2]);
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
