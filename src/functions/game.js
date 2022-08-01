import { Player } from './player';

let playerOne;
let computer;

function gameInit() {
  playerOne = Player('player');
  computer = Player('Computer');

  playerOne.gameboard.placeNewShip([1, 2]);
  computer.gameboard.placeNewShip([5, 6, 7]);
}



const getPlayerOne = () => playerOne;
const getComputer = () => computer;

export { gameInit, getComputer, getPlayerOne};
