// Grabbing elements for user and computer scores, result, and moves
const userScoreElem = document.getElementById('user-score');
const computerScoreElem = document.getElementById('computer-score');
const resultElem = document.getElementById('result');
const resetBtn = document.getElementById('reset-btn');
const userMoveElem = document.getElementById('user-move');
const computerMoveElem = document.getElementById('computer-move');

// Setting initial values for score and animation state
let userScore = 0;
let computerScore = 0;
let isAnimating = false;

// Defining choices and linking them to corresponding elements
const choices = {
    rock: document.getElementById('rock'),
    paper: document.getElementById('paper'),
    scissors: document.getElementById('scissors')
};

// Associating images with each choice
const choiceImages = {
    rock: 'rock.png',
    paper: 'paper.png',
    scissors: 'scissors.png'
};

// Attaching event listeners to each choice for triggering game rounds
Object.keys(choices).forEach(choice => {
    choices[choice].addEventListener('click', () => {
        // Ensuring animation isn't running before proceeding with game logic
        if (!isAnimating) playRound(choice);
    });
});

// Function to randomly generate computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

// Handling a round of the game logic
function playRound(userChoice) {
    isAnimating = true; // Disabling further actions during animation
    resetAnimations();  // Clearing previous animations

    const computerChoice = getComputerChoice(); // Get computer's random choice
    userMoveElem.src = choiceImages[userChoice]; // Display user's choice
    computerMoveElem.src = choiceImages[computerChoice]; // Display computer's choice

    setTimeout(() => {
        // Highlighting selected choices with animation
        choices[userChoice].classList.add('selected');
        choices[computerChoice].classList.add('selected');

        // Determining the outcome of the round (win, lose, draw)
        if (userChoice === computerChoice) {
            showResult('draw', userChoice, computerChoice);
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            userScore++; // Increment user's score if they win
            showResult('win', userChoice, computerChoice);
        } else {
            computerScore++; // Increment computer's score if the user loses
            showResult('lose', userChoice, computerChoice);
        }

        // Update the score display and check if someone has won
        updateScores();
        checkWinner();
        isAnimating = false; // Re-enable interaction after animation ends
    }, 500); // Delay to let animation run before determining results
}

// Function to display the result of the round
function showResult(result, userChoice, computerChoice) {
    if (result === 'win') {
        resultElem.textContent = `You Win! ${capitalize(userChoice)} beats ${capitalize(computerChoice)}!`;
        resultElem.className = 'result win';
    } else if (result === 'lose') {
        resultElem.textContent = `You Lose! ${capitalize(computerChoice)} beats ${capitalize(userChoice)}!`;
        resultElem.className = 'result lose';
    } else {
        resultElem.textContent = `It's a Draw! You both chose ${capitalize(userChoice)}.`;
        resultElem.className = 'result draw';
    }
}

// Updating the displayed scores on the UI
function updateScores() {
    userScoreElem.textContent = userScore;
    computerScoreElem.textContent = computerScore;
}

// Modal elements for displaying the final result
const resultModal = document.getElementById('result-modal');
const finalResultMessage = document.getElementById('final-result-message');
const closeModalBtn = document.getElementById('close-modal-btn');

// Checking for a winner when either player reaches 5 points
function checkWinner() {
    if (userScore === 5) {
        resultElem.textContent = 'Congratulations! You won the game after 5 rounds!';
        resultElem.className = 'result win';
        
        // Show the modal with the final message
        finalResultMessage.textContent = 'Congratulations! You won the game after 5 rounds!';
        resultModal.style.display = 'flex';  // Display modal
        
        resetGame(); // Reset the game after a win
    } else if (computerScore === 5) {
        resultElem.textContent = 'Computer wins after 5 rounds! Try again!';
        resultElem.className = 'result lose';
        
        // Show the modal with the final message
        finalResultMessage.textContent = 'Computer wins after 5 rounds! Try again!';
        resultModal.style.display = 'flex';  // Display modal
        
        resetGame(); // Reset the game after a loss
    }
}

// Adding functionality to close the modal and reset the game
closeModalBtn.addEventListener('click', () => {
    resultModal.style.display = 'none';  // Hide modal
    resetGame();  // Reset the game
});

// Function to reset animations and clear selected states
function resetAnimations() {
    Object.values(choices).forEach(choice => {
        choice.classList.remove('selected');
    });
    userMoveElem.src = ''; // Clear user move image
    computerMoveElem.src = ''; // Clear computer move image
}

// Capitalizing the first letter of a word (for proper formatting)
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Resetting the game when the reset button is clicked
resetBtn.addEventListener('click', resetGame);

// Function to reset the game (scores, result text, and animations)
function resetGame() {
    userScore = 0;
    computerScore = 0;
    updateScores(); // Update the displayed scores
    resultElem.textContent = 'Make Your Move!'; // Reset the result text
    resetAnimations(); // Reset move images and animations
}
