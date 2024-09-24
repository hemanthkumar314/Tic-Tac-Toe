// Retrieve player names from local storage or use default values
const player1Name = localStorage.getItem('player1') || 'Player 1';
const player2Name = localStorage.getItem('player2') || 'Player 2';

// Display player names in the UI
document.getElementById('playerXName').textContent = player1Name;
document.getElementById('playerOName').textContent = player2Name;
document.getElementById('player1name').textContent = player1Name + " (X)";
document.getElementById('player2name').textContent = player2Name + " (O)";

const clickSound = document.getElementById("clickSound");
const gameOverSound = document.getElementById("gameOverSound");

// Initialize game variables
let boxes = document.querySelectorAll(".box");
let turn = "X"; // Current player's turn
let scoreX = 0; // Player X's score
let scoreO = 0; // Player O's score
let scoreTie = 0; // Tie score
let games = 0; // Total games played
let isGameOver = false; // Game state

// Function to update the score display in the UI
function updateScores() {
    document.querySelector("#scoreX").innerHTML = scoreX;
    document.querySelector("#scoreO").innerHTML = scoreO;
    document.querySelector("#scoreTie").innerHTML = scoreTie;
    document.querySelector("#games").innerHTML = games;

}

// Initial score update call
updateScores();

// Event listeners for each box for player moves
boxes.forEach(e => {
    e.innerHTML = ""; // Clear the box content
    e.addEventListener("click", () => {
        // Proceed if the game is not over and the box is empty
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn; // Set the current player's symbol
            clickSound.play();
            checkWin(); 
            checkDraw(); 
            changeTurn(); 
        }
    });
});

// Function to switch turns between players
function changeTurn() {
    if(!isGameOver){
        if (turn === "X") {
            turn = "O"; 
            document.querySelector(".bg").style.left = "85px";
        } else {
            turn = "X"; 
            document.querySelector(".bg").style.left = "0";
        }
    }
}

// Function to check for a win condition
function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            gameOverSound.play(); 
            
            if (turn === "X") {
                scoreX++;
                showWinnerPopup(player1Name); 
            } else {
                scoreO++;
                showWinnerPopup(player2Name);
            }
            games++; 
            updateScores(); 

            // Highlight winning boxes
            for (j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
            return; 
        }
    }
}

// Function to check for a draw
function checkDraw() {
    if (!isGameOver) {
        let isDraw = true; 
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false; // If any box is empty, it's not a draw
        });

        if (isDraw) {
            isGameOver = true;
            gameOverSound.play(); 
            showWinnerPopup("Draw"); 
            scoreTie++; 
            games++; 
            updateScores(); 
        }
    }
}

// Function to show the winner popup
function showWinnerPopup(winner) {
    const popup = document.createElement('div');
    popup.className = 'winner-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <i class="fa-solid fa-trophy trophy-icon"></i>
            <h2>${winner === "Draw" ? "It's a Draw!" : winner + " Wins!"}</h2>
            <button id="popup-play-again">Play Again</button>
            <button id="popup-reset">Reset</button>
        </div>
    `;
    document.body.appendChild(popup); // Add popup to the document body

    // Event listener for "Play Again" button
    document.getElementById('popup-play-again').addEventListener('click', () => {
        playAgain(); 
        document.body.removeChild(popup); 
    });

    // Event listener for "Reset" button
    document.getElementById('popup-reset').addEventListener('click', () => {
        resetGame(); 
        document.body.removeChild(popup); 
    });

    // Animate the trophy icon
    const trophy = popup.querySelector('.trophy-icon');
    trophy.style.animation = 'spin 1s ease-in-out';
}

// Function to restart the game
function playAgain() {
    isGameOver = false; 
    turn = "X"; 
    document.querySelector(".bg").style.left = "0"; 
    document.querySelector("#results").innerHTML = ""; 

    // Clear boxes and reset styles
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"; 
    });
}

// Function to reset the game scores and state
function resetGame() {
    playAgain(); 
    scoreO = 0; 
    scoreX = 0; 
    scoreTie = 0; 
    games = 0; 
    updateScores(); 
}

// Event listener for the home icon to redirect to the main page
document.getElementById('homeIcon').addEventListener('click', function() {
    window.location.href = 'home.html';
});

// Create a style element and append it to the document head
const style = document.createElement('style');
document.head.appendChild(style);
