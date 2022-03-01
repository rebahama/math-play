// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    runGame("addition");
    document.getElementById('answer-box').addEventListener("keydown",function(event){// if user presses enter then the checkanswer function is called
     if(event.key==="Enter")
     checkAnswer();
    
    
    })

});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    document.getElementById('answer-box').value=""; // resets the value in box
    document.getElementById('answer-box').focus();// puts the mouse curser in the box

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } 
    else if(gameType==="multiply"){
        displayMultiplyQuestion(num1, num2)

    }
    else if(gameType==="subtract"){
        displaySubtractQuestion(num1, num2)
    }
    else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}

/**
 * Checks the answer agaist the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } 
    else if(operator ==="x"){
        return [operand1 * operand2, "multiply"];
    }
    else if(operator==="-"){
        return[operand1 - operand2, "subtract"];
    }
    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
   

}

function incrementScore() {
let oldScore= parseInt(document.getElementById('score').innerText);
document.getElementById('score').innerText= ++oldScore;

}

function incrementWrongAnswer() {
    let oldScore= parseInt(document.getElementById('incorrect').innerText);
document.getElementById('incorrect').innerText= ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
    
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1> operand2 ? operand1:operand2;// os perant 1 bigger than operand 2? if so the nreturn operand 1 else return operand 2
    document.getElementById('operand2').textContent = operand1> operand2 ? operand2:operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
    
}