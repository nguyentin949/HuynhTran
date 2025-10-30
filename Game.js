document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const scoreDisplay = document.getElementById('score');
    const rewardScreen = document.getElementById('reward-screen');
    const rulesScreen = document.getElementById('rules-screen');
    const startButton = document.getElementById('start-button');
    const colors = ['#ffc0cb', '#87ceeb', '#90ee90', '#ffd700', '#da70d6'];

    let score = 0;
    const maxScore = 10;
    let balloonInterval;
    let comboCount = 0;
    const comboThreshold = 3;
    let comboTimeout;

    // Lắng nghe sự kiện click vào nút "Bắt đầu"
    startButton.addEventListener('click', () => {
        rulesScreen.style.display = 'none'; // Ẩn màn hình luật chơi
        balloonInterval = setInterval(createBalloon, 500); // Bắt đầu tạo bong bóng
    });

    function resetCombo() {
        comboCount = 0;
        const comboEffect = document.querySelector('.combo-effect');
        if (comboEffect) {
            comboEffect.remove();
        }
        clearTimeout(comboTimeout);
    }

    function createComboEffect() {
        if (!document.querySelector('.combo-effect')) {
            const comboEffect = document.createElement('div');
            comboEffect.classList.add('combo-effect');
            gameContainer.appendChild(comboEffect);
        }
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 80 + 10}vw`;
        const balloonColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = balloonColor;
        
        const isSpecialBalloon = Math.random() < 0.2;
        if (isSpecialBalloon) {
            const textSpan = document.createElement('span');
            textSpan.textContent = "Trân";
            balloon.appendChild(textSpan);
            balloon.dataset.isSpecial = "true";
        }

        gameContainer.appendChild(balloon);

        balloon.addEventListener('click', () => {
            const clickedBalloonColor = balloon.style.backgroundColor;

            if (balloon.dataset.isSpecial === "true") {
                score++;
                comboCount++;
                scoreDisplay.textContent = score;
                createPopEffect(balloon.getBoundingClientRect(), 'heart', clickedBalloonColor);
                
                if (comboCount >= comboThreshold) {
                    createComboEffect();
                }

                clearTimeout(comboTimeout);
                comboTimeout = setTimeout(resetCombo, 2000);

            } else {
                score--;
                if (score < 0) score = 0;
                scoreDisplay.textContent = score;
                createPopEffect(balloon.getBoundingClientRect(), 'star', clickedBalloonColor);
                resetCombo();
            }

            scoreDisplay.classList.add('bounce');
            setTimeout(() => {
                scoreDisplay.classList.remove('bounce');
            }, 500);
            
            balloon.classList.add('pop');

            if (score >= maxScore) {
                startFireworks();
                endGame();
            }

            setTimeout(() => {
                balloon.remove();
            }, 500);
        });

        setTimeout(() => {
            if (balloon.parentElement) {
                balloon.remove();
                if (balloon.dataset.isSpecial === "true") {
                    resetCombo();
                }
            }
        }, 10000);
    }

    function endGame() {
        clearInterval(balloonInterval);
        resetCombo();
        
        const remainingBalloons = document.querySelectorAll('.balloon');
        remainingBalloons.forEach(b => b.remove());

        rewardScreen.style.display = 'flex';
        rewardScreen.classList.add('reward-layout-vertical', 'show');

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Hoàn thành';
        completeButton.style.marginTop = '20px';
        completeButton.style.padding = '10px 20px';
        completeButton.style.fontSize = '1.2em';
        completeButton.style.backgroundColor = '#dc2430';
        completeButton.style.color = 'white';
        completeButton.style.border = 'none';
        completeButton.style.borderRadius = '5px';
        completeButton.style.cursor = 'pointer';
        completeButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

        completeButton.addEventListener('click', () => {
            window.location.href = 'podcast.html';
        });

        rewardScreen.appendChild(completeButton);
    }
    
    function createPopEffect(rect, particleType, balloonColor) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('pop-particle', particleType);
            
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;
            
            particle.style.background = balloonColor;
            particle.style.boxShadow = `0 0 10px ${balloonColor}`;
            
            const angle = Math.random() * 360;
            const velocity = Math.random() * 25 + 15;
            particle.velocityX = velocity * Math.cos(angle * Math.PI / 180);
            particle.velocityY = -velocity * Math.sin(angle * Math.PI / 180);
            gameContainer.appendChild(particle);

            const gravity = 0.5;
            const fadeInterval = setInterval(() => {
                particle.style.left = `${parseFloat(particle.style.left) + particle.velocityX}px`;
                particle.style.top = `${parseFloat(particle.style.top) + particle.velocityY}px`;
                particle.velocityY += gravity;
                particle.style.opacity = parseFloat(particle.style.opacity) - 0.02;

                if (parseFloat(particle.style.opacity) <= 0) {
                    clearInterval(fadeInterval);
                    particle.remove();
                }
            }, 20);
        }
    }

    function startFireworks() {
        const fireworksInterval = setInterval(() => {
            createFirework();
        }, 500);

        setTimeout(() => {
            clearInterval(fireworksInterval);
        }, 5000);
    }

    function createFirework() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.bottom = `${Math.random() * 50 + 50}vh`;
        gameContainer.appendChild(firework);

        const numberOfParticles = Math.floor(Math.random() * 100 + 100);
        const fireworkColor = colors[(Math.random() * colors.length) | 0];

        for (let i = 0; i < numberOfParticles; i++) {
            createFireworkParticle(firework, fireworkColor);
        }

        setTimeout(() => {
            firework.remove();
        }, 2000);
    }

    function createFireworkParticle(fireworkContainer, color) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        particle.style.backgroundColor = color;

        const angle = Math.random() * 360;
        const speed = Math.random() * 25 + 15;
        const vx = speed * Math.cos(angle * Math.PI / 180);
        const vy = speed * Math.sin(angle * Math.PI / 180);

        particle.style.setProperty('--vx', `${vx}px`);
        particle.style.setProperty('--vy', `${vy}px`);

        fireworkContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
});