import { gameInit, getComputer, getPlayerOne } from '../game';
import { renderGameboard, changePlayerMove, displayPlayerNames } from '../DOM';

function resetButtonFunctionality() {
  document.querySelectorAll('.gameboard').forEach((gameboard) => {
    gameboard.remove()
  });

  document.querySelector('.namesDisplay').remove();

  gameInit();
  const player = getPlayerOne();
  const playerGameboard = player.gameboard;
  const computer = getComputer();
  const computerGameboard = computer.gameboard;
  renderGameboard(playerGameboard, 'player');
  renderGameboard(computerGameboard, 'computer');
  changePlayerMove('player');
  displayPlayerNames('Player', 'Computer');}

const bindResetButton = () => {
  document.querySelector('#resetBtn').addEventListener('click', resetButtonFunctionality);
};

export { bindResetButton };