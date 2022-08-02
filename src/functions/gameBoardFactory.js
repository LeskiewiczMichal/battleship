import { Ship } from './shipFactory';

const Gameboard = (name) => {
  const playerName = name;
  let gameboard = [];
  let ships = [];

//   add elements to gameboard array
  const init = () => {
    for (let i = 0; i < 100; i++) {
      gameboard.push({ hasShip: false, isShot: false });
    }
  };

//   places ship in gameboard array, adds it to ships array
  const placeNewShip = (coordinates) => {
    ships.push(Ship(coordinates));
    coordinates.forEach((coordinate) => {
      gameboard[coordinate].hasShip = true;
    });
  };

//   finds ship in ships array and removes it
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

//   takes coordinate, changes the gameboard array using it
  const receiveAttack = (coordinate) => {
    // gameboard was shot
    gameboard[coordinate].isShot = true;

    // if ship was placed on coordinates 
    // finds ship in ships array by coordinates and hits it
    // checks if the ship should be sank and fires sinkTheShip if needed
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
