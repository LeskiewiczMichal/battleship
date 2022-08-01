import { Ship } from './shipFactory';

const Gameboard = (name) => {
  const playerName = name;
  let gameboard = [];
  let ships = [];

  const init = () => {
    for (let i = 0; i < 100; i++) {
      gameboard.push({ hasShip: false, isShot: false });
    }
  };

  const placeNewShip = (coordinates) => {
    ships.push(Ship(coordinates));
    coordinates.forEach((coordinate) => {
      gameboard[coordinate].hasShip = true;
    });
    // gameboard[coordinates].hasShip = true;
  };

  function sinkTheShip(ship) {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i] === ship) {
        ships.splice(i, 1);
        i--;
      }
    }
  }

  function checkForShipsLeft(ships) {
    if (ships.length === 0) {
      return true;
    }
  }

  const receiveAttack = (coordinate) => {
    gameboard[coordinate].isShot = true;
    if (gameboard[coordinate].hasShip === true) {
      ships.forEach((ship) => {
        const coords = ship.getCoordinates();
        for (let i = 0; i < coords.length; i++) {
          if (coords[i] === coordinate) {
            ship.hit();
            if (ship.getSunkStatus() === true) {
              sinkTheShip(ship);
            }
          }
        }
      });
    }
  };

  const getShips = () => ships;
  const getGameboard = () => gameboard;
  const getPlayerName = () => playerName;
  return {
    getGameboard,
    placeNewShip,
    init,
    getShips,
    receiveAttack,
    checkForShipsLeft,
    getPlayerName,
  };
};

export { Gameboard };
