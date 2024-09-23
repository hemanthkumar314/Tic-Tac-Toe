// Add an event listener to the player form for the submit event
document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // Get the values of the input fields for Player 1 and Player 2
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    
    // Store the player names in local storage for later retrieval
    localStorage.setItem('player1', player1);
    localStorage.setItem('player2', player2);
    
    // Redirect the user to the main game page
    window.location.href = 'index.html';
});
