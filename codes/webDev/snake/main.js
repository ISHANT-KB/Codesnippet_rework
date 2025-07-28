const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const gameOverElement = document.getElementById('gameOver');
    const finalScoreElement = document.getElementById('finalScore');

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = {};
    let dx = 1; // Snake starts moving to the right
    let dy = 0;
    let score = 0;
    let highScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
    let gameRunning = true;

    highScoreElement.textContent = highScore;

    // Optimized safe food generation
    function generateSafeFood() {
        const emptySpaces = [];
        for (let x = 0; x < tileCount; x++) {
            for (let y = 0; y < tileCount; y++) {
                if (!snake.some(seg => seg.x === x && seg.y === y)) {
                    emptySpaces.push({ x, y });
                }
            }
        }
        if (emptySpaces.length > 0) {
            food = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        }
    }

    function drawGame() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.shadowColor = '#4ecdc4';
        ctx.shadowBlur = 10;

        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? '#45b7aa' : '#4ecdc4';
            ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(segment.x * gridSize + 4, segment.y * gridSize + 4, gridSize - 8, gridSize - 8);
        });

        ctx.shadowBlur = 0;

        // Draw food
        ctx.fillStyle = '#ff6b6b';
        ctx.shadowColor = '#ff6b6b';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, 2 * Math.PI);
        ctx.fill();

        // Sparkle
        ctx.fillStyle = '#ffed4e';
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize / 2 - 3, food.y * gridSize + gridSize / 2 - 3, 3, 0, 2 * Math.PI);
        ctx.fill();

        ctx.shadowBlur = 0;
    }

    function moveSnake() {
        if (!gameRunning) return;

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Wall or self-collision
        if (
            head.x < 0 || head.x >= tileCount ||
            head.y < 0 || head.y >= tileCount ||
            snake.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
            gameOver();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
                localStorage.setItem('snakeHighScore', highScore.toString());
            }
            generateSafeFood();
        } else {
            snake.pop();
        }
    }

    function gameOver() {
        gameRunning = false;
        finalScoreElement.textContent = score;
        gameOverElement.style.display = 'block';
    }

    function restartGame() {
        snake = [{ x: 10, y: 10 }];
        dx = 1;
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
        gameRunning = true;
        gameOverElement.style.display = 'none';
        generateSafeFood();
    }

    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;
        const key = e.key.toLowerCase();

        if ((key === 'arrowleft' || key === 'a') && dx !== 1) {
            dx = -1; dy = 0;
        } else if ((key === 'arrowup' || key === 'w') && dy !== 1) {
            dx = 0; dy = -1;
        } else if ((key === 'arrowright' || key === 'd') && dx !== -1) {
            dx = 1; dy = 0;
        } else if ((key === 'arrowdown' || key === 's') && dy !== -1) {
            dx = 0; dy = 1;
        }
    });

    document.querySelectorAll('.mobile-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!gameRunning) return;

            const direction = btn.dataset.direction;
            if (direction === 'up' && dy !== 1) { dx = 0; dy = -1; }
            else if (direction === 'down' && dy !== -1) { dx = 0; dy = 1; }
            else if (direction === 'left' && dx !== 1) { dx = -1; dy = 0; }
            else if (direction === 'right' && dx !== -1) { dx = 1; dy = 0; }
        });
    });

    function gameLoop() {
        moveSnake();
        drawGame();
    }

    generateSafeFood();
    setInterval(gameLoop, 150);