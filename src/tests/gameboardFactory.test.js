import { Gameboard } from '../functions/gameBoardFactory';

test('placenewship changes gameboard', () => {
  const gameboard = Gameboard();
  gameboard.init();
  //   const oldGameboard = gameboard.gameboard;

  gameboard.placeNewShip([1, 12]);
  const actual = gameboard.getGameboard().find((val) => val.hasShip === true);
  const expected = { hasShip: true };
  expect(actual).toMatchObject(expected);
});

test('placenewship changes gameboard', () => {
  const gameboard = Gameboard();
  gameboard.init();
  //   const oldGameboard = gameboard.gameboard;

  gameboard.placeNewShip([1, 12]);
  const actual = gameboard.getGameboard()[12];
  const expected = { hasShip: true };
  expect(actual).toMatchObject(expected);
});

test('placenewship adds ship to ships array', () => {
  const gameboard = Gameboard();
  gameboard.init();
  gameboard.placeNewShip([1, 2]);
  const actual = gameboard.getShips();
  const expected = [expect.any(Object)];
  expect(actual).toEqual(expected);
});

test('receive attack changes isShot', () => {
  const gameboard = Gameboard();
  gameboard.init();
  const expected = { isShot: true };
  gameboard.receiveAttack(2);
  const getGameboard = gameboard.getGameboard();
  const actual = getGameboard[2];
  expect(actual).toMatchObject(expected);
});

test('receive attack fires hit', () => {
  const gameboard = Gameboard();
  gameboard.init();
  gameboard.placeNewShip([1, 2, 3]);
  const ships = gameboard.getShips();
  // take first ship and mock hit function to check if it's called
  const firstShip = ships[0];
  firstShip.hit = jest.fn();
  // fire receiveAttack
  gameboard.receiveAttack(3);
  expect(firstShip.hit).toHaveBeenCalled();
});

test('receiveattack sinks the ship correctly', () => {
  const gameboard = Gameboard();
  gameboard.init();
  gameboard.placeNewShip([1]);
  gameboard.receiveAttack(1);
  const shipsExpected = [];
  const shipsActual = gameboard.getShips();
  expect(shipsActual).toEqual(shipsExpected);
});

test('check for ships left', () => {
  const gameboard = Gameboard();
  gameboard.init();
  const ships = gameboard.getShips();
  expect(gameboard.checkForShipsLeft(ships)).toEqual(true);
});
