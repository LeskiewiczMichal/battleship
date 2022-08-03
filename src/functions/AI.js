const randomAttack = (playerFields) => {
  const fields = [...playerFields];
  const fielteredFields = fields.filter(isNotShotAlready);
  const randomField = getRandom(fielteredFields);
  randomField.click();
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
