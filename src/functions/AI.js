import { shipPlacementHelpers, computerMoveHelpers } from './AIHelpers';

// // FIRST FIELD WITH SHIP ON IT PARAM; CHECK IF THE SHIP IS SUNK AND IF NOT TRY OTHER FIELDS
// let firstHitParam = null;

// function setFirstHitParam(index) {
//   firstHitParam = index;
// }

// function getFirstHitParam() {
//   return firstHitParam;
// }

// // callStack
// let callStack = {};

// function createCallStackFirstHit(fields) {
//   const initialParam = getFirstHitParam();
//   if (fields[initialParam + 1] && !fields[initialParam + 1].disabled) {
//     callStack.right = fields[initialParam + 1];
//   }
//   if (fields[initialParam - 1] && !fields[initialParam - 1].disabled) {
//     callStack.left = fields[initialParam - 1];
//   }
//   if (fields[initialParam + 10] && !fields[initialParam + 10].disabled) {
//     callStack.down = fields[initialParam + 10];
//   }
//   if (fields[initialParam - 10] && !fields[initialParam - 10].disabled) {
//     callStack.up = fields[initialParam - 10];
//   }
// }

// function createCallStackHorizontal(fields) {
//   const initialParam = getFirstHitParam();
//   if (fields[initialParam + 1] && !fields[initialParam + 1].disabled) {
//     callStack.one = fields[initialParam + 1];
//   }
//   if (fields[initialParam + 2] && !fields[initialParam + 2].disabled) {
//     callStack.two = fields[initialParam + 2];
//   }
//   if (fields[initialParam + 3] && !fields[initialParam + 3].disabled) {
//     callStack.three = fields[initialParam + 3];
//   }
//   if (fields[initialParam - 1] && !fields[initialParam - 1].disabled) {
//     callStack.four = fields[initialParam - 1];
//   }
//   if (fields[initialParam - 2] && !fields[initialParam - 2].disabled) {
//     callStack.five = fields[initialParam - 2];
//   }
//   if (fields[initialParam - 3] && !fields[initialParam - 3].disabled) {
//     callStack.six = fields[initialParam - 3];
//   }
// }

// function createCallStackVertical(fields) {
//   const initialParam = getFirstHitParam();
//   if (!fields[initialParam + 10].disabled) {
//     callStack.one = fields[initialParam + 10];
//   }
//   if (!fields[initialParam + 20].disabled) {
//     callStack.two = fields[initialParam + 20];
//   }
//   if (!fields[initialParam + 30].disabled) {
//     callStack.three = fields[initialParam + 30];
//   }
//   if (!fields[initialParam - 10].disabled) {
//     callStack.four = fields[initialParam - 10];
//   }
//   if (!fields[initialParam - 20].disabled) {
//     callStack.five = fields[initialParam - 20];
//   }
//   if (!fields[initialParam - 30].disabled) {
//     callStack.six = fields[initialParam - 30];
//   }
// }

// // shoots callStack one, two, three if ship position is know;
// function shootCallStack() {
//   const callStack = getCallStack();
//   if (callStack.hasOwnProperty('one')) {
//     callStack.one.click();
//     delete callStack.one;
//   } else if (callStack.hasOwnProperty('two')) {
//     callStack.two.click();
//     delete callStack.two;
//   } else if (callStack.hasOwnProperty('three')) {
//     callStack.three.click();
//     delete callStack.three;
//   } else if (callStack.hasOwnProperty('four')) {
//     callStack.four.click();
//     delete callStack.four;
//   } else if (callStack.hasOwnProperty('five')) {
//     callStack.five.click();
//     delete callStack.five;
//   } else if (callStack.hasOwnProperty('six')) {
//     callStack.six.click();
//     delete callStack.six;
//   }
// }

// function getCallStack() {
//   return callStack;
// }

// function resetCallStack() {
//   callStack = {};
// }

// function callStackEmpty() {
//   if (Object.keys(callStack).length === 0) {
//     return true;
//   }
//   return false;
// }

// // get fields index
// function getFieldIndex(field, fields) {
//   for (let i = 0; i < fields.length; i++) {
//     if (fields[i] === field) {
//       return i;
//     }
//   }
// }

// function checkIfShipHitAndNotSunk(indexOfField, gameboardArray) {
//   if (
//     gameboardArray[indexOfField].hasShip === true &&
//     gameboardArray[indexOfField].shipSunk === false
//   ) {
//     return true;
//   }
//   return false;
// }

// // ship position
// let shipPosition = null;

// function changeShipPosition(position) {
//   shipPosition = position;
// }

// function getShipPosition() {
//   return shipPosition;
// }

const computerMove = (playerFields, gameboardArray) => {
  // DECLARE VARIABLES
  // fields from gameboard
  const fields = [...playerFields];
  let indexOfField;
  //   if first if statements fire this changes to true so last if won't
  let flagIfStatements = false;

  //   if position of ship chosen and ship not sunk
  if (
    computerMoveHelpers.getShipPosition() &&
    gameboardArray[computerMoveHelpers.getFirstHitParam()].shipSunk === false
  ) {
    flagIfStatements = true;
    if (!computerMoveHelpers.callStackEmpty()) {
        computerMoveHelpers.shootCallStack();
    } else if (computerMoveHelpers.getShipPosition() === 'horizontal') {
        computerMoveHelpers.createCallStackHorizontal(fields);
        computerMoveHelpers.shootCallStack();
    } else {
        computerMoveHelpers.createCallStackVertical(fields);
        computerMoveHelpers.shootCallStack();
    }
  }
  //   if attacked ship was sunk reset call stack and null ship position
  else if (
    computerMoveHelpers.getShipPosition() &&
    gameboardArray[computerMoveHelpers.getFirstHitParam()].shipSunk === true
  ) {
    computerMoveHelpers.resetCallStack();
    computerMoveHelpers.changeShipPosition(null);
  }

  // if no field chosen attack random field
  if (computerMoveHelpers.callStackEmpty() && !flagIfStatements) {
    const fielteredFields = fields.filter(computerMoveHelpers.isNotShotAlready);
    const randomField = computerMoveHelpers.getRandom(fielteredFields);
    randomField.click();
    //   search for index in fields,
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === randomField) {
        indexOfField = i;
      }
    }
    // if field chosen has ship but ship is not sunk already
    if (
      gameboardArray[indexOfField].hasShip === true &&
      gameboardArray[indexOfField].shipSunk === false
    ) {
      // create call stack
      computerMoveHelpers.setFirstHitParam(indexOfField);
      computerMoveHelpers.createCallStackFirstHit(fields);
    } else {
        computerMoveHelpers.setFirstHitParam(null);
        computerMoveHelpers.resetCallStack();
    }
  } else if (!computerMoveHelpers.callStackEmpty() && !flagIfStatements) {
    // attack each property and remove it untill one hits the ship
    // if it does hit, set relative ship position and reset call stack
    // for further attacking
    const callStack = computerMoveHelpers.getCallStack();
    if (callStack.hasOwnProperty('right')) {
      callStack.right.click();
      const indexOfField = computerMoveHelpers.getFieldIndex(callStack.right, fields);
      if (computerMoveHelpers.checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
        computerMoveHelpers.changeShipPosition('horizontal');
        computerMoveHelpers.resetCallStack();
      }
      delete callStack.right;
    } else if (callStack.hasOwnProperty('left')) {
      callStack.left.click();
      const indexOfField = computerMoveHelpers.getFieldIndex(callStack.left, fields);
      if (computerMoveHelpers.checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
        computerMoveHelpers.changeShipPosition('horizontal');
        computerMoveHelpers.resetCallStack();
      }
      delete callStack.left;
    } else if (callStack.hasOwnProperty('up')) {
      callStack.up.click();
      const indexOfField = computerMoveHelpers.getFieldIndex(callStack.up, fields);
      if (computerMoveHelpers.checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
        computerMoveHelpers.changeShipPosition('vertical');
        computerMoveHelpers.resetCallStack();
      }
      delete callStack.up;
    } else if (callStack.hasOwnProperty('down')) {
      callStack.down.click();
      const indexOfField = computerMoveHelpers.getFieldIndex(callStack.down, fields);
      if (computerMoveHelpers.checkIfShipHitAndNotSunk(indexOfField, gameboardArray)) {
        computerMoveHelpers.changeShipPosition('vertical');
        computerMoveHelpers.resetCallStack();
      }
      delete callStack.down;
    }
  }
};

// function isNotShotAlready(field) {
//   if (!field.disabled) {
//     return field;
//   }
// }

// function getRandom(list) {
//   return list[Math.floor(Math.random() * list.length)];
// }

function randomShipPlacement(computerGameboard) {
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  for (let i = 0; i < ships.length; i++) {
    let coords;
    if (shipPlacementHelpers.randomizeShipPosition() === 'horizontal') {
      coords = shipPlacementHelpers.getRandomCoords(ships[i], 'horizontal', computerGameboard);
    } else {
      coords = shipPlacementHelpers.getRandomCoords(ships[i], 'vertical', computerGameboard);
    }
    computerGameboard.placeNewShip(coords);
  }
}

// function getRandomCoords(shipLength, position, gameboard) {
//   const coords = [];

//   if (position === 'horizontal') {
//     //   100 - shipLength makes it so ship cannot go over 100th field
//     let firstCoord =
//       Math.floor(Math.random() * (100 - shipLength - 0 + 1)) + 0;
//     //   make sure that ships dont stack over each other
//     while (
//       checkIfCoordsHaveShip(firstCoord, gameboard, shipLength, position) ===
//       true
//     ) {
//       firstCoord =
//         Math.floor(Math.random() * (100 - shipLength * 10 - 0 + 1)) + 0;
//     }
//     coords.push(firstCoord);
//     // add next coord horizontally for each corresponding ship space
//     for (let j = 1; j < shipLength; j++) {
//       const nextCoord = coords[coords.length - 1] + 1;
//       coords.push(nextCoord);
//     }
//   } else {
//     //   100 - shipLength * 10 makes it so ship cannot go over 100th field
//     let firstCoord =
//       Math.floor(Math.random() * (100 - shipLength * 10 - 0 + 1)) + 0;
//     //   make sure that ships dont stack over each other
//     while (
//       checkIfCoordsHaveShip(firstCoord, gameboard, shipLength, position) ===
//       true
//     ) {
//       firstCoord =
//         Math.floor(Math.random() * (100 - shipLength * 10 - 0 + 1)) + 0;
//     }
//     coords.push(firstCoord);
//     // add next coord vertically for each corresponding ship space
//     for (let j = 1; j < shipLength; j++) {
//       const nextCoord = coords[coords.length - 1] + 10;
//       coords.push(nextCoord);
//     }
//   }
//   return coords;
// }
// function randomizeShipPosition() {
//     // random 0 or 1
//   const newNumber = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
//   if (newNumber === 0) {
//     return 'horizontal';
//   }
//   return 'vertical';
// }

// // checks if coords that you want to place ship on don't already have a ship
// function checkIfCoordsHaveShip(firstCoord, gameboard, shipLength, position) {
//   const gameboardArray = gameboard.getGameboard();
//   let firstCoordCopy = firstCoord.valueOf();
//   if (gameboardArray[firstCoordCopy].hasShip === true) {
//     return true;
//   }
//   if (position === 'horizontal') {
//     for (let i = 1; i < shipLength; i++) {
//       firstCoordCopy += 1;
//       if (gameboardArray[firstCoordCopy].hasShip === true) {
//         return true;
//       }
//     }
//   } else {
//     for (let i = 1; i < shipLength; i++) {
//       firstCoordCopy += 10;
//       if (gameboardArray[firstCoordCopy].hasShip === true) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

export {
  computerMove,
  randomShipPlacement,
};
