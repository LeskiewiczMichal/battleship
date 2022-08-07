import { gameInit, getComputer, getPlayerOne } from '../game';
import { renderGame, renderShipsSelection } from '../DOM';
import { dragHandlersInit } from './dragHandlers';


// removes both gameboards and player names
// game init creates players and places ships
// makes reset button visible
// renders everything
function resetButtonFunctionality() {
  document.querySelectorAll('.gameboard').forEach((gameboard) => {
    gameboard.remove();
  });
  document.querySelector('.namesDisplay').remove();
  document.querySelector('#startGame').style.display = 'block';
  document.querySelector('#resetBtn').style.display = 'none';
  document.querySelector('.display').innerHTML = '';

  gameInit();
  renderShipsSelection();
  dragHandlersInit();
  // const player = getPlayerOne();
  // const playerGameboard = player.gameboard;
  // const computer = getComputer();
  // const computerGameboard = computer.gameboard;
  // renderGame(playerGameboard, computerGameboard);
}

const bindResetButton = () => {
  document
    .querySelector('#resetBtn')
    .addEventListener('click', resetButtonFunctionality);
};

export { bindResetButton };
