import { Player } from './player';
import { bindStart, renderShipsSelection, renderWrapper } from './DOM';
import { bindResetButton } from './DOMFunctions/resetButton';
import { dragHandlersInit } from './DOMFunctions/dragHandlers';
import { randomShipPlacement } from './AI';

let playerOne;
let computer;

// create two players and place ships on computer gameboard
function gameInit() {
  playerOne = Player('player');
  computer = Player('Computer');
  randomShipPlacement(computer.gameboard);
}

const initialLoad = () => {
    renderWrapper()
  bindStart();
  renderShipsSelection();
  bindResetButton();
  gameInit();
  dragHandlersInit();
};

const getPlayerOne = () => playerOne;
const getComputer = () => computer;

export { gameInit, getComputer, getPlayerOne, initialLoad };
