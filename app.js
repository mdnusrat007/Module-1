let userscore = parseInt(localStorage.getItem('userScore')) || 0;
let computerscore = parseInt(localStorage.getItem('computerScore')) || 0;

const updatescore = () => {
    playercount.textContent = userscore;
    computercount.textContent = computerscore;
}
const rulesButton = document.querySelector('.rules-button');
const rulesModal = document.querySelector('.rules-modal');
const closeButton = document.querySelector('.close-button');
const gamebox = document.querySelector('.game');
const replay = document.querySelector('.replay-button');
const resultcontainer = document.querySelector('.result-container');
const usericon = document.querySelector(".user-icon .user");
const computericon = document.querySelector(".computer-icon .computer");
const userbordercolor = document.querySelector(".user-icon");
const computerbordercolor = document.querySelector(".computer-icon");
const againstmessage = document.querySelector(".against");
const resultmessage = document.querySelector(".result-message");
const computercount = document.querySelector(".computer-count");
const playercount = document.querySelector(".player-count");
const nextbutton = document.querySelector(".next-button");
const celebratecontainer = document.querySelector(".celebrate-container");
const scoreboard = document.querySelector(".score-board");
const nextreplaybutton = document.querySelector(".next-replay-button");

const computerchoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

document.querySelectorAll('.icon-container').forEach(button => {
    button.addEventListener('click', () => {
        var userchoice = button.getAttribute('data-choice');
        var computerChoice = computerchoice();
        playgame(userchoice, computerChoice);
    });
});

const setupicons = (userchoice, computerchoice) => {
    usericon.classList.add(`${userchoice}-icon`);
    userbordercolor.classList.add(`${userchoice}`);
    computericon.classList.add(`${computerchoice}-icon`);
    computerbordercolor.classList.add(`${computerchoice}`);
}

const removeicons = () => {
    usericon.classList.remove("rock-icon", "paper-icon", "scissors-icon");
    computericon.classList.remove("rock-icon", "paper-icon", "scissors-icon");
    userbordercolor.classList.remove("rock", "paper", "scissors", "winner");
    computerbordercolor.classList.remove("rock", "paper", "scissors", "winner");
}

const savescores = () => {
    localStorage.setItem('userScore', userscore);
    localStorage.setItem('computerScore', computerscore);
}

const userscoreincrement = () => {
    userscore++;
    playercount.textContent = userscore;
    savescores();
}

const computerscoreincrement = () => {
    computerscore++;
    computercount.textContent = computerscore;
    savescores();
}
updatescore();

const drawgame = (userchoice, computerchoice) => {
    gamebox.style.display = "none";
    resultcontainer.style.display = "flex";
    againstmessage.textContent = "";
    resultmessage.textContent = "TIE UP";
    replay.textContent = "REPLAY"
    setupicons(userchoice, computerchoice);

}

const wingame = (userchoice, computerchoice, userscore) => {
    gamebox.style.display = "none";
    resultcontainer.style.display = "flex";
    againstmessage.textContent = "AGAINST PC";
    resultmessage.textContent = "YOU WIN";
    userbordercolor.classList.add("winner");
    computerbordercolor.classList.remove("winner");
    replay.textContent = "PLAY AGAIN";
    nextbutton.style.display = "block";
    rulesButton.style.right = "130px";
    setupicons(userchoice, computerchoice);
    userscoreincrement();
}
const losegame = (userchoice, computerchoice, computerscore) => {
    gamebox.style.display = "none";
    resultcontainer.style.display = "flex";
    againstmessage.textContent = "AGAINST PC";
    resultmessage.textContent = "YOU LOSE";
    replay.textContent = "PLAY AGAIN";
    computerbordercolor.classList.add("winner");
    userbordercolor.classList.remove("winner");
    setupicons(userchoice, computerchoice);
    computerscoreincrement();
}

const playgame = (userchoice, computerchoice) => {
    if (userchoice === computerchoice) {
        drawgame(userchoice, computerchoice);
    } else if (
        (userchoice === "rock" && computerchoice === "scissors") ||
        (userchoice === "paper" && computerchoice === "rock") ||
        (userchoice === "scissors" && computerchoice === "paper")
    ) {
        wingame(userchoice, computerchoice, userscore);
    } else {
        losegame(userchoice, computerchoice)
    }
}

rulesModal.style.display = 'none';
closeButton.style.display = 'none';

rulesButton.addEventListener('click', () => {
    rulesModal.style.display = 'block';
    closeButton.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    rulesModal.style.display = 'none';
    closeButton.style.display = 'none';
});

nextbutton.addEventListener('click', () => {
    resultcontainer.style.display = 'none';
    scoreboard.style.display = 'none';
    celebratecontainer.style.visibility = 'visible';
    nextbutton.style.display = "none";
    rulesButton.style.right = "10px";
    nextreplaybutton.style.display = "block";
})

nextreplaybutton.addEventListener('click', () => {
    celebratecontainer.style.visibility = 'hidden';
    scoreboard.style.display = 'flex';
    gamebox.style.display = "block";
    nextbutton.style.display = "none";
    nextreplaybutton.style.display = "none";
    removeicons();
})

replay.addEventListener('click', () => {
    gamebox.style.display = "block";
    resultcontainer.style.display = "none";
    nextbutton.style.display = "none";
    rulesButton.style.right = "10px";
    rulesModal.style.display = 'none';
    closeButton.style.display = 'none';
    removeicons();
})