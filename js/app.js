(() => { // IIFE

  "use strict";

  // Globals
  const startScreen = document.getElementById("start"),
    button = document.querySelector(".button"),
    boardScreen = document.getElementById("board"),
    finishScreen = document.getElementById("finish"),
    squares = document.querySelector(".boxes"),
    square = document.querySelector(".boxes > .box"),
    o = "url(img/o.svg)",
    x = "url(img/x.svg)";
  // Locals
  let player1 = document.getElementById("player1"),
    player2 = document.getElementById("player2"),
    currentPlayer = player1;

  // Start Screen
  function gameStart() {
    startScreen.style.display = "block";
    boardScreen.style.display = "none";
    finishScreen.style.display = "none";
  }

  gameStart();

  // Board Screen
  function newGame() {
    startScreen.style.display = "none";
    boardScreen.style.display = "block";
    finishScreen.style.display = "none";
  }

  button.addEventListener("click", newGame);

  // Random Player
  function pickRandom() {
    if (Math.random() < 0.5) {
      currentPlayer = player1;
    } else {
      currentPlayer = player2;
    }
  }

  pickRandom();

  // Highlight Player / Unhighlight Player
  function highlightPlayer() {
    if (currentPlayer == player1) {
      player1.classList.add("active");
    } else {
      player2.classList.add("active");
    }
  }

  function unhighlightPlayer() {
    player1.classList.remove("active");
    player2.classList.remove("active");
  }

  highlightPlayer();

  // Highlight Square / Unhighlight Square
  squares.addEventListener("mouseover", (e) => {
    if (currentPlayer == player1) {
      e.target.style.backgroundImage = o;
    } else {
      e.target.style.backgroundImage = x;
    }
  })

  squares.addEventListener("mouseout", (e) => {
    e.target.style.backgroundImage = "";
  })

  // Mark Square
  function switchPlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  }

  squares.addEventListener("click", (e) => {
    if (currentPlayer == player1) {
      e.target.classList.add("box-filled-1");
      switchPlayer();
      unhighlightPlayer();
      highlightPlayer();
      e.target.style.pointerEvents ="none";
    } else {
      e.target.classList.add("box-filled-2");
      switchPlayer();
      unhighlightPlayer();
      highlightPlayer();
      e.target.style.pointerEvents ="none";
    }
  })

  // Check for Win
  function checkWin() {
    const board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    let square = board;
    square.forEach((el, index, array) => {
      el.forEach((el2d, index2d, array2d) => {
        console.log(board[1][2]); // Returns 6
      });
    });
  }

  checkWin();

  // Game Over

  function gameOver() {
    let message = document.querySelector(".message");
    if (winner == player1) {
      message.innerHTML = "Winner";
      finishScreen.classList.add("screen-win-one");
      finishScreen.classList.remove("screen-win-two");
      finishScreen.classList.remove("screen-win-tie");
    } else if (winner == player2) {
      message.innerHTML = "Winner";
      finishScreen.classList.remove("screen-win-one");
      finishScreen.classList.add("screen-win-two");
      finishScreen.classList.remove("screen-win-tie");
    } else {
      message.innerHTML = "Draw";
      finishScreen.classList.remove("screen-win-one");
      finishScreen.classList.remove("screen-win-two");
      finishScreen.classList.remove("screen-win-tie");
    }
  }

  // gameOver();

  // button.addEventListener("click", newGame);

})();