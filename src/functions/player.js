import { Gameboard } from './gameBoardFactory';
import { computerMove } from './AI';

const Player = (name) => {
  const gameboard = Gameboard(name);
  gameboard.init();

//   if(name === 'Computer') {
//     const move = computerMove;
//   }

  return { gameboard };
};

export { Player }