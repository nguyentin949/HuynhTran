document.addEventListener('DOMContentLoaded', () => {
    const fireCursor = document.getElementById('fire-cursor-effect');
    const fireSpreadContainer = document.getElementById('fire-spread-container');
    const contentBoxContainer = document.getElementById('content-box-container');
    const closeBoxButton = document.getElementById('closeBoxButton');
    const preClickText = document.querySelector('.pre-click-text');
    const clickMeText = document.getElementById('clickMeText');
    const fireworksContainer = document.getElementById('fireworks-container');
    const nextPageButton = document.getElementById('nextPageButton');

    let hasClicked = false;
    let clickMeTimeout;

    // Hiển thị "Click me!" sau 3 giây
    function showClickMeText() {
        clickMeTimeout = setTimeout(() => {
            if (clickMeText) {
                clickMeText.classList.add('visible');
            }
        }, 8000);
    }
    showClickMeText();

    // Di chuyển hiệu ứng ngọn lửa theo chuột
    document.addEventListener('mousemove', (e) => {
        fireCursor.style.left = `${e.clientX}px`;
        fireCursor.style.top = `${e.clientY}px`;
    });

    // Tạo một quả pháo hoa
    function createFirework(x, y, color) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        firework.style.backgroundColor = color || '#ffcc00';
        firework.style.boxShadow = `0 0 8px ${color || '#ffcc00'}`;
        fireworksContainer.appendChild(firework);

        const numParticles = 40;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.backgroundColor = color || '#ff5722';
            particle.style.boxShadow = `0 0 5px ${color || '#ff5722'}`;
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 80 + 20;
            particle.style.setProperty('--tx', `${Math.cos(angle) * radius}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * radius}px`);
            firework.appendChild(particle);
        }

        firework.addEventListener('animationend', () => {
            firework.remove();
        });
    }

    // Hiển thị một chuỗi pháo hoa ngẫu nhiên
    function burstFireworks() {
        const numBursts = 7;
        const delay = 200;
        const colors = ['#ffcc00', '#ff6699', '#66ccff', '#ccff66', '#ff99cc'];

        for (let i = 0; i < numBursts; i++) {
            setTimeout(() => {
                const randomX = Math.random() * window.innerWidth;
                const randomY = Math.random() * window.innerHeight * 0.6;
                const randomColor = colors[(Math.floor(Math.random() * colors.length))];
                createFirework(randomX, randomY, randomColor);
            }, i * delay);
        }
    }

    document.addEventListener('click', (e) => {
        if (!hasClicked) {
            hasClicked = true;
            clearTimeout(clickMeTimeout);
            if (clickMeText) {
                clickMeText.classList.remove('visible');
                preClickText.style.opacity = '0';
                preClickText.style.display = 'none';
            }

            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'fire-particle';
                particle.style.left = `${e.clientX}px`;
                particle.style.top = `${e.clientY}px`;

                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * window.innerWidth * 0.6;
                const offsetX = Math.cos(angle) * distance;
                const offsetY = Math.sin(angle) * distance;

                particle.style.setProperty('--offsetX', `${offsetX}px`);
                particle.style.setProperty('--offsetY', `${offsetY}px`);
                particle.style.animationDelay = `${Math.random() * 0.5}s`;
                const spreadDuration = Math.random() * 1 + 0.8;
                particle.style.setProperty('--spread-duration', `${spreadDuration}s`);
                particle.style.animationDuration = `var(--spread-duration), 0.3s`;

                fireSpreadContainer.appendChild(particle);

                particle.addEventListener('animationend', () => {
                    particle.remove();
                });
            }

            setTimeout(() => {
                contentBoxContainer.classList.add('visible');
                burstFireworks();
            }, 600);
        }
    });

    closeBoxButton.addEventListener('click', (e) => {
        e.stopPropagation();
        contentBoxContainer.classList.remove('visible');
        hasClicked = false;
        if (preClickText) {
            preClickText.style.display = 'block';
            setTimeout(() => preClickText.style.opacity = '60', 500);
        }
        showClickMeText();
    });

    if (nextPageButton) {
        nextPageButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Chuyển đến trang tiếp theo!');
        });
    }
});
// --- THÊM HIỆU ỨNG MƯA SAO BĂNG ---
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.body.appendChild(star);
    star.addEventListener('animationend', () => {
        star.remove();
    });
}

// Tạo liên tục các ngôi sao băng
setInterval(createShootingStar, 1000);