import { shipPlacementHelpers, computerMoveHelpers } from './AIHelpers';

const computerMove = (playerFields, gameboardArray) => {
  // DECLARE VARIABLES
  // fields from gameboard
  const fields = [...playerFields];
  let indexOfField;
  //   if first if statements fire this changes to true so last if statement won't fire
  let flagIfStatements = false;

  //   if position of ship chosen and ship not sunk
  if (
    computerMoveHelpers.getShipPosition() &&
    gameboardArray[computerMoveHelpers.getFirstHitParam()].shipSunk === false
  ) {
    flagIfStatements = true;
    if (!computerMoveHelpers.callstack.isEmpty()) {
      computerMoveHelpers.callstack.shootAll();
    } else if (computerMoveHelpers.getShipPosition() === 'horizontal') {
      computerMoveHelpers.callstack.createHorizontal(fields);
      computerMoveHelpers.callstack.shootAll();
    } else {
      computerMoveHelpers.callstack.createVertical(fields);
      computerMoveHelpers.callstack.shootAll();
    }
  }
  //   if attacked ship was sunk reset call stack and null ship position
  else if (
    computerMoveHelpers.getShipPosition() &&
    gameboardArray[computerMoveHelpers.getFirstHitParam()].shipSunk === true
  ) {
    computerMoveHelpers.callstack.reset();
    computerMoveHelpers.changeShipPosition(null);
  }

  // if no field chosen in callstack attack random field
  if (computerMoveHelpers.callstack.isEmpty() && !flagIfStatements) {
    computerMoveHelpers.randomField.attack(fields);
    indexOfField = computerMoveHelpers.randomField.findIndex(fields);
    // if field chosen has ship but ship is not sunk already
    if (
      computerMoveHelpers.checkIfShipHitAndNotSunk(indexOfField, gameboardArray)
    ) {
      // create call stack
      computerMoveHelpers.setFirstHitParam(indexOfField);
      computerMoveHelpers.callstack.createFirstHit(fields);
    } else {
      computerMoveHelpers.setFirstHitParam(null);
      computerMoveHelpers.callstack.reset();
    }
  } else if (!computerMoveHelpers.callstack.isEmpty() && !flagIfStatements) {
    // attack each property and remove it untill one hits the ship
    // if it does hit, set relative ship position and reset call stack
    // for further attacking
    const callStack = computerMoveHelpers.callstack.get();
    computerMoveHelpers.callstack.shootToCheckPosition(
      callStack,
      fields,
      gameboardArray
    );
  }
};

// for each ship length randomizes first coord
// and adds missing ones, places new ship on those coords
function randomShipPlacement(computerGameboard) {
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  for (let i = 0; i < ships.length; i++) {
    let coords;
    if (shipPlacementHelpers.randomizeShipPosition() === 'horizontal') {
      coords = shipPlacementHelpers.getRandomCoords(
        ships[i],
        'horizontal',
        computerGameboard
      );
    } else {
      coords = shipPlacementHelpers.getRandomCoords(
        ships[i],
        'vertical',
        computerGameboard
      );
    }
    computerGameboard.placeNewShip(coords);
  }
}

export { computerMove, randomShipPlacement };
