import { Player } from './player';

let playerOne;
let computer;

// create two players
function gameInit() {
  playerOne = Player('player');
  computer = Player('Computer');


//   playerOne.gameboard.placeNewShip([1, 2]);
  computer.gameboard.placeNewShip([1, 2]);
}



const getPlayerOne = () => playerOne;
const getComputer = () => computer;

export { gameInit, getComputer, getPlayerOne};
