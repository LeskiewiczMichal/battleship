// TODO
//  CANNOT SET SHIP IF NOT IN ONE LINE IN GAMEBOARD
// SHIPS CANNOT WRAP
// 
import { getPlayerOne } from '../game';
import { bindShipsClickFunctionality } from './changeShipPosition';

// const biggestship = document.querySelector('.biggest');
// const emptySpaces = document.querySelectorAll('.space');
let currentDrag;

function dragoOverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  //   e.target.style.backgroundColor = 'black'
}

// make user see where they are placing ships
function changeColors(e) {
  const container = document.querySelector('#drag-ships').children;

  //   needed to set style of found element later
  let indexOfTarget;

  //   find current mouseover target
  for (let i = 0; i < container.length; i++) {
    if (container[i] === e.target) {
      indexOfTarget = i;
    }
  }

  //   select length of ship elements from container
  let abortFunction = false;
  let indexOfTargetCopy = indexOfTarget.valueOf();
  for (let i = 0; i < currentDrag.children.length; i++) {
    if (container[indexOfTargetCopy].className === 'disabled') {
      abortFunction = true;
    }
    if (currentDrag.classList.contains('horizontal')) {
      indexOfTargetCopy += 1;
    } else {
      indexOfTargetCopy += 10;
    }
  }
  if (abortFunction === true) {
    return;
  }

  //   select elements based on ships length from container
//   and change their color
  for (let i = 0; i < currentDrag.children.length; i++) {
    // if (container[indexOfTarget].className !== 'disabled') {
      container[indexOfTarget].className = 'space red';
    // }
    if (currentDrag.classList.contains('horizontal')) {
      indexOfTarget += 1;
    } else {
      indexOfTarget += 10;
    }
  }
  // } else {

  // }
}

function dragLeave(e) {
  //   e.preventDefault();
  const container = document.querySelector('#drag-ships').children;
  //   needed to set style of found element later
  let indexOfTarget;
  //   find current mouseover target
  for (let i = 0; i < container.length; i++) {
    if (container[i] === e.target) {
      indexOfTarget = i;
    }
  }

  //   select length of ship elements from container
  for (let i = 0; i < currentDrag.children.length; i++) {
    if (container[indexOfTarget].className !== 'disabled') {
      container[indexOfTarget].className = 'space';
    }
    if (currentDrag.classList.contains('horizontal')) {
      indexOfTarget += 1;
    } else {
      indexOfTarget += 10;
    }
  }
}

function drop(e) {
  e.preventDefault();

  //   get target element
  const data = e.dataTransfer.getData('text');
  const ship = document.getElementsByClassName(`${data}`)[0];

  //   get children of ship target element
  const shipChildren = ship.children;
  const shipElements = [...shipChildren];

  //   right now only horizontal
  const dragSelector = document.querySelector('#drag-ships').children;
  const spaces = [...dragSelector];

  //   needed for forEach later to select elements
  let indexOfSpace;
  for (let i = 0; i < spaces.length; i++) {
    if (spaces[i] === e.target) {
      indexOfSpace = i;
    }
  }

  let indexOfSpaceCopy = indexOfSpace.valueOf();
  //   if fields are occupides this is used to abort later
  let abortFunction = false;

  shipElements.forEach(() => {
    //   indexOfSpaceCopy += 1;
    if (spaces[indexOfSpaceCopy].firstChild) {
      abortFunction = true;
    }
    if (ship.classList.contains('horizontal')) {
      indexOfSpaceCopy += 1;
    } else {
      indexOfSpaceCopy += 10;
    }
  });

  if (abortFunction === true) {
    // change colors back
    shipElements.forEach(() => {
      // indexOfSpace += 1;
      if (spaces[indexOfSpace].className === 'disabled') {
        return;
      }
      spaces[indexOfSpace].className = 'space';

      if (ship.classList.contains('horizontal')) {
        indexOfSpace += 1;
      } else {
        indexOfSpace += 10;
      }
    });
    // abort fuction
    return;
  }

  //   used in placeNewShip function to pass ship coordinates
  const coordinates = [];

  //   pushes appends ship child element to place on gameboard and adds coordinates for it
  shipElements.forEach((element) => {
    //   indexOfSpace += 1;
    coordinates.push(indexOfSpace);
    spaces[indexOfSpace].appendChild(element);
    spaces[indexOfSpace].className = 'disabled';
    if (ship.classList.contains('horizontal')) {
      indexOfSpace += 1;
    } else {
      indexOfSpace += 10;
    }
  });

  //   place new ships on gameboard
  const player = getPlayerOne();
  const playerGameboard = player.gameboard;
  playerGameboard.placeNewShip(coordinates);
}

function getTarget(e) {
  e.dataTransfer.setData('text', e.target.className);
  currentDrag = e.target;
}

const dragHandlersInit = () => {
  // get from DOM
  const emptySpaces = document.querySelectorAll('.space');
  const ships = document.querySelectorAll('.ship');

  //   needed to change between vertical and horizontal position onclick
  bindShipsClickFunctionality(ships);

  ships.forEach((ship) => {
    ship.addEventListener('dragstart', (e) => {
      getTarget(e);
    });
  });
  emptySpaces.forEach((element) => {
    element.addEventListener('dragover', (e) => {
      dragoOverHandler(e);
      changeColors(e);
    });
    element.addEventListener('dragleave', (e) => {
      dragLeave(e);
    });
    element.addEventListener('drop', (e) => {
      drop(e);
    });
  });
};

export { dragHandlersInit };
