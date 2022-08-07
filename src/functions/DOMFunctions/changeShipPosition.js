function changeShipsPosition(e) {
    console.log(e.target.parentElement)
  const ship = e.target.parentElement;
  if (ship.classList.contains('horizontal')) {
    ship.classList.remove('horizontal');
    ship.classList.add('vertical');
  } else {
    ship.classList.remove('vertical');
    ship.classList.add('horizontal');
  }
}

const bindShipsClickFunctionality = (ships) => {
  ships.forEach((ship) => {
    ship.addEventListener('click', (e) => {
      changeShipsPosition(e);
    });
  });
};

export { bindShipsClickFunctionality };
