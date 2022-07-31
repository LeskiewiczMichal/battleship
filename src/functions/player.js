import { Gameboard } from './gameBoardFactory';

const Player = (name) => {
  const gameboard = Gameboard();
  gameboard.init();

  return { gameboard };
};

export { Player }