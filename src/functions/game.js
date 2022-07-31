import { Player } from './player';

let playerOne;
let computer;

function gameInit() {
  playerOne = Player('playerOne');
  computer = Player('Computer');

  playerOne.gameboard.placeNewShip([1, 2]);
  computer.gameboard.placeNewShip([5, 6, 7]);
}

// const playerMove = () => {
//   const playerButtons = document.querySelectorAll('[data-player="player"]');
//   playerButtons.forEach((field) => {
//     field.disabled = true;
//   });
// };

const getPlayerOne = () => playerOne;
const getComputer = () => computer;

export { gameInit, getComputer, getPlayerOne };
