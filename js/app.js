(() => { // IIFE

  "use strict";

  // Variables
  const startScreen = document.getElementById("start"),
    startButton = document.querySelector(".button"),
    newButton = document.getElementById("newGame"), 
    boardScreen = document.getElementById("board"),
    finishScreen = document.getElementById("finish"),
    squares = document.querySelector(".boxes"),
    square = document.querySelector(".boxes > .box"),
    o = "url(img/o.svg)",
    x = "url(img/x.svg)",
    onePlayer = document.getElementById("onePlayer"),
    twoPlayers = document.getElementById("twoPlayers"),
    player1Div = document.getElementById("playerOne"),
    player2Div = document.getElementById("playerTwo"),
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  let player1 = document.getElementById("player1"),
    player2 = document.getElementById("player2"),
    player1Name = document.getElementById("player1Name"),
    player2Name = document.getElementById("player2Name"),
    printName1 = document.getElementById("printName1"),
    printName2 = document.getElementById("printName2"),
    message = document.querySelector(".message"),
    currentPlayer = player1,
    player1Move = [],
    player2Move = [];

  // Start Screen
  function gameStart() {
    startScreen.style.display = "block";
    boardScreen.style.display = "none";
    finishScreen.style.display = "none";
  }

  // Board Screen
  function newGame() {
    let name1 = player1Name.value,
      name2 = player2Name.value;
    startScreen.style.display = "none";
    boardScreen.style.display = "block";
    finishScreen.style.display = "none";
    if (name1 == "") {
      printName1.innerHTML = "Player 1";
      printName2.innerHTML = "Computer";
    } else if (name2 == "") {
      printName1.innerHTML = name1;
      printName2.innerHTML = "Computer";
    } else {
      printName1.innerHTML = name1;
      printName2.innerHTML = name2;  
    }
  }

  // Finish Screen
  function endScreen() {
    startScreen.style.display = "none";
    boardScreen.style.display = "none";
    finishScreen.style.display = "block";
  }

  // Number of Players
  function selectPlayers() {
    let players = document.forms[0],
      i;
    playerOne.style.display = "none";
    playerTwo.style.display = "none";
    for (i = 0; i < players.length; i++) {
      players.addEventListener("click", () => {
        if (players[0].checked) {
          playerOne.style.display = "block";
          playerTwo.style.display = "none";
        } else if (players[1].checked) {
          playerOne.style.display = "block";
          playerTwo.style.display = "block";
        } else {
          playerOne.style.display = "none";
          playerTwo.style.display = "none";
        }
      });
    }
  }

  // Random Player
  function pickRandom() {
    if (Math.random() < 0.5) {
      currentPlayer = player1;
    } else {
      currentPlayer = player2;
    }
  }

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

  // Highlight Square / Unhighlight Square
  function highlightSquare() {
    squares.addEventListener("mouseover", (e) => {
      if (currentPlayer == player1) {
        e.target.style.backgroundImage = o;
      } else {
        e.target.style.backgroundImage = x;
      }
    });
  }

  function unhighlightSquare() {
    squares.addEventListener("mouseout", (e) => {
      e.target.style.backgroundImage = "";
    });
  }

  // Switch Player
  function switchPlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  }

  // Pick Square
  function pickSquare() {
    const boxFilled1 = document.getElementsByClassName("box-filled-1")[0],
      boxFilled2 = document.getElementsByClassName("box-filled-2")[0];
    let square = board;

    squares.addEventListener("click", (e) => {
      let boxFilledIndex = [].slice.call(e.target.parentNode.children).indexOf(e.target);
      if (currentPlayer == player1) {
        player1Move.push(boxFilledIndex);
        e.target.classList.add("box-filled-1");
        switchPlayer();
        unhighlightPlayer();
        highlightPlayer();
        checkWinner();
        e.target.style.pointerEvents = "none";
      } else {
        player2Move.push(boxFilledIndex);
        e.target.classList.add("box-filled-2");
        switchPlayer();
        unhighlightPlayer();
        highlightPlayer();
        checkWinner();
        e.target.style.pointerEvents = "none";
      }
    });
  }

  // Check for Winner
  function checkWinner() {
    const wins = [
      [0, 1, 2], [0, 2, 1], [2, 1, 0], [2, 0, 1], [1, 0, 2], [1, 2, 0],
      [3, 4, 5], [3, 5, 4], [5, 4, 3], [5, 3, 4], [4, 3, 5], [4, 5, 3],
      [6, 7, 8], [6, 8, 7], [8, 7, 6], [8, 6, 7], [7, 6, 8], [7, 8, 6],
      [0, 3, 6], [0, 6, 3], [6, 3, 0], [6, 0, 3], [3, 0, 6], [3, 6, 0],
      [1, 4, 7], [1, 7, 4], [7, 4, 1], [7, 1, 4], [4, 1, 7], [4, 7, 1],
      [2, 5, 8], [2, 8, 5], [8, 5, 2], [8, 2, 5], [5, 2, 8], [5, 8, 2],
      [0, 4, 8], [0, 8, 4], [8, 4, 0], [8, 0, 4], [4, 0, 8], [4, 8, 0],
      [2, 4, 6], [2, 6, 4], [6, 4, 2], [6, 2, 4], [4, 2, 6], [4, 6, 2]
    ];
    
    wins.forEach((el, index, arr) => {
      if (el[0] == player1Move[0] && el[1] == player1Move[1] && el[2] == player1Move[2]) {
        message.innerHTML = printName1.textContent + " Wins";
        endScreen();
        finishScreen.classList.add("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.remove("screen-win-tie");
      } else if (el[0] == player2Move[0] && el[1] == player2Move[1] && el[2] == player2Move[2]) {
        message.innerHTML = printName2.textContent + " Wins";
        endScreen();
        finishScreen.classList.remove("screen-win-one");
        finishScreen.classList.add("screen-win-two");
        finishScreen.classList.remove("screen-win-tie");
      } else if (player1Move.length + player2Move.length === 9) {
        message.innerHTML = "It's a Tie!";
        endScreen();
        finishScreen.classList.remove("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.add("screen-win-tie");
      }
    });
  }

  // AI
  function AI() {

  }

  function reset() {
    location.reload();
  }

  // Gameplay
  startButton.addEventListener("click", newGame);
  gameStart();
  selectPlayers();
  // AI();
  pickRandom();
  highlightPlayer();
  highlightSquare();
  unhighlightSquare();
  pickSquare();
  newButton.addEventListener("click", reset);

})();