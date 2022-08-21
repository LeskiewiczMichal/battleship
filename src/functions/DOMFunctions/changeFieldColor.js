const changeFieldColor = (field, gameboardArray, i, newGameboard) => {
  if (gameboardArray[i].hasShip === true) {
    field.style.backgroundColor = 'rgb(223, 84, 84)';
  } else {
    field.style.backgroundColor = 'rgb(78, 77, 77)';
  }

  //   changes color if ship was sunk
  for (let i = 0; i < gameboardArray.length; i++) {
    if (gameboardArray[i].shipSunk === true) {
      newGameboard.children[i].style.backgroundColor = 'black';
    }
  }
};

export { changeFieldColor };
