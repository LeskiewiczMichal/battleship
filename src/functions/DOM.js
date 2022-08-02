import { gameInit, getComputer, getPlayerOne } from './game';
import { disableFields, enableFields } from './DOMFunctions/disableAndAnableFields';

// bind start button to event and make it dissapear after click
const bindStart = () => {
  const startButton = document.querySelector('#startGame');
  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameInit();
    document.querySelector('#resetBtn').style.display = 'block';
    const player = getPlayerOne();
    const playerGameboard = player.gameboard;
    const computer = getComputer();
    console.log(playerGameboard);
    const computerGameboard = computer.gameboard;
    renderGameboard(playerGameboard, 'player');
    renderGameboard(computerGameboard, 'computer');
    changePlayerMove('player');
    displayPlayerNames('Player', 'Computer');

  });
};

function renderGameboard(gameboard, player) {
  const newGameboard = document.createElement('div');
  if (player === 'player') {
    newGameboard.setAttribute('data-belongs-to', 'player');
  } else {
    newGameboard.setAttribute('data-belongs-to', 'computer');
  }
  newGameboard.classList = 'gameboard';
  for (let i = 0; i < gameboard.getGameboard().length; i++) {
    const field = document.createElement('button');
    if (gameboard.getGameboard()[i].hasShip === true) {
      field.setAttribute('data-hasShip', 'true');
    }
    if (player === 'player') {
      field.setAttribute('data-player', 'player');
    } else {
      field.setAttribute('data-player', 'computer');
    }
    field.setAttribute('data-isShot', 'false');
    field.classList = 'field';
    field.addEventListener('click', () => {
      if (gameboard.getGameboard()[i].hasShip === true) {
        field.style.backgroundColor = 'rgb(223, 84, 84)';
      } else {
        field.style.backgroundColor = 'rgb(78, 77, 77)';
      }

      field.disabled = true;
      field.setAttribute('data-isShot', 'true');
      gameboard.receiveAttack(i);
      if (player === 'player') {
        changePlayerMove('player');
      } else {
        changePlayerMove('computer');
      }
      const ships = gameboard.getShips();
      if (gameboard.checkForShipsLeft(ships) === true) {
        alert('end game');
      }
    });
    newGameboard.appendChild(field);
  }
  document.querySelector('#boards').appendChild(newGameboard);
}

function changePlayerMove(player) {
//   const playerButtons = document.querySelectorAll('[data-player="player"]');
//   const computerButtons = document.querySelectorAll('[data-player="computer"]');
  const displayMove = document.querySelector('.display');

  if (player === 'player') {
    displayMove.innerText = 'Your move';
    disableFields('player');
    enableFields('computer')
  } else {
    displayMove.innerText = "Computer's move";
    disableFields('computer');
    enableFields('player');
}
}

function displayPlayerNames(nameOne, nameTwo) {
  const nameDisplay = document.createElement('div');
  nameDisplay.classList = 'namesDisplay';
  const playerOne = document.createElement('p');
  const playerTwo = document.createElement('p');
  playerOne.innerText = nameOne;
  playerTwo.innerText = nameTwo;
  playerOne.classList = 'playerName';
  playerTwo.classList = 'playerName';
  nameDisplay.appendChild(playerOne);
  nameDisplay.appendChild(playerTwo);
  document.querySelector('.wrapper').appendChild(nameDisplay);
}

function endGameScreen(gameboard) {
    const display = document.querySelector('.display');
    disableFields('player');
    disableFields('computer');
if (gameboard.getPlayerName() === 'player') {
    display.innerText = 'Player Won';
} else {
    display.innerText = 'Computer Won';
};

}


export { bindStart, renderGameboard, changePlayerMove, displayPlayerNames }
