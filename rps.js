//Global Variables

let playerScore = 0;
let compScore = 0;
let gameLoop = true;
let playerWin = false;
let computerWin = false;

//Event Listener Image Click

function makeSelection(choice){
    if(gameLoop){
    playerSelection = undefined;
    computerSelection = computerPlay();
    imgClick = choice.id;
    if(imgClick === "rock") playerSelection = "rock";
    else if (imgClick === "paper") playerSelection = "paper";
    else playerSelection = "scissors";
    result = playRound(playerSelection,computerSelection);
    calculateResult(result);
    clearResult();
    }
}
    
//Functions

function computerPlay(){
    choice = Math.floor(Math.random() * 3);
    if(choice === 0) {return "rock";} 
    else if(choice === 1) {return "paper";} 
    else return "scissors";
}

function playRound(playerSelection,computerSelection){
    switch(playerSelection){
        case "rock":
            if(computerSelection === "scissors"){
                borderSelect("rock","scissors");
                return `You Win! Rock beats Scissors. The score is ${playerScore+1} - ${compScore}.`
            } else if(computerSelection === "paper"){
                borderSelect("rock","paper");
                return `You Lose! Paper beats Rock. The score is ${playerScore} - ${compScore+1}.`
            } else{
                borderSelect("rock","rock");
                return `Both players picked rock. It's a tie. It's still ${playerScore} - ${compScore}.`
            } 
        case "paper":
            if(computerSelection === "rock"){
                borderSelect("paper","rock");
                return `You Win! Paper beats Rock. The score is ${playerScore+1} - ${compScore}.`
            } else if(computerSelection === "scissors"){
                borderSelect("paper","scissors");
                return `You Lose! Scissors beats Paper. The score is ${playerScore} - ${compScore+1}.`
            } else{
                borderSelect("paper","paper");
                return `Both players picked paper. It's a tie. It's still ${playerScore} - ${compScore}.`
            } 
        case "scissors":
            if(computerSelection === "paper"){
                borderSelect("scissors","paper");
                return `You Win! Scissors beats Paper. The score is ${playerScore+1} - ${compScore}.`
            } else if(computerSelection === "rock"){
                borderSelect("scissors","rock");
                return `You Lose! Rock beats Scissors. The score is ${playerScore} - ${compScore+1}.`
            } else{
                borderSelect("scissors","scissors");
                return `Both players picked scissors. It's a tie. It's still ${playerScore} - ${compScore}.`
            } 
    }
}
    
function calculateResult(result){
    if(result[4] === "W"){
        playerScore += 1
    } else if (result[4] === "L"){
        compScore += 1;
    } 
   
    display = document.getElementById("display_result");
    para = document.createElement("p");
    display.appendChild(para);
    para.textContent = result;
    
    if(playerScore === 5 || compScore === 5){
        finalResult = document.getElementById("end_result");
        finalPara = document.createElement("h1");
        finalPara.setAttribute("id","congratulations");
        finalResult.appendChild(finalPara);

        if(playerScore > compScore){
            finalPara.textContent = `Congratulations! You have won the series ${playerScore} - ${compScore}!`;
            playerWin = true;
        } else if(compScore > playerScore){
            finalPara.textContent = `You lose! The computer has won the series ${compScore} - ${playerScore}!`;
            computerWin = true;
        } 

        playerScore = 0;
        compScore = 0;
        gameLoop = false;
        clearResult();
        setTimeout(gameOver,2000);
    }
}

function clearResult(){
    displayP = document.querySelectorAll("p");
    if(displayP.length % 6 === 0){
        removeElements(displayP);
    }
}

function removeElements(elements){
    if(!gameLoop){
        for(let i = 0; i < elements.length; i++){
            elements[i].parentNode.removeChild(elements[i]);
        }
        return;
    } 
    for(let i = 0; i < elements.length-1; i++){
        elements[i].parentNode.removeChild(elements[i]);
    }
}

function gameOver(){
    removeElements(displayP);
    imgRock = document.getElementById("rock");
    imgPaper = document.getElementById("paper");
    imgScissors = document.getElementById("scissors");
    imgRock.style = "border: none;"
    imgPaper.style = "border: none;"
    imgScissors.style = "border: none;"
    gameOverText = document.createElement("h1");
    optionText = document.createElement("h2");
    yesText = document.createElement("span");
    noText = document.createElement("span");
    display.appendChild(gameOverText);
    display.appendChild(optionText);
    gameOverText.style = "text-align: center;"
    optionText.style = "text-align: center;"
    if(playerWin) {gameOverText.style.color = "white"; optionText.style.color = "white"; optionText.style.fontSize = "4rem"; optionText.style.cursor = "pointer";}
    else {gameOverText.style.color = "red"; optionText.style.color = "white"; optionText.style.fontSize = "4rem"; optionText.style.cursor = "pointer";}
    gameOverText.textContent = "Game over. Would you like to play again?"
    displayOptions = () => {
        optionText.appendChild(yesText);
        optionText.appendChild(noText);
        yesText.textContent = "YES        ";
        noText.textContent = "        NO";
    }
    setTimeout(displayOptions,2000)
    yesText.addEventListener("click", function(){
        display.removeChild(optionText);
        display.removeChild(gameOverText);
        finalPara.textContent = "";
        restartText = document.createElement("h1");
        display.appendChild(restartText);
        restartText.style = "text-align: center;"
        restartText.textContent = "A wise decision, chap... time to play another round."
        playerWin = false;
        computerWin = false;
        setTimeout(function(){
            display.removeChild(restartText);
            gameLoop = true;
        },2500)
    });
    noText.addEventListener("click", function(){
        display.removeChild(optionText);
        display.removeChild(gameOverText);
        display.removeChild(end_result);
        goodByeText = document.createElement("h1");
        display.appendChild(goodByeText);
        goodByeText.style = "text-align: center;"
        goodByeText.textContent = "Thanks for playing! See you again next time!"
    });
}


function borderSelect(pID,cID){
    playerID = document.getElementById(pID);
    compID = document.getElementById(cID);
    // if(pID !== cID){
    // setTimeout(function(){
    // playerID.style = "border: 10px solid green;"
    // },0)
    // }
    setTimeout(function(){
        playerID.style = "border: 10px solid green;"
        compID.style = "border: 10px solid red;"
        if(playerID === compID){
            playerID.style = "border: 10px solid yellow;"
        }
    },0)
    setTimeout(borderRemove = () => {
        playerID.style = "none;"
        compID.style = "none;"
    },1000);
}





