import { checkIfShipBreaksLine } from './DOMFunctions/checkIfShipBreaksLine';

const shipPlacementHelpers = (() => {
  function getRandomCoords(shipLength, position, gameboard) {
    const coords = [];

    if (position === 'horizontal') {
      //   100 - shipLength makes it so ship cannot go over 100th field
      let firstCoord =
        Math.floor(Math.random() * (100 - shipLength - 0 + 1)) + 0;
      let lastCoord = firstCoord + shipLength - 1;
      //   make sure that ships dont stack over each other
      while (
        checkIfCoordsHaveShip(firstCoord, gameboard, shipLength, position) ===
          true ||
        checkIfShipBreaksLine(firstCoord, lastCoord) === true
      ) {
        firstCoord =
          Math.floor(Math.random() * (100 - shipLength * 10 - 0 + 1)) + 0;
        lastCoord = firstCoord + shipLength - 1;
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
  const callstack = (() => {
    let callStack = {};

    //   creates callstack to try out different sides of
    // ship that was shot, untill one of them hits and this callstack resets to the next
    function createFirstHit(fields) {
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

    //   if position horizontal this adds horizontal fields to callstack
    function createHorizontal(fields) {
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

    //   if position vertical this adds vertical fields to callstack
    function createVertical(fields) {
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

    // shoots horizontal or vertical callstack;
    function shootAll() {
      const callStack = get();
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

    // attack each property and remove it untill one hits the ship
    // if it does hit, set relative ship position and reset call stack
    // for further attacking
    const shootToCheckPosition = (callStack, fields, gameboardArray) => {
      if (callStack.hasOwnProperty('right')) {
        callStack.right.click();
        const indexOfField = getFieldIndex(callStack.right, fields);
        if (checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
          changeShipPosition('horizontal');
          reset();
        }
        delete callStack.right;
      } else if (callStack.hasOwnProperty('left')) {
        callStack.left.click();
        const indexOfField = getFieldIndex(callStack.left, fields);
        if (checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
          changeShipPosition('horizontal');
          reset();
        }
        delete callStack.left;
      } else if (callStack.hasOwnProperty('up')) {
        callStack.up.click();
        const indexOfField = getFieldIndex(callStack.up, fields);
        if (checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
          changeShipPosition('vertical');
          reset();
        }
        delete callStack.up;
      } else if (callStack.hasOwnProperty('down')) {
        callStack.down.click();
        const indexOfField = getFieldIndex(callStack.down, fields);
        if (checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
          changeShipPosition('vertical');
          reset();
        }
        delete callStack.down;
      }
    };

    function get() {
      return callStack;
    }

    function reset() {
      callStack = {};
    }

    function isEmpty() {
      if (Object.keys(callStack).length === 0) {
        return true;
      }
      return false;
    }

    return {
      isEmpty,
      reset,
      get,
      shootAll,
      createVertical,
      createHorizontal,
      createFirstHit,
      shootToCheckPosition,
    };
  })();

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

  const randomField = (() => {
    let field = 0;

    function attack(fields) {
      const fielteredFields = fields.filter(isNotShotAlready);
      field = getRandom(fielteredFields);
      field.click();
    }

    function findIndex(fields) {
      let returnVal = null;
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] === field) {
          returnVal = i;
        }
      }
      return returnVal;
    }

    return { attack, findIndex };
  })();

  return {
    getRandom,
    isNotShotAlready,
    getShipPosition,
    changeShipPosition,
    checkIfShipHitAndNotSunk,
    getFieldIndex,
    callstack,
    getFirstHitParam,
    setFirstHitParam,
    randomField,
  };
})();

export { shipPlacementHelpers, computerMoveHelpers };
