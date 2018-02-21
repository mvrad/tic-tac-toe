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

  // Show Current Display
  function showScreen(screen) {
    if (screen == startScreen) {
      startScreen.style.display = "block";
      boardScreen.style.display = "none";
      finishScreen.style.display = "none";
    } else if (screen == boardScreen) {
      startScreen.style.display = "none";
      boardScreen.style.display = "block";
      finishScreen.style.display = "none";
    } else if (screen == finishScreen) {
      startScreen.style.display = "none";
      boardScreen.style.display = "none";
      finishScreen.style.display = "block";
    }
  }

  // New Game
  function newGame() {
    showScreen(boardScreen);
    let name1 = player1Name.value,
      name2 = player2Name.value;
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

  // Random Starting Player
  function pickRandom() {
    if (Math.random() < 0.5) {
      currentPlayer = player1;
    } else {
      currentPlayer = player2;
    }
  }

  // Switch Player
  function switchPlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
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
      } else if (currentPlayer == player2) {
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
    const win = ["012", "345", "678", "036", "147", "258", "048", "246"],
    // Gets Permutations of an Array
    permutator = (inputArr) => {
      let result = [];

      const permute = (arr, m = []) => {
        if (arr.length === 0) {
          result.push(m)
        } else {
          for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next))
          }
        }
      }
      permute(inputArr)
      return result;
    };

    let player1Score = permutator(player1Move),
      player2Score = permutator(player2Move);

    win.forEach((el, index, arr) => {
      // Check Player Moves for Winning Combinations
      let winning = new RegExp(".?" + el[0] + ".?" + el[1] + ".?" + el[2] + ".?"),
        winner;

      function player1WinCheck() {
        winner = "false";
        if (winning.test(player1Score)) {
          winner = "true";
        }
        return winner;
      }
      
      function player2WinCheck() {
        winner = "false";
        if (winning.test(player2Score)) {
          winner = "true";
        }
        return winner;
      }

      let isTrue = (el) => {
        return el === "true";
      };

      if ([player1WinCheck(winner)].some(isTrue)) {
        message.innerHTML = printName1.textContent + " Wins";
        finishScreen.classList.add("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.remove("screen-win-tie");
        showScreen(finishScreen);
      } else if ([player2WinCheck(winner)].some(isTrue)) {
        message.innerHTML = printName2.textContent + " Wins";
        finishScreen.classList.remove("screen-win-one");
        finishScreen.classList.add("screen-win-two");
        finishScreen.classList.remove("screen-win-tie");
        showScreen(finishScreen);
      } else if ([player1WinCheck(winner)].some(isTrue) === false &&
        [player1WinCheck(winner)].some(isTrue) === false &&
        player1Move.length + player2Move.length === 9) {
        message.innerHTML = "It's a Tie!";
        finishScreen.classList.remove("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.add("screen-win-tie");
        showScreen(finishScreen);
      }
    });
  }

  // The Minimax Algorithm
  function minimax() {

  }

  // AI
  function aiPlayer() {

  }

  function reset() {
    location.reload();
  }

  // Gameplay
  showScreen(startScreen);
  startButton.addEventListener("click", newGame);
  selectPlayers();
  pickRandom();
  highlightPlayer();
  highlightSquare();
  unhighlightSquare();
  pickSquare();
  newButton.addEventListener("click", reset);

})();