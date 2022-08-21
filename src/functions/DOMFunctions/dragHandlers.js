import { getPlayerOne } from '../game';
import { bindShipsClickFunctionality } from './changeShipPosition';
import { checkIfShipBreaksLine } from './checkIfShipBreaksLine';
import * as index from '../indexActions';

let currentDrag;

function dragoOverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

// make user see where they are placing ships
function changeColors(e) {
  const container = document.querySelector('#drag-ships').children;

  //   find current mouseover target, needed to set style of found element later
  let indexOfTarget = index.find(container, e.target);

  //   select length of ship elements from container
  let abortFunction = false;
  let indexOfTargetCopy = indexOfTarget.valueOf();
  const indexOriginal = indexOfTargetCopy.valueOf();

  for (let i = 0; i < currentDrag.children.length; i++) {
    // if already taken or shot abort function
    if (container[indexOfTargetCopy].className === 'disabled') {
      abortFunction = true;
    }
    indexOfTargetCopy = index.update(currentDrag, indexOfTargetCopy);
    // if horizontal check if ship doesn't brake the line when placing it
    if (
      currentDrag.classList.contains('horizontal') &&
      abortFunction === false
    ) {
      abortFunction = checkIfShipBreaksLine(indexOriginal, indexOfTargetCopy);
    }
  }
  if (abortFunction === true) {
    return;
  }

  //   select elements based on ships length from container
  //   and change their color
  for (let i = 0; i < currentDrag.children.length; i++) {
    container[indexOfTarget].className = 'space red';
    indexOfTarget = index.update(currentDrag, indexOfTarget);
  }
}

function dragLeave(e) {
  const container = document.querySelector('#drag-ships').children;
  //   find current mouseover target index
  let indexOfTarget = index.find(container, e.target);

  //   select as many elements from container as ship length and change their class back to default
  for (let i = 0; i < currentDrag.children.length; i++) {
    if (container[indexOfTarget].className !== 'disabled') {
      container[indexOfTarget].className = 'space';
    }
    indexOfTarget = index.update(currentDrag, indexOfTarget);
  }
}

function drop(e) {
  e.preventDefault();

  //   DECLARE VALUES
  //   get target element
  const data = e.dataTransfer.getData('text');
  const ship = document.getElementsByClassName(`${data}`)[0];
  //   get children of ship target element
  const shipChildren = ship.children;
  const shipElements = [...shipChildren];
  //   right now only horizontal
  const dragSelector = document.querySelector('#drag-ships').children;
  const spaces = [...dragSelector];
  //   needed later to select elements
  let indexOfSpace = index.find(spaces, e.target);
  let indexOfSpaceCopy = indexOfSpace.valueOf();
  //   if fields are occupide this is used to abort later
  let abortFunction = false;

  //   if a field that you dragged the ship over is already red abort function later
  shipElements.forEach(() => {
    // this forEach depends on changeColor to work
    if (!spaces[indexOfSpaceCopy].classList.contains('red')) {
      abortFunction = true;
    }
    indexOfSpaceCopy = index.update(ship, indexOfSpaceCopy);
  });

  if (abortFunction === true) {
    // change colors back
    shipElements.forEach(() => {
      // don't change spaces already occupied by other ships
      if (spaces[indexOfSpace].className === 'disabled') {
        return;
      }
      //   return to default 'space' className
      spaces[indexOfSpace].className = 'space';
      //   gets next space in next forEach loop
      indexOfSpace = index.update(ship, indexOfSpace);
    });
    // abort fuction
    return;
  }

  //   used in placeNewShip function to pass ship coordinates
  const coordinates = [];
  //   appends ship child element to place on gameboard and saves coordinates for it
  //   makes field disabled for further use
  //   indexupdate is used to get next field in next foreach round
  shipElements.forEach((element) => {
    coordinates.push(indexOfSpace);
    spaces[indexOfSpace].appendChild(element);
    spaces[indexOfSpace].className = 'disabled';
    indexOfSpace = index.update(ship, indexOfSpace);
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
