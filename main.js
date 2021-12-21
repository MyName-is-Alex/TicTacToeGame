//select game status
const statusDisplay = document.querySelector('.game--status');

//variable used to track the game state throught the game.

let gameActive = true;
let gameOption = true;
let currentPlayer = 'X';

let gameState = '';
function gameStateOption() {
  if (gameOption) {
    gameState = ['', '', '', '', '', '', '', '', ''];
  } else {
    gameState = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ];
  }
}
gameStateOption();
//here we declare some messages that will be displayed durring the game

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn..`;

statusDisplay.innerHTML = currentPlayerTurn();

const handleCellPlayed = function (clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};

const handlePlayerChange = function () {
  currentPlayer = currentPlayer === 'X' ? '0' : 'X';
  statusDisplay.innerHTML = currentPlayerTurn();
};

let winningConditions;

const handleResultValidation = function () {
  if (gameOption) {
    winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let roundWon = false;
    for (i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      gameActive = false;
      statusDisplay.innerHTML = winningMessage();
      return;
    }
    let roundDraw = !gameState.includes('');
    if (roundDraw) {
      gameActive = false;
      statusDisplay.innerHTML = drawMessage();
      return;
    }
    handlePlayerChange();
  } else {
    winningConditions = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];

    let roundWon = false;
    for (i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      let d = gameState[winCondition[3]];
      if (a === '' || b === '' || c === '' || d === '') {
        continue;
      }
      if (a === b && b === c && c === d) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      gameActive = false;
      statusDisplay.innerHTML = winningMessage();
      return;
    }
    let roundDraw = !gameState.includes('');
    if (roundDraw) {
      gameActive = false;
      statusDisplay.innerHTML = drawMessage();
      return;
    }
    handlePlayerChange();
  }
};

const handleCellClick = function (clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

const handleRestartGame = function () {
  gameActive = true;
  gameStateOption();
  currentPlayer = 'X';
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => (cell.innerHTML = ''));
};

function option3x3() {
  const container = document.querySelector('.game--container');
  container.style.gridTemplateColumns = 'repeat(3, auto)';
  container.style.width = '304px';
  const cells = document.querySelectorAll('.cell2');
  cells.forEach(cell => {
    cell.style.opacity = '0';
    cell.style.position = 'absolute';
    cell.style.zIndex = '-1';
  });
  gameOption = true;
  handleRestartGame();
}

function option4x4() {
  const container = document.querySelector('.game--container');
  container.style.gridTemplateColumns = 'repeat(4, auto)';
  container.style.width = '406px';
  const cells = document.querySelectorAll('.cell2');
  cells.forEach(cell => {
    cell.style.opacity = '1.0';
    cell.style.position = 'relative';
    cell.style.zIndex = '1';
  });
  gameOption = false;
  handleRestartGame();
}

document
  .querySelectorAll('.cell')
  .forEach(cell => cell.addEventListener('click', handleCellClick));
document
  .querySelector('.game--restart')
  .addEventListener('click', handleRestartGame);
