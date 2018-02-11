(() => { // IIFE

  "use strict";

  // Globals
  const startScreen = document.getElementById("start"),
    startButton = document.querySelector(".button"),
    newButton = document.getElementById("newGame"), 
    boardScreen = document.getElementById("board"),
    finishScreen = document.getElementById("finish"),
    squares = document.querySelector(".boxes"),
    square = document.querySelector(".boxes > .box"),
    o = "url(img/o.svg)",
    x = "url(img/x.svg)",
    board = [
      [1, 2, 3], // [0][0], [0][1], [0][2]
      [4, 5, 6], // [1][0], [1][1], [1][2]
      [7, 8, 9]  // [2][0], [2][1], [2][2]
    ],
    onePlayer = document.getElementById("onePlayer"),
    twoPlayers = document.getElementById("twoPlayers"),
    player1Div = document.getElementById("playerOne"),
    player2Div = document.getElementById("playerTwo");
  // Locals
  let player1 = document.getElementById("player1"),
    player2 = document.getElementById("player2"),
    printName1 = document.getElementById("printName1"),
    printName2 = document.getElementById("printName2"),
    player1Name = document.getElementById("player1Name"),
    player2Name = document.getElementById("player2Name"),
    currentPlayer = player1,
    player1Move = [],
    player2Move = [],
    wins = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

  // Number of Players
  function selectPlayers() {
    playerOne.style.display = "none";
    playerTwo.style.display = "none";
    let players = document.forms[0],
      i;
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
      startButton.addEventListener("click", () => {
        let name1 = player1Name.value,
          name2 = player2Name.value;
        if (players[0].checked) {
          printName1.innerHTML = name1;
          printName2.innerHTML = "Computer";
        } else if (players[1].checked) {
          printName1.innerHTML = name1;
          printName2.innerHTML = name2;
        }
      });
    }
  }

  // Start Screen
  function gameStart() {
    startScreen.style.display = "block";
    boardScreen.style.display = "none";
    finishScreen.style.display = "none";
  }

  // Board Screen
  function newGame() {
    startScreen.style.display = "none";
    boardScreen.style.display = "block";
    finishScreen.style.display = "none";
    player1Move = [];
    player2Move = [];
  }

  // Finish Screen
  function endScreen() {
    startScreen.style.display = "none";
    boardScreen.style.display = "none";
    finishScreen.style.display = "block";
  }

  startButton.addEventListener("click", newGame);

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

  // Mark Square
  function switchPlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  }

  function pickSquare() {
    let square = board,
      player;

    if (currentPlayer == player1) {
      player = player1Move;
    } else {
      player = player2Move;
    }

    squares.addEventListener("click", (e) => {
      if (currentPlayer == player1) {
        e.target.classList.add("box-filled-1");
        player1Move.push("O");
        switchPlayer();
        unhighlightPlayer();
        highlightPlayer();
        e.target.style.pointerEvents ="none";
        console.log(player1Move);
      } else {
        e.target.classList.add("box-filled-2");
        player2Move.push("X");
        switchPlayer();
        unhighlightPlayer();
        highlightPlayer();
        e.target.style.pointerEvents ="none";
        console.log(player2Move);
      }
      if (player1Move.length + player2Move.length === 9) {
        let message = document.querySelector(".message");
        message.innerHTML = "It's a Tie!";
        endScreen();
        finishScreen.classList.remove("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.add("screen-win-tie");
      }
    });
  }

  // Check for Win
  function checkWin() {
    let square = board,
      player;

    if (currentPlayer == player1) {
      player = player1Move;
    } else {
      player = player2Move;
    }

    // square.forEach((el, index, array) => {
    //   el.forEach((el2d, index2d, array2d) => {
    //       console.log(square[0][2]);  // Logs 3 to the Console
    //   });
    // });

    for (let i = 0; i < wins.length; i++) {
      let win = wins[i];
      for (let j = 0; j < win.length; j++) {
        let num = win[j],
          compare = player.indexOf(num);
          // console.log(compare); // Logs -1 to the Console

        if (compare === -1) {
          return true;
        }
      }
    }
  }

  // AI
  function AI() {

  }

  // Game Over
  function gameOver() {
    let winner = checkWin(),
      message = document.querySelector(".message");
    if (winner == player1) {
      message.innerHTML = "Wins";
      finishScreen.classList.add("screen-win-one");
      finishScreen.classList.remove("screen-win-two");
      finishScreen.classList.remove("screen-win-tie");
    } else if (winner == player2) {
      message.innerHTML = "Wins";
      finishScreen.classList.remove("screen-win-one");
      finishScreen.classList.add("screen-win-two");
      finishScreen.classList.remove("screen-win-tie");
    }
  }

  function reset() {
    location.reload();
  }

  // Gameplay
  gameStart();
  selectPlayers();
  // AI();
  pickRandom();
  highlightPlayer();
  highlightSquare();
  unhighlightSquare();
  pickSquare();
  // checkWin();
  newButton.addEventListener("click", reset);

})();