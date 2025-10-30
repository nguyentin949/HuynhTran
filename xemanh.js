document.addEventListener('DOMContentLoaded', () => {
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenVideo = document.getElementById('fullscreen-video');
    const fullscreenText = document.getElementById('fullscreen-text');
    const backToGalleryBtn = document.getElementById('backToGalleryBtn');
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    const body = document.body; // Lấy thẻ body để lắng nghe click nền

    const clickRippleContainer = document.getElementById('click-ripple-container');
    const shootingStarContainer = document.getElementById('shooting-star-container');
    const screenSparkleContainer = document.getElementById('screen-sparkle-container');

    // Hiệu ứng tải trang
    setTimeout(() => {
        fullscreenContainer.classList.add('loaded');
    }, 100);

    // Lấy URL và các tham số
    const params = new URLSearchParams(window.location.search);
    const mediaUrl = params.get('img');
    const mediaText = params.get('text');
    const mediaIndex = params.get('index'); // Lấy chỉ mục từ URL

    // Gán dữ liệu vào trang
    if (mediaUrl) {
        if (mediaUrl.match(/\.(mp4|webm|ogg)$/i)) {
            fullscreenVideo.src = mediaUrl;
            fullscreenVideo.style.display = 'block';
            fullscreenImage.style.display = 'none';
        } else {
            fullscreenImage.src = mediaUrl;
            fullscreenImage.style.display = 'block';
            fullscreenVideo.style.display = 'none';
        }
    }
    if (mediaText) {
        fullscreenText.textContent = mediaText;
    }

    // Xử lý nút quay lại
    backToGalleryBtn.addEventListener('click', () => {
        // Quay lại trang chính với chỉ mục đã lưu
        if (mediaIndex !== null) {
            window.location.href = `hinhanh.html?index=${mediaIndex}`;
        } else {
            window.location.href = 'hinhanh.html';
        }
    });

    /* --- Click Effects --- */

    // Hiệu ứng thả tim khi click vào media
    fullscreenImage.addEventListener('click', createHeartReaction);
    fullscreenVideo.addEventListener('click', createHeartReaction);

    function createHeartReaction(event) {
        event.stopPropagation(); // Ngăn sự kiện click lan ra body
        const heart = document.createElement('div');
        heart.classList.add('heart-reaction');
        heart.innerHTML = '&#10084;'; // Ký tự trái tim
        
        // Lấy vị trí click tương đối trong phần tử media
        const rect = event.target.getBoundingClientRect();
        heart.style.left = `${event.clientX - rect.left}px`;
        heart.style.top = `${event.clientY - rect.top}px`;
        
        event.target.closest('.fullscreen-container').appendChild(heart); // Thêm vào container chính
        heart.addEventListener('animationend', () => heart.remove());
    }

    // Hiệu ứng lan tỏa ánh sáng khi click bên ngoài container
    body.addEventListener('click', (event) => {
        // Kiểm tra nếu click không phải trên fullscreen-container hoặc con của nó
        if (!fullscreenContainer.contains(event.target)) {
            createClickRipple(event);
        }
    });

    function createClickRipple(event) {
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        const size = Math.random() * 100 + 50; // Kích thước ngẫu nhiên
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - size / 2}px`;
        ripple.style.top = `${event.clientY - size / 2}px`;
        clickRippleContainer.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    }

    /* --- Background Music & Interactive Effects (Confetti, Sparkles) --- */
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play().catch(e => console.error("Autoplay prevented:", e));

    const confettiContainer = document.getElementById('confetti-container');
    const cursorSparklesContainer = document.getElementById('cursor-sparkles');
    const confettiColors = ['var(--color-purple-neon)', 'var(--color-blue-neon)', 'var(--color-pink-neon)', 'var(--color-green-neon)', "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#fff", "#ffa500"];
    const shapes = ['rect', 'circle', 'heart', 'star'];
    const sparkleColors = ["#fff", "#ffcc00", "#ff0077", "#00bfff", "#a855f7"];

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const size = Math.random() * 10 + 5;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.setProperty('--size', `${size}px`);
        confetti.style.setProperty('--color', color);
        confetti.style.setProperty('--duration', `${Math.random() * 2 + 2}s`);
        confetti.style.setProperty('--delay', `${Math.random() * 1}s`);
        confetti.style.setProperty('--translateX', `${(Math.random() - 0.5) * 200}px`);
        confetti.style.setProperty('--rotate', `${Math.random() * 1000}deg`);
        confetti.style.setProperty('--shape', shape);
        confettiContainer.appendChild(confetti);
        confetti.addEventListener('animationend', () => confetti.remove());
    }

    if (confettiContainer) {
        setInterval(createConfetti, 500);
    }

    function createCursorSparkle(x, y) {
        const sparkle = document.createElement('span');
        sparkle.classList.add('cursor-sparkle');
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        const size = Math.random() * 5 + 2;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        const duration = Math.random() * 1.5 + 0.5;
        sparkle.style.animationDuration = `${duration}s`;
        cursorSparklesContainer.appendChild(sparkle);
        sparkle.addEventListener('animationend', () => sparkle.remove());
    }

    document.addEventListener('mousemove', (e) => {
        createCursorSparkle(e.clientX, e.clientY);
    });

    // Hiệu ứng sao băng
    function createShootingStar() {
        if (!shootingStarContainer) return;
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.5;
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        shootingStarContainer.appendChild(star);
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // Hiệu ứng lấp lánh trên màn hình
    function createScreenSparkle() {
        if (!screenSparkleContainer) return;
        const sparkle = document.createElement('div');
        sparkle.classList.add('screen-sparkle');
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `-${Math.random() * 5}s`;
        screenSparkleContainer.appendChild(sparkle);
        sparkle.addEventListener('animationend', () => sparkle.remove());
    }

    setInterval(createShootingStar, 5000);
    setInterval(() => createScreenSparkle, 200);


    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 2, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }
            },
            "retina_detect": true
        });
    }
});