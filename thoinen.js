const windCursor = document.getElementById('wind-cursor');
const candles = document.querySelectorAll('.candle');
const flameTool = document.getElementById('flame-tool');
const blowerTool = document.getElementById('blower-tool');
const fireworksTool = document.getElementById('fireworks-tool');
const body = document.body;
const fireworksSound = document.getElementById('fireworks-sound');
const fireworksContainer = document.querySelector('.fireworks-container');
const cakeWrapper = document.querySelector('.cake-wrapper');

const audio = document.getElementById('happy-birthday-music');

// Các biến mới để điều khiển dây video và chữ
const photoGarland = document.querySelector('.photo-garland');
const happyBirthdayText = document.querySelector('.happy-birthday-text');
const videos = document.querySelectorAll('.photo-garland video');

// Các biến và hằng số cho hiệu ứng mới
const balloonContainer = document.getElementById('balloon-container');
const moonAndClouds = document.getElementById('moon-and-clouds');
const constellationContainer = document.getElementById('constellation-container');
const fireflyContainer = document.getElementById('firefly-container');
const twinklingStarsContainer = document.getElementById('twinkling-stars-container');

let activeTool = null;
let balloonInterval = null;
let fireflyInterval = null;
let starInterval = null;

const candleStates = Array.from(candles).map(candle => {
    return {
        element: candle.querySelector('.flame'),
        isLit: !candle.querySelector('.flame').classList.contains('blown')
    };
});

let fireworksTriggeredLit = false;
let fireworksTriggeredBlown = false;

windCursor.style.display = 'none';

flameTool.addEventListener('click', () => {
    setActiveTool('flame');
});

blowerTool.addEventListener('click', () => {
    setActiveTool('blower');
});

window.playFireworksAndTrigger = () => {
    setActiveTool('fireworks');
    playFireworksSound();
    createFireworks();
    setTimeout(() => {
        setActiveTool('blower');
    }, 1500);
}

function setActiveTool(tool) {
    body.classList.remove('flame-cursor', 'blower-cursor');
    flameTool.classList.remove('active');
    blowerTool.classList.remove('active');
    fireworksTool.classList.remove('active');

    if (tool === 'flame') {
        activeTool = 'flame';
        body.classList.add('flame-cursor');
        flameTool.classList.add('active');
    } else if (tool === 'blower') {
        activeTool = 'blower';
        body.classList.add('blower-cursor');
        blowerTool.classList.add('active');
    } else if (tool === 'fireworks') {
        activeTool = 'fireworks';
        fireworksTool.classList.add('active');
    } else {
        activeTool = null;
        body.style.cursor = 'default';
    }
}

function playFireworksSound() {
    if (fireworksSound) {
        fireworksSound.currentTime = 0;
        fireworksSound.play();
    }
}

function createRocket(x) {
    const rocket = document.createElement('div');
    rocket.classList.add('firework');
    rocket.style.left = `${x}px`;
    rocket.style.bottom = '0px';
    const color = getRandomColor();
    rocket.style.backgroundColor = color;
    rocket.style.width = '12px';
    rocket.style.height = '30px';
    rocket.style.borderRadius = '6px';
    fireworksContainer.appendChild(rocket);

    const targetY = Math.random() * 0.4 * window.innerHeight + 0.6 * window.innerHeight;
    const duration = Math.random() * 1000 + 1500;

    rocket.style.transition = `bottom ${duration}ms ease-out, transform 0.1s ease-in-out`;
    rocket.style.transform = 'scaleY(1)';

    setTimeout(() => {
        const rect = rocket.getBoundingClientRect();
        explodeFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, color);
        rocket.remove();
    }, 1500);

    rocket.style.bottom = `${targetY}px`;
    rocket.style.transform = 'scaleY(0.5)';
}

function createFireworks() {
    playFireworksSound();
    const numberOfFireworks = 15;
    const screenWidth = window.innerWidth;
    for (let i = 0; i < numberOfFireworks; i++) {
        const startX = Math.random() * screenWidth;
        createRocket(startX);
    }
}

function explodeFirework(x, y, color) {
    const numberOfParticles = 40;
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = color;
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 10 + 5;
        const size = Math.random() * 12 + 12;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.animation = `explode-particle ${Math.random() * 700 + 700}ms ease-out forwards`;

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const gravity = 0.05;
        let time = 0;
        const animateParticle = () => {
            particle.style.left = `${x + vx * time}px`;
            particle.style.top = `${y + vy * time + 0.5 * gravity * time * time}px`;
            time += 0.7;
            if (time < 150) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        animateParticle();

        fireworksContainer.appendChild(particle);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters.charAt(Math.floor(Math.random() * 16));
    }
    return color;
}

// Hàm tạo bóng bay
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    // Màu sắc bóng bay ngẫu nhiên
    const colors = ['#ff6347', '#ffb6c1', '#add8e6', '#98fb98', '#ffd700', '#da70d6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = randomColor;

    // Vị trí và thời gian bay ngẫu nhiên
    const randomLeft = Math.random() * 100;
    const randomDuration = Math.random() * 5 + 15;
    const randomSwayX = (Math.random() - 0.5) * 200;
    const randomSwayDeg = (Math.random() - 0.5) * 10;

    balloon.style.left = `${randomLeft}vw`;
    balloon.style.animationDuration = `${randomDuration}s`;
    balloon.style.setProperty('--sway-x', `${randomSwayX}px`);
    balloon.style.setProperty('--sway-deg', `${randomSwayDeg}deg`);

    balloonContainer.appendChild(balloon);

    // Xóa bóng bay sau khi nó bay ra ngoài màn hình
    setTimeout(() => {
        balloon.remove();
    }, randomDuration * 1000);
}

// ---------------------------------
// CÁC HÀM CỦA CHÒM SAO ĐƯỢC ĐƯA LÊN ĐẦU
// VÀ VỊ TRÍ ĐÃ ĐƯỢC SỬA
// ---------------------------------
function createStar(x, y) {
    const star = document.createElement('div');
    star.classList.add('constellation-star');
    star.style.left = `${x}vw`;
    star.style.top = `${y}vh`;
    constellationContainer.appendChild(star);
    return star;
}

function connectStars(star1, star2) {
    const line = document.createElement('div');
    line.classList.add('constellation-line');
    const pos1 = star1.getBoundingClientRect();
    const pos2 = star2.getBoundingClientRect();

    const x1 = pos1.left + pos1.width / 2;
    const y1 = pos1.top + pos1.height / 2;
    const x2 = pos2.left + pos2.width / 2;
    const y2 = pos2.top + pos2.height / 2;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    // Tăng độ trễ để các đường xuất hiện dần dần
    const delay = Math.random() * 1.5 + 0.5;
    line.style.transitionDelay = `${delay}s`;

    constellationContainer.appendChild(line);

    setTimeout(() => {
        line.style.opacity = '1';
    }, 100);
}

function createConstellations() {
    // Các sao chính trong chòm Xử Nữ (toạ độ tự canh chỉnh)
    const starsData = [
        { x: 20, y: 30, name: "Spica" },       // α Vir - sao sáng nhất
        { x: 10, y: 20, name: "Zavijava" },    // β Vir
        { x: 30, y: 15, name: "Porrima" },     // γ Vir
        { x: 40, y: 25, name: "Vindemiatrix" },// ε Vir
        { x: 50, y: 35, name: "Heze" },        // ζ Vir
        { x: 60, y: 45, name: "Syrma" },       // ι Vir
        { x: 35, y: 40, name: "Auva" },        // δ Vir
        { x: 25, y: 50, name: "Minelauva" }    // ο Vir
    ];

    // Các đường nối mô phỏng hình dáng chòm sao
    const connections = [
        [0, 2], [2, 3], [3, 4], [4, 5],
        [2, 6], [6, 7], [1, 2]
    ];

    const totalStars = [];

    // Tạo các ngôi sao
    starsData.forEach(star => {
        const starEl = createStar(star.x, star.y);
        totalStars.push(starEl);
    });

    // Nối sao lại
    connections.forEach(conn => {
        const startStar = totalStars[conn[0]];
        const endStar = totalStars[conn[1]];
        connectStars(startStar, endStar);
    });
}

// ---------------------------------
// HẾT PHẦN CẬP NHẬT CỦA CHÒM SAO
// ---------------------------------

// Hàm tạo đom đóm
function createFirefly() {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');

    const randomLeft = Math.random() * window.innerWidth;
    const randomTop = Math.random() * window.innerHeight;
    const randomDuration = Math.random() * 10 + 5;
    const randomDelay = Math.random() * 5;

    firefly.style.left = `${randomLeft}px`;
    firefly.style.top = `${randomTop}px`;
    firefly.style.animationDuration = `${randomDuration}s`;
    firefly.style.animationDelay = `${randomDelay}s`;
    
    // Animation riêng để di chuyển ngẫu nhiên
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    firefly.style.animationName = `firefly-move, firefly-blink`;
    firefly.style.animationDirection = `alternate`;
    firefly.style.animationTimingFunction = `ease-in-out`;

    const styleSheet = document.styleSheets[0];
    const keyframeRule = `@keyframes firefly-move {
        0% { transform: translate(0, 0); }
        50% { transform: translate(${randomX}px, ${randomY}px); }
        100% { transform: translate(0, 0); }
    }`;

    styleSheet.insertRule(keyframeRule, styleSheet.cssRules.length);

    fireflyContainer.appendChild(firefly);

    setTimeout(() => {
        firefly.remove();
        styleSheet.deleteRule(styleSheet.cssRules.length - 1);
    }, randomDuration * 1000);
}

// Hàm tạo ngôi sao nhấp nháy
function createTwinklingStar() {
    const star = document.createElement('div');
    star.classList.add('twinkling-star');

    const randomLeft = Math.random() * 100;
    const randomTop = Math.random() * 100;
    const randomSize = Math.random() * 3 + 2;
    const randomDelay = Math.random() * 5;

    star.style.left = `${randomLeft}vw`;
    star.style.top = `${randomTop}vh`;
    star.style.width = `${randomSize}px`;
    star.style.height = `${randomSize}px`;
    star.style.animationDelay = `${randomDelay}s`;

    twinklingStarsContainer.appendChild(star);
}

function startFireflies() {
    if (!fireflyInterval) {
        fireflyInterval = setInterval(createFirefly, 500);
    }
}

function stopAllNewEffects() {
    // Tắt các hiệu ứng nền mới
    body.classList.remove('pastel-gradient', 'aurora-effect');
    balloonContainer.classList.remove('active');
    moonAndClouds.classList.remove('active');
    constellationContainer.innerHTML = '';
    fireflyContainer.innerHTML = '';
    twinklingStarsContainer.innerHTML = ''; // Xóa các ngôi sao

    if (balloonInterval) {
        clearInterval(balloonInterval);
        balloonInterval = null;
    }
    if (fireflyInterval) {
        clearInterval(fireflyInterval);
        fireflyInterval = null;
    }
    if (starInterval) {
        clearInterval(starInterval);
        starInterval = null;
    }
}

function checkAndTriggerFireworks() {
    const allLit = candleStates.every(state => state.isLit);
    const allBlown = candleStates.every(state => !state.isLit);

    if (allLit) {
        if (!fireworksTriggeredLit) {
            createFireworks();
            fireworksTriggeredLit = true;
            fireworksTriggeredBlown = false;
        }
        body.classList.remove('light-background');
        body.classList.add('dark-background');

        // Bật hiệu ứng nền đen: Aurora, Moon/Clouds, Constellations, Fireflies, Twinkling Stars
        body.classList.add('aurora-effect');
        moonAndClouds.classList.add('active');
        createConstellations();
        startFireflies();
        // Tạo 50 ngôi sao nhấp nháy
        for (let i = 0; i < 50; i++) {
            createTwinklingStar();
        }

        // Tắt hiệu ứng nền trắng
        body.classList.remove('pastel-gradient');
        balloonContainer.classList.remove('active');
        if (balloonInterval) clearInterval(balloonInterval);

        // Ẩn dây video và chữ khi nến sáng
        photoGarland.classList.add('hidden');
        happyBirthdayText.classList.add('hidden');
        videos.forEach(video => {
            video.pause();
        });
    } else if (allBlown) {
        if (!fireworksTriggeredBlown) {
            createFireworks();
            fireworksTriggeredBlown = true;
            fireworksTriggeredLit = false;
        }
        body.classList.remove('dark-background');
        body.classList.add('light-background');

        // Bật hiệu ứng nền trắng: Gradient pastel + Balloons
        body.classList.add('pastel-gradient');
        balloonContainer.classList.add('active');
        // Tạo bóng bay mỗi giây
        if (!balloonInterval) {
            balloonInterval = setInterval(createBalloon, 1000);
        }

        // Tắt hiệu ứng nền đen
        stopAllNewEffects();

        // Hiện dây video và chữ khi nến tắt hết
        photoGarland.classList.remove('hidden');
        happyBirthdayText.classList.remove('hidden');
        videos.forEach(video => {
            video.play();
        });
    } else {
        fireworksTriggeredLit = false;
        fireworksTriggeredBlown = false;
        // Tắt tất cả hiệu ứng khi có nến sáng, có nến tắt
        stopAllNewEffects();

        // Ẩn dây video và chữ khi có nến sáng, có nến tắt
        photoGarland.classList.add('hidden');
        happyBirthdayText.classList.add('hidden');
        videos.forEach(video => {
            video.pause();
        });
    }
}

candles.forEach((candle, index) => {
    const flame = candle.querySelector('.flame');

    flame.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeTool === 'blower' && !flame.classList.contains('blown')) {
            flame.classList.add('blown-effect');
            setTimeout(() => {
                flame.classList.remove('blown-effect');
                flame.classList.add('blown');
            }, 500);
            candleStates[index].isLit = false;
            checkAndTriggerFireworks();
        } else if (activeTool === 'flame' && flame.classList.contains('blown')) {
            flame.classList.remove('blown');
            candleStates[index].isLit = true;
            checkAndTriggerFireworks();
        }
    });

    candle.addEventListener('click', () => {
        if (activeTool === 'blower' && flame && !flame.classList.contains('blown')) {
            flame.classList.add('blown-effect');
            setTimeout(() => {
                flame.classList.remove('blown-effect');
                flame.classList.add('blown');
            }, 500);
            candleStates[index].isLit = false;
            checkAndTriggerFireworks();
        } else if (activeTool === 'flame' && flame && flame.classList.contains('blown')) {
            flame.classList.remove('blown');
            candleStates[index].isLit = true;
            checkAndTriggerFireworks();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    setActiveTool('blower');
    cakeWrapper.classList.add('cake-loaded');
    
    // Đảm bảo nến luôn sáng ban đầu
    candleStates.forEach(state => state.isLit = true);

    // Ẩn dây video và chữ ngay từ khi tải trang
    photoGarland.classList.add('hidden');
    happyBirthdayText.classList.add('hidden');

    checkAndTriggerFireworks();

    audio.play();
});

const backButton = document.getElementById('back-button');
if (backButton) {
    backButton.addEventListener('click', () => {
        window.location.href = 'special_effect.html';
    });
}