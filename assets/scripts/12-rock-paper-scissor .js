let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoplaying = false;
let intervalId;

function reset(){
      score.losses = 0;
      score.ties = 0;
      score.wins = 0;
      localStorage.setItem("score", JSON.stringify(score));
      updateScoreElement();
}

function autoplay() {
  if (!isAutoplaying) {
    intervalId = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
    document.querySelector('.auto-play-button').textContent = 'Stop playing';
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
        document.querySelector(".auto-play-button").textContent = "Auto playing";
  }
}

document.querySelector('.js-rock').addEventListener('click',()=>{
  playGame('rock');
});
document.querySelector('.js-paper').addEventListener('click',()=>{
  playGame('paper');
});
document.querySelector('.js-scissor').addEventListener('click',()=>{
  playGame('scissors');
});
document.querySelector(".auto-play-button").addEventListener("click", () => autoplay());

document.querySelector(".reset").addEventListener("click", () => {
  showResultconfirmation();
});

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
  else if(event.key === 'Backspace'){
    showResultconfirmation();
  }
});


function showResultconfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML=`
  Are You want to reset the score?
  <button class='js-reset-yes'> Yes </button>
  <button class='js-reset-no'> No </button>`;

  document.querySelector('.js-reset-yes').addEventListener('click',()=>{
    reset();
    hideResetConfirmation();
  });
  document.querySelector('.js-reset-no').addEventListener('click',()=>{
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML='';
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = ` You
      <img src="assets/images/${playerMove}-emoji.png" alt="">
      <img src="assets/images/${computerMove}-emoji.png" alt="">
      computer`;

  // alert(`You picked ${playerMove}. Computer picked ${computerMove}.${result}
  // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = ` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}
