const GameChoice = ["Rock", "Paper", "Scissors"];
const GameResult = {
    Loss: "Loss",
    Tie: "Tie",
    Win: "Win"
};

function getComputerChoice()
{
    return GameChoice[Math.floor(Math.random() * GameChoice.length)];
}

function capitalizeFirstLetter(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function playRound(playerSelection, computerSelection)
{
    if (playerSelection == computerSelection)
    {
        return GameResult.Tie;
    }
    else if ((playerSelection == 'Rock' && computerSelection == 'Paper') ||
        (playerSelection == 'Scissors' && computerSelection == 'Rock') ||
        (playerSelection == 'Paper' && computerSelection == 'Scissors'))
    {
        return GameResult.Loss;
    }
    return GameResult.Win;
}

function game()
{
    const numOfGames = 5;
    let computerWin = 0
    let playerWin = 0;
    for (let i = 0; i < numOfGames; i++)
    {
        const playerSelection = capitalizeFirstLetter(prompt("Choose your weapon!").toLowerCase());
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);
        switch (result)
        {
            case GameResult.Win:
                console.log(`You Win! ${playerSelection} beats ${computerSelection}!`);
                ++playerWin;
                break;
            case GameResult.Tie:
                console.log(`It's a tie of ${playerSelection}`);
                break;
            case GameResult.Loss:
                console.log(`You Lose! ${computerSelection} beates ${playerSelection}!`);
                ++computerWin;
                break;            
        } 
    }
    if (computerWin > playerWin)
    {
        console.log("Computer Wins!");
    }
    else
    {
        console.log("You Win!")
    }
}

game();