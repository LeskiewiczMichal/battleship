import { Gameboard } from './gameBoardFactory';

const Player = (name) => {
  const gameboard = Gameboard(name);
  gameboard.init();

  return { gameboard };
};

export { Player }