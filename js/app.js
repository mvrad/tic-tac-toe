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
    board = [
      [1, 2, 3], // [0][0], [0][1], [0][2]
      [4, 5, 6], // [1][0], [1][1], [1][2]
      [7, 8, 9]  // [2][0], [2][1], [2][2]
    ];

  let player1 = document.getElementById("player1"),
    player2 = document.getElementById("player2"),
    player1Name = document.getElementById("player1Name"),
    player2Name = document.getElementById("player2Name"),
    printName1 = document.getElementById("printName1"),
    printName2 = document.getElementById("printName2"),
    currentPlayer = player1,
    wins = [
      [1, 2, 3], // Horizontal
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7], // Vertical
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9], // Diagonal
      [3, 5, 7]
    ],
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
    player1Move = [];
    player2Move = [];
    if (name1 == "") {
      printName1.innerHTML = "You";
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

  // Check for Win
  function checkWin() {
    let player;
    if (currentPlayer == player1) {
      player = player1Move;
    } else {
      player = player2Move;
    }

    for (let i = 0; i < wins.length; i++) {
      let win = wins[i];
      for (let j = 0; j < win.length; j++) {
        let num = win[j],
          compare = player.indexOf(num);

        if (compare === -1) {
          return true;
        }
      }
    }
  }

  // Pick Square
  function pickSquare() {
    let winner = checkWin(),
      message = document.querySelector(".message");

    squares.addEventListener("click", (e) => {
      if (currentPlayer == player1) {
        // player1Move += 
        e.target.classList.add("box-filled-1");
        switchPlayer();
        unhighlightPlayer();
        highlightPlayer();
        e.target.style.pointerEvents ="none";
      } else {
        // player2Move += 
        e.target.classList.add("box-filled-2");
        switchPlayer();
        unhighlightPlayer();
        highlightPlayer();
        e.target.style.pointerEvents ="none";
      }

      if (winner) {
        if (winner == player1) {
        message.innerHTML = printName1.textContent + " Wins";
        endScreen();
        finishScreen.classList.add("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.remove("screen-win-tie");
        } else if (winner == player2) {
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