const confirmBtn = document.getElementById('confirmBtn');
const restartBtn = document.getElementById('restartBtn');
let userScore = document.getElementById('userScore');
let computerScore = document.getElementById('computerScore');
let answaer = document.getElementById('communicate');


function randomNumber() {
    let input = parseInt(document.getElementById('inputForm').value);

    if (isNaN(input) || input < 1 || input > 3) {
        window.alert('Please enter a number between 1 and 3.');
        return;
    }

    let randomNum = Math.round(Math.random() * 3 + 1);
    let randomComNum = Math.round(Math.random() * 3 + 1);


    if(input === randomNum){
        userScore.innerHTML = parseInt(userScore.innerHTML) + 1;
        document.getElementById('inputForm').value = '';
        answaer.innerHTML = 'Point for user';
    }else if (randomComNum === randomNum){
        computerScore.innerHTML = parseInt(computerScore.innerHTML) + 1;
        answaer.innerHTML = 'Point for computer';
        document.getElementById('inputForm').value = '';
    }else {
        answaer.innerHTML = 'Nobody guessed the number! Enter next number';
        document.getElementById('inputForm').value = '';
        removeText();
    }

    if(parseInt(userScore.innerHTML) === 10){
        window.alert('Congrats user wins');
        removeText();
        restartGame();
    }
    if(parseInt(computerScore.innerHTML) === 10){
        window.alert('Computer wins');
        removeText();
        restartGame();
    }
    
}


function removeText() {
    setTimeout(function () {
        answaer.innerHTML = '';
    }, 3000);
}

function restartGame() {
    computerScore.innerHTML = '0';
    userScore.innerHTML = '0';
    document.getElementById('inputForm').value = '';
}
