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
    win = ["012", "345", "678", "036", "147", "258", "048", "246"],
    board = Array(9);

  let player1 = document.getElementById("player1"),
    player2 = document.getElementById("player2"),
    player1Name = document.getElementById("player1Name"),
    player2Name = document.getElementById("player2Name"),
    printName1 = document.getElementById("printName1"),
    printName2 = document.getElementById("printName2"),
    message = document.querySelector(".message"),
    currentPlayer = player1,
    player1Move = [],
    player2Move = [],
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

  // Start with Random Player
  function pickRandom() {
    if (Math.random() < 0.5) {
      currentPlayer = player1;
    } else {
      currentPlayer = player2;
    }
  }

  // New Game
  function newGame() {
    showScreen(boardScreen);
    // Prints Names to Screen
    let name1 = player1Name.value,
      name2 = player2Name.value;
    if (name1 == "" && name2 == "") {
      printName1.innerHTML = "Player 1";
      printName2.innerHTML = "Player 2";
    } else if (name1 == "") {
      printName1.innerHTML = "Player 1";
      printName2.innerHTML = name2;
    } else if (name2 == "") {
      printName1.innerHTML = name1;
      printName2.innerHTML = "Player 2";
    } else {
      printName1.innerHTML = name1;
      printName2.innerHTML = name2;  
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
      const gameplay = () => {
        checkWinner();
        switchPlayer();
        unhighlightPlayer();
        highlightPlayer();
        e.target.style.pointerEvents = "none";
      }
      let boxFilledIndex = [].slice.call(e.target.parentNode.children).indexOf(e.target);
      if (currentPlayer == player1) {
        player1Move.push(boxFilledIndex);
        e.target.classList.add("box-filled-1");
        gameplay();
      } else {
        player2Move.push(boxFilledIndex);
        e.target.classList.add("box-filled-2");
        gameplay();
      }
    });
  }

  // Check for Winner
  function checkWinner() {
    let player1Score = permutator(player1Move),
      player2Score = permutator(player2Move),
      player1Win = "false",
      player2Win = "false";

    win.forEach((el, index, arr) => {
      let winning = new RegExp(".?" + el[0] + ".?" + el[1] + ".?" + el[2] + ".?"),
        isTrue = (el) => {
        return el === "true";
      };

      if (winning.test(player1Score)) {
        player1Win = "true";
      } else if (winning.test(player2Score)) {
        player2Win = "true";
      }

      if (([player1Win]).some(isTrue)) {
        message.innerHTML = printName1.textContent + " Wins";
        finishScreen.classList.add("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.remove("screen-win-tie");
        showScreen(finishScreen);
      } else if (([player2Win]).some(isTrue)) {
        message.innerHTML = printName2.textContent + " Wins";
        finishScreen.classList.remove("screen-win-one");
        finishScreen.classList.add("screen-win-two");
        finishScreen.classList.remove("screen-win-tie");
        showScreen(finishScreen);
      } else if (([player1Win]).some(isTrue) === false &&
        ([player2Win]).some(isTrue) === false &&
        player1Move.length + player2Move.length === 9) {
        message.innerHTML = "It's a Tie!";
        finishScreen.classList.remove("screen-win-one");
        finishScreen.classList.remove("screen-win-two");
        finishScreen.classList.add("screen-win-tie");
        showScreen(finishScreen);
      }
    });
  }

  function reset() {
    location.reload();
  }

  // Game
  showScreen(startScreen);
  startButton.addEventListener("click", newGame);
  pickRandom();
  highlightPlayer();
  highlightSquare();
  unhighlightSquare();
  pickSquare();
  newButton.addEventListener("click", reset);

})();