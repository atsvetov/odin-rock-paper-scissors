const PlayerChoice = {
    "rock_button": 0, 
    "paper_button": 1, 
    "scissors_button": 2
}

const GameChoice = ["Rock", "Paper", "Scissors"];

const GameResult = {
    Loss: "Loss",
    Tie: "Tie",
    Win: "Win"
};

function getCpuChoice()
{
    return GameChoice[Math.floor(Math.random() * GameChoice.length)];
}

function calcGameResult(playerChoice, computerChoice)
{
    if (playerChoice == computerChoice)
    {
        return GameResult.Tie;
    }
    else if ((playerChoice == 'Rock' && computerChoice == 'Paper') ||
        (playerChoice == 'Scissors' && computerChoice == 'Rock') ||
        (playerChoice == 'Paper' && computerChoice == 'Scissors'))
    {
        return GameResult.Loss;
    }
    return GameResult.Win;
}

function toggleConclusion(isVisible)
{
    if (isVisible)
    {
        const conclusionDiv = document.querySelector(".conclusion");
        conclusionDiv.classList.remove("remove_display");
        const buttonsDiv = document.querySelector(".buttons");
        buttonsDiv = buttonsDiv.classList.add("remove_display");
    }
    else
    {
        const conclusionDiv = document.querySelector(".conclusion");
        conclusionDiv.classList.add("remove_display");
        const buttonsDiv = document.querySelector(".buttons");
        buttonsDiv = buttonsDiv.classList.remove("remove_display");
    }
}

function startGame()
{
    const scoreLabels = document.querySelectorAll(".score_label");
    scoreLabels.forEach(label => label.textContent = 0);
    toggleConclusion(false);
}

function endGame(result)
{
    const messageBox = document.querySelector(".conclusion_msg");
    if (result == GameResult.Win)
    {
        messageBox.textContent = "You Win!";
    }
    else
    {
        messageBox.textContent = "You Lose!";
    }
    toggleConclusion(true);
}

function setChoiceImages(playerChoice, cpuChoice)
{
    const cpuChoiceImg =  document.querySelector(".cpu_choice > .choice_img");
    const playerChoiceImg = document.querySelector(".player_choice > .choice_img");
    cpuChoiceImg.src = `./images/${cpuChoice.toLowerCase()}.png`;
    playerChoiceImg.src = `./images/${playerChoice.toLowerCase()}.png`;
}

function playRound(e)
{
    const playerChoice = GameChoice[PlayerChoice[e.target.parentNode.id]];
    const cpuChoice = getCpuChoice();
    setChoiceImages(playerChoice, cpuChoice);
    const res = calcGameResult(playerChoice, cpuChoice);
    const cpuLabel = document.querySelector(".cpu_score > .score_label");
    const playerLabel = document.querySelector(".player_score > .score_label");

    let cpuScore = Number(cpuLabel.textContent);
    let playerScore = Number(playerLabel.textContent);

    const pointsToWIn = 5;    
    switch (res)
    {
        case GameResult.Win:
            ++playerScore;
            playerLabel.textContent = playerScore;
            break;
        case GameResult.Loss:
            ++cpuScore;
            cpuLabel.textContent = cpuScore;
            break;
        case GameResult.Tie:
            break;
    } 
    if (cpuScore == pointsToWIn || playerScore == pointsToWIn)
    {
        endGame(res);
    }
}

const playButtons = document.querySelectorAll(".play_button");
playButtons.forEach(button => button.addEventListener('click', playRound));
const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', startGame);
startGame();