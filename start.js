document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // Get the values of the input fields for Player 1 and Player 2
    const player1 = document.getElementById('player1').value.trim().toLowerCase();
    const player2 = document.getElementById('player2').value.trim().toLowerCase();

    // Check if both names are the same after converting to lowercase
    if(player1 === player2) {
        alert("Both names are the same!");
        location.reload(); // Refresh the page after the alert
        return; // Stop the form submission
    }
    
    // Store the original player names (not converted to lowercase) in local storage
    localStorage.setItem('player1', document.getElementById('player1').value.trim());
    localStorage.setItem('player2', document.getElementById('player2').value.trim());
    
    // Redirect the user to the main game page
    window.location.href = 'main.html';
});
