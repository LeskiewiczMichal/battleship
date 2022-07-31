import { gameInit, getComputer, getPlayerOne } from './game';

// bind start button to event and make it dissapear
const bindStart = () => {
  const startButton = document.querySelector('#startGame');
  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameInit();
    const player = getPlayerOne();
    const playerGameboard = player.gameboard;
    const computer = getComputer();
    console.log(playerGameboard);
    const computerGameboard = computer.gameboard;
    renderGameboard(playerGameboard, 'player');
    renderGameboard(computerGameboard, 'computer');
    changePlayerMove('player');
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
  const playerButtons = document.querySelectorAll('[data-player="player"]');
  const computerButtons = document.querySelectorAll('[data-player="computer"]');

  if (player === 'player') {
    playerButtons.forEach((field) => {
      field.disabled = true;
    });
    computerButtons.forEach((field) => {
      if (field['data-isshot'] !== true) {
        field.disabled = false;
      }
    });
  } else {
    playerButtons.forEach((field) => {
      field.disabled = false;
    });
    computerButtons.forEach((field) => {
      if (field['data-isshot'] !== true) {
        field.disabled = true;
      }
    });
  }
}

function displayPlayerNames() {
    // const nameDisplay = document.createElement('div');
    // nameDisplay = 

}


export { bindStart };
