const shipPlacementHelpers = (() => {
  function getRandomCoords(shipLength, position, gameboard) {
    const coords = [];

    if (position === 'horizontal') {
      //   100 - shipLength makes it so ship cannot go over 100th field
      let firstCoord =
        Math.floor(Math.random() * (100 - shipLength - 0 + 1)) + 0;
      //   make sure that ships dont stack over each other
      while (
        checkIfCoordsHaveShip(firstCoord, gameboard, shipLength, position) ===
        true
      ) {
        firstCoord =
          Math.floor(Math.random() * (100 - shipLength * 10 - 0 + 1)) + 0;
      }
      coords.push(firstCoord);
      // add next coord horizontally for each corresponding ship space
      for (let j = 1; j < shipLength; j++) {
        const nextCoord = coords[coords.length - 1] + 1;
        coords.push(nextCoord);
      }
    } else {
      //   100 - shipLength * 10 makes it so ship cannot go over 100th field
      let firstCoord =
        Math.floor(Math.random() * (100 - shipLength * 10 - 0 + 1)) + 0;
      //   make sure that ships dont stack over each other
      while (
        checkIfCoordsHaveShip(firstCoord, gameboard, shipLength, position) ===
        true
      ) {
        firstCoord =
          Math.floor(Math.random() * (100 - shipLength * 10 - 0 + 1)) + 0;
      }
      coords.push(firstCoord);
      // add next coord vertically for each corresponding ship space
      for (let j = 1; j < shipLength; j++) {
        const nextCoord = coords[coords.length - 1] + 10;
        coords.push(nextCoord);
      }
    }
    return coords;
  }

  function randomizeShipPosition() {
    // random 0 or 1
    const newNumber = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    if (newNumber === 0) {
      return 'horizontal';
    }
    return 'vertical';
  }

  // checks if coords that you want to place ship on don't already have a ship
  function checkIfCoordsHaveShip(firstCoord, gameboard, shipLength, position) {
    const gameboardArray = gameboard.getGameboard();
    let firstCoordCopy = firstCoord.valueOf();
    if (gameboardArray[firstCoordCopy].hasShip === true) {
      return true;
    }
    if (position === 'horizontal') {
      for (let i = 1; i < shipLength; i++) {
        firstCoordCopy += 1;
        if (gameboardArray[firstCoordCopy].hasShip === true) {
          return true;
        }
      }
    } else {
      for (let i = 1; i < shipLength; i++) {
        firstCoordCopy += 10;
        if (gameboardArray[firstCoordCopy].hasShip === true) {
          return true;
        }
      }
    }
    return false;
  }

  return { getRandomCoords, randomizeShipPosition, checkIfCoordsHaveShip };
})();

const computerMoveHelpers = (() => {
  // FIRST FIELD WITH SHIP ON IT PARAM; CHECK IF THE SHIP IS SUNK AND IF NOT TRY OTHER FIELDS
  let firstHitParam = null;

  function setFirstHitParam(index) {
    firstHitParam = index;
  }

  function getFirstHitParam() {
    return firstHitParam;
  }

  // callStack
  let callStack = {};

  function createCallStackFirstHit(fields) {
    const initialParam = getFirstHitParam();
    if (fields[initialParam + 1] && !fields[initialParam + 1].disabled) {
      callStack.right = fields[initialParam + 1];
    }
    if (fields[initialParam - 1] && !fields[initialParam - 1].disabled) {
      callStack.left = fields[initialParam - 1];
    }
    if (fields[initialParam + 10] && !fields[initialParam + 10].disabled) {
      callStack.down = fields[initialParam + 10];
    }
    if (fields[initialParam - 10] && !fields[initialParam - 10].disabled) {
      callStack.up = fields[initialParam - 10];
    }
  }

  function createCallStackHorizontal(fields) {
    const initialParam = getFirstHitParam();
    if (fields[initialParam + 1] && !fields[initialParam + 1].disabled) {
      callStack.one = fields[initialParam + 1];
    }
    if (fields[initialParam + 2] && !fields[initialParam + 2].disabled) {
      callStack.two = fields[initialParam + 2];
    }
    if (fields[initialParam + 3] && !fields[initialParam + 3].disabled) {
      callStack.three = fields[initialParam + 3];
    }
    if (fields[initialParam - 1] && !fields[initialParam - 1].disabled) {
      callStack.four = fields[initialParam - 1];
    }
    if (fields[initialParam - 2] && !fields[initialParam - 2].disabled) {
      callStack.five = fields[initialParam - 2];
    }
    if (fields[initialParam - 3] && !fields[initialParam - 3].disabled) {
      callStack.six = fields[initialParam - 3];
    }
  }

  function createCallStackVertical(fields) {
    const initialParam = getFirstHitParam();
    if (fields[initialParam + 10] && !fields[initialParam + 10].disabled) {
      callStack.one = fields[initialParam + 10];
    }
    if (fields[initialParam + 20] && !fields[initialParam + 20].disabled) {
      callStack.two = fields[initialParam + 20];
    }
    if (fields[initialParam + 30] && !fields[initialParam + 30].disabled) {
      callStack.three = fields[initialParam + 30];
    }
    if (fields[initialParam - 10] && !fields[initialParam - 10].disabled) {
      callStack.four = fields[initialParam - 10];
    }
    if (fields[initialParam - 20] && !fields[initialParam - 20].disabled) {
      callStack.five = fields[initialParam - 20];
    }
    if (fields[initialParam - 30] && !fields[initialParam - 30].disabled) {
      callStack.six = fields[initialParam - 30];
    }
  }

  // shoots callStack one, two, three if ship position is know;
  function shootCallStack() {
    const callStack = getCallStack();
    if (callStack.hasOwnProperty('one')) {
      callStack.one.click();
      delete callStack.one;
    } else if (callStack.hasOwnProperty('two')) {
      callStack.two.click();
      delete callStack.two;
    } else if (callStack.hasOwnProperty('three')) {
      callStack.three.click();
      delete callStack.three;
    } else if (callStack.hasOwnProperty('four')) {
      callStack.four.click();
      delete callStack.four;
    } else if (callStack.hasOwnProperty('five')) {
      callStack.five.click();
      delete callStack.five;
    } else if (callStack.hasOwnProperty('six')) {
      callStack.six.click();
      delete callStack.six;
    }
  }

  function getCallStack() {
    return callStack;
  }

  function resetCallStack() {
    callStack = {};
  }

  function callStackEmpty() {
    if (Object.keys(callStack).length === 0) {
      return true;
    }
    return false;
  }

  // get fields index
  function getFieldIndex(field, fields) {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === field) {
        return i;
      }
    }
  }

  function checkIfShipHitAndNotSunk(indexOfField, gameboardArray) {
    if (
      gameboardArray[indexOfField].hasShip === true &&
      gameboardArray[indexOfField].shipSunk === false
    ) {
      return true;
    }
    return false;
  }

  // ship position
  let shipPosition = null;

  function changeShipPosition(position) {
    shipPosition = position;
  }

  function getShipPosition() {
    return shipPosition;
  }

  function isNotShotAlready(field) {
    if (!field.disabled) {
      return field;
    }
  }

  function getRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  return {
    getRandom,
    isNotShotAlready,
    getShipPosition,
    changeShipPosition,
    checkIfShipHitAndNotSunk,
    getFieldIndex,
    callStackEmpty,
    resetCallStack,
    getCallStack,
    shootCallStack,
    createCallStackVertical,
    createCallStackHorizontal,
    createCallStackFirstHit,
    getFirstHitParam,
    setFirstHitParam,
  };
})();

export { shipPlacementHelpers, computerMoveHelpers };
