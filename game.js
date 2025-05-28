document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const startButton = document.getElementById('start-button');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let circle;

    startButton.addEventListener('click', startGame);

    function startGame() {
        // Reset game state
        score = 0;
        timeLeft = 30;
        scoreElement.textContent = score;
        timeElement.textContent = timeLeft;
        startButton.style.display = 'none';
        
        // Create first circle
        createCircle();

        // Start timer
        gameInterval = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function createCircle() {
        if (circle) {
            circle.remove();
        }

        circle = document.createElement('div');
        circle.className = 'circle';
        
        // Random position within game area
        const maxX = gameArea.clientWidth - 50;
        const maxY = gameArea.clientHeight - 50;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        circle.style.left = randomX + 'px';
        circle.style.top = randomY + 'px';
        
        circle.addEventListener('click', () => {
            score++;
            scoreElement.textContent = score;
            createCircle();
        });
        
        gameArea.appendChild(circle);
    }

    function endGame() {
        clearInterval(gameInterval);
        if (circle) {
            circle.remove();
        }
        startButton.style.display = 'block';
        alert(`Game Over! Your score: ${score}`);
    }
});
