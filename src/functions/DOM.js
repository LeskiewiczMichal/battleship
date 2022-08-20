import { getComputer, getPlayerOne } from './game';
import {
  disableFields,
  enableFields,
} from './DOMFunctions/disableAndAnableFields';
import { computerMove } from './AI';

// bind start button to event and make it dissapear after click
// game init creates players and places ships
// makes reset button visible
// renders everything
const bindStart = () => {
  const startButton = document.querySelector('#startGame');
  startButton.addEventListener('click', () => {
    startButton.remove();
    document.querySelector('#ships-selection').remove();
    document.querySelector('#resetBtn').style.display = 'block';
    const player = getPlayerOne();
    const playerGameboard = player.gameboard;
    const computer = getComputer();
    const computerGameboard = computer.gameboard;
    renderGame(playerGameboard, computerGameboard);
  });
};

function renderGame(playerGameboard, computerGameboard) {
  renderGameboard(playerGameboard);
  renderGameboard(computerGameboard);
  changePlayerMove(playerGameboard);
  displayPlayerNames(playerGameboard, computerGameboard);
}

function renderGameboard(gameboard) {
  const newGameboard = document.createElement('div');
  if (gameboard.getPlayerName() === 'player') {
    newGameboard.setAttribute('data-belongs-to', 'player');
  } else {
    newGameboard.setAttribute('data-belongs-to', 'computer');
  }
  newGameboard.classList = 'gameboard';
  createField(gameboard, newGameboard);
  document.querySelector('#boards').appendChild(newGameboard);
}

// creates field for every element in gameboard array;
function createField(gameboard, newGameboard) {
  const gameboardArray = gameboard.getGameboard();
  //   console.log(gameboardArray)
  for (let i = 0; i < gameboardArray.length; i++) {
    const field = document.createElement('button');
    field.classList = 'field';
    // on click fires receiveAttack function,
    // changes shot fields color to darker,
    // if shot field has ship in it changes the color to red to indicate that it was shot,
    // disables field
    // changes move to next player
    // checks if player has any ships left, if not fires endGameScreen to show results
    field.addEventListener('click', () => {
      gameboard.receiveAttack(i);
      if (gameboardArray[i].hasShip === true) {
        field.style.backgroundColor = 'rgb(223, 84, 84)';
      } else {
        field.style.backgroundColor = 'rgb(78, 77, 77)';
      }
      for (let i = 0; i < gameboardArray.length; i++) {
        if (gameboardArray[i].shipSunk === true) {
          const newGameboardChildren = newGameboard.children;
          newGameboardChildren[i].style.backgroundColor = 'black';
        }
      }
      field.disabled = true;
      changePlayerMove(gameboard);
      if (gameboard.getPlayerName() === 'Computer') {
        const playerGameboardRendered = document.querySelector(
          '[data-belongs-to="player"]'
        ).childNodes;
        computerMove(
          playerGameboardRendered,
          getPlayerOne().gameboard.getGameboard()
        );
      }
      const ships = gameboard.getShips();
      if (gameboard.checkForShipsLeft(ships) === true) {
        endGameScreen(gameboard);
      }
    });

    newGameboard.appendChild(field);
  }
}

// takes player and diasbles his buttons, enabling enemy buttons
// displays who's move is right now
function changePlayerMove(gameboard) {
  const displayMove = document.querySelector('.display');
  if (gameboard.getPlayerName() === 'player') {
    displayMove.innerText = 'Your move';
    disableFields('player');
    enableFields('computer');
  } else {
    displayMove.innerText = "Computer's move";
    disableFields('computer');
    enableFields('player');
  }
}

// displays player names under gameboards
function displayPlayerNames(gameboardOne, gameboardTwo) {
  const nameDisplay = document.createElement('div');
  nameDisplay.classList = 'namesDisplay';
  const playerOne = document.createElement('p');
  const playerTwo = document.createElement('p');
  playerOne.innerText = gameboardOne.getPlayerName();
  playerTwo.innerText = gameboardTwo.getPlayerName();
  playerOne.classList = 'playerName';
  playerTwo.classList = 'playerName';
  nameDisplay.appendChild(playerOne);
  nameDisplay.appendChild(playerTwo);
  document.querySelector('.wrapper').appendChild(nameDisplay);
}

// displays who won, disables all field buttons
function endGameScreen(gameboard) {
  const display = document.querySelector('.display');
  disableFields('player');
  disableFields('computer');
  if (gameboard.getPlayerName() === 'player') {
    display.innerText = 'Computer Won';
  } else {
    display.innerText = 'Player Won';
  }
}

function renderShipsSelection() {
  const template = document.querySelector('#ships-selection-template');
  const templateClone = template.content.cloneNode(true);
  const wrapper = document.querySelector('.wrapper');
  wrapper.insertBefore(templateClone, wrapper.firstChild);
}

function renderWrapper() {
    const template = document.querySelector('#wrapper-template');
    const templateClone = template.content.cloneNode(true);
    document.querySelector('body').appendChild(templateClone)
}
 
export { bindStart, renderGame, renderShipsSelection, renderWrapper };
