// TODO AFTER HIT TRY SIMILAR COORDS

// Number of tried fields around hit ship
const numOfTries = {
  firstTry: false,
  secondTry: false,
  thirdTry: false,
};

function countTry() {
  if (numOfTries.firstTry === true && numOfTries.secondTry === true) {
    numOfTries.thirdTry = true;
  } else if (numOfTries.firstTry === true && numOfTries.secondTry === false) {
    numOfTries.secondTry = true;
  } else if (numOfTries.firstTry === false) {
    numOfTries.firstTry = true;
  }
}

function getNumOfTries() {
  return numOfTries;
}

function resetNumOfTries() {
  numOfTries.firstTry = false;
  numOfTries.secondTry = false;
  numOfTries.thirdTry = false;
}
// FIELDCHOSEN USED FOR NEXT MOVE IF SHIP WAS HIT
let fieldChosen = null;

function setFieldChosen(allFields, indexOfLastField, indexToCheckNext) {
  const nextFieldIndex = indexOfLastField + indexToCheckNext;
  fieldChosen = allFields[nextFieldIndex];
}

function setFieldChosenNull() {
  fieldChosen = null;
}

function getFieldChosen() {
  return fieldChosen;
}

// FIRST FIELD WITH SHIP ON IT PARAM; CHECK IF THE SHIP IS SUNK AND IF NOT TRY OTHER FIELDS
let firstHitParam = null;

function setFirstHitParam(index) {
  firstHitParam = index;
}

function getFirstHitParam() {
  return firstHitParam;
}

const randomAttack = (playerFields, gameboardArray) => {
  const fields = [...playerFields];
  let indexOfField;

  if (getFieldChosen() === null) {
    const fielteredFields = fields.filter(isNotShotAlready);
    const randomField = getRandom(fielteredFields);
    randomField.click();
    //   search for index in fields,
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === randomField) {
        indexOfField = i;
      }
    }
    if (
      gameboardArray[indexOfField].hasShip === true &&
      gameboardArray[indexOfField].shipSunk === false
    ) {
      setFirstHitParam(indexOfField);
      setFieldChosen(fields, indexOfField, 1);
    } else {
      setFieldChosenNull();
    }
  } else {
    // clicks chosen field
    const field = getFieldChosen();
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === field) {
        indexOfField = i;
      }
    }
    field.click();

    if (
      gameboardArray[indexOfField].hasShip === true &&
      gameboardArray[indexOfField].shipSunk === false
    ) {
      setFieldChosen(fields, indexOfField, 1);
    } else if (
      gameboardArray[indexOfField].hasShip === true &&
      gameboardArray[indexOfField].shipSunk === true
    ) {
      setFieldChosenNull();
    } else {
      const numOfTries = getNumOfTries();
      const firstHitIndex = getFirstHitParam();
      if (numOfTries.thirdTry === true) {
        setFieldChosenNull();
        setFirstHitParam(null);
        resetNumOfTries();
      } else if (
        numOfTries.thirdTry === false &&
        numOfTries.secondTry === true
      ) {
        setFieldChosen(fields, firstHitIndex, -1);
        countTry();
      } else if (
        numOfTries.secondTry === false &&
        numOfTries.firstTry === true
      ) {
        setFieldChosen(fields, firstHitIndex, 10);
        countTry();
      } else if (numOfTries.firstTry === false) {
        setFieldChosen(fields, firstHitIndex, -10);
        countTry();
      }
    }
  }
  // if gameboardArray[indexOfField] hasShip: true, isSunk: false set nearby field for use
  //   if (
  //     gameboardArray[indexOfField].hasShip === true &&
  //     gameboardArray[indexOfField].shipSunk === false
  //   ) {
  //     setFieldChosen(fields, indexOfField, 1);
  //   } else {
  //     setFieldChosenNull();
  //   }
};

function isNotShotAlready(field) {
  if (!field.disabled) {
    return field;
  }
}

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export { randomAttack };
