import { Gameboard } from './functions/gameBoardFactory';
import { bindStart } from './functions/DOM';
import { bindResetButton } from './functions/DOMFunctions/resetButton';
import './style/style.css';
import { gameInit, getPlayerOne } from './functions/game';
import { dragHandlersInit } from './functions/DOMFunctions/dragHandlers';

// const gameLoop =

bindStart();
bindResetButton();
gameInit();
dragHandlersInit();

// const biggestship = document.querySelector('.biggest');
// const emptySpaces = document.querySelectorAll('.space');

// let currentDrag;

// function dragoOverHandler(e) {
//   e.preventDefault();
//   e.dataTransfer.dropEffect = 'move';
//   //   e.target.style.backgroundColor = 'black'
// }

// // make user see where they are placing ships
// function changeColors(e) {
// //   e.preventDefault();
//   const container = document.querySelector('#drag-ships').children;
// //   needed to set style of found element later
//   let indexOfTarget;
// //   find current mouseover target
//   for (let i = 0; i < container.length; i++) {
//     if (container[i] === e.target) {
//       console.log(container[i]);
//       indexOfTarget = i;
//     }
//   }

// //   select length of ship elements from container
//   for (let i = 0; i < currentDrag.children.length; i++) {
//     container[indexOfTarget + i].className = 'space red';
//   }
// }

// function dragLeave(e) {
// //   e.preventDefault();
// const container = document.querySelector('#drag-ships').children;
// //   needed to set style of found element later
//   let indexOfTarget;
// //   find current mouseover target
//   for (let i = 0; i < container.length; i++) {
//     if (container[i] === e.target) {
//       console.log(container[i]);
//       indexOfTarget = i;
//     }
//   }

// //   select length of ship elements from container
//   for (let i = 0; i < currentDrag.children.length; i++) {
//     // CHANGE CLASSNAME !!!!!!!!!!!!!!!!!!!
//     container[indexOfTarget + i].className = 'space';
//   }
// }

// function drag(e) {
//   // if (e.target.className === 'ship biggest') {

//   // }
//   e.dataTransfer.effectAllowed = 'move';
//   // e.dataTransfer.setData("text", e.target.id);
// }

// function drop(e) {
//   e.preventDefault();
//   const data = e.dataTransfer.getData('text');
//   const shipChildren = document.getElementById(data).children;
//   const shipElements = [...shipChildren];
//   //   right now only horizontal
//   const dragSelector = document.querySelector('#drag-ships').children;
//   const spaces = [...dragSelector];
//   let indexOfSpace;
//   for (let i = 0; i < spaces.length; i++) {
//     if (spaces[i] === e.target) {
//       indexOfSpace = i;
//       // spaces[i].appendChild(shipElements[0])
//       // spaces[i + 1].appendChild(shipElements[1]);
//     }
//   }

//   //   needed for forEach to select good first element
//   indexOfSpace -= 1;

//   //   needed to place new ships
//   let coordinates = [];

//   //   console.log(indexOfSpace);
//   shipElements.forEach((element) => {
//     indexOfSpace += 1;
//     coordinates.push(indexOfSpace);
//     spaces[indexOfSpace].appendChild(element);
//     // spaces[indexOfSpace].className = ''
//   });

//   //   place new ships on gameboard
//   const player = getPlayerOne();
//   const playerGameboard = player.gameboard;
//   playerGameboard.placeNewShip(coordinates);

//   //   for (let i = 0; i < shipElements; i++) {
//   //     indexofSpace += i;
//   //     console.log(indexOfSpace)
//   //     spaces[indexOfSpace].appendChild(shipElements[i]);
//   //   }
//   //   for (let i = 1; i < shipElements.length; i++) {
//   //     console.log(e.target.nextSibling)
//   //   }

//   //   for each child of ship select one e.target
// }

// function dragStart(e) {
//   // e.preventDefault();
//   e.dataTransfer.setData('text', e.target.id);
//   currentDrag = e.target;
// }

// biggestship.addEventListener('drag', (e) => {
//   drag(e);
// });
// biggestship.addEventListener('dragstart', (e) => {
//   dragStart(e);
// });
// emptySpaces.forEach((element) => {
//   element.addEventListener('dragover', (e) => {
//     dragoOverHandler(e);
//     changeColors(e)
//   });
// //   element.addEventListener('dragenter', (e) => {
// //     // e.target.style.backgroundColor = 'blue'
// //     dragEnter(e);
// //   });
//   element.addEventListener('dragleave', (e) => {
//     dragLeave(e);
//   });
//   element.addEventListener('drop', (e) => {
//     drop(e);
//   });
// });
