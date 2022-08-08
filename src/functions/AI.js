// TODO AFTER HIT TRY SIMILAR COORDS
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
  } else {
    const field = getFieldChosen();
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === field) {
        indexOfField = i;
      }
    }
    field.click();
  }
  // if gameboardArray[indexOfField] hasShip: true, isSunk: false set nearby field for use
  if (
    gameboardArray[indexOfField].hasShip === true &&
    gameboardArray[indexOfField].shipSunk === false
  ) {
    setFieldChosen(fields, indexOfField, 1);
  } else {
    setFieldChosenNull();
  }
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
