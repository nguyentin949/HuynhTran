document.addEventListener('DOMContentLoaded', () => {
    const messageHeading = document.getElementById('messageHeading');
    const messageContent = document.getElementById('messageContent');
    const pageTitle = document.getElementById('pageTitle');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const body = document.body;
    const confettiContainer = document.getElementById('confetti-container');
    const fallingElementsContainer = document.getElementById('falling-elements-container');
    const cursorSparklesContainer = document.getElementById('cursor-sparkles');
    const buttonContainer = document.querySelector('.button-container');

    const messages = [
        {
            title: "Hành Trình Mới",
            content: "Sinh nhật vui vẻ! Cuộc đời là một cuốn sách, và mỗi năm là một chương mới.\nChúc bạn sẽ viết lên những câu chuyện tuyệt vời và mở ra những chương mới đầy thú vị.",
            bodyClass: "loichuc-1",
            nextButtonText: "Kế tiếp"
        },
        {
            title: "Đi để nhớ!",
            content: "Chúc mừng sinh nhật! Đừng đếm năm tháng, hãy đếm những kỷ niệm và trải nghiệm đáng nhớ.\nCuộc đời là một cuộc hành trình, chúc cho cuộc hành trình của bạn đầy màu sắc và tràn ngập niềm vui!",
            bodyClass: "loichuc-2",
            nextButtonText: "Kế tiếp"
        },
        {
            title: "Biển ánh sáng",
            content: "Sinh nhật hạnh phúc! Trong cuộc đời này, chúng ta giống như những chiếc đèn giữa đêm tối,\nChúc bạn sẽ tạo ra bãi biển ánh sáng riêng biệt giữa sóng to gió lớn của cuộc đời.",
            bodyClass: "loichuc-3",
            nextButtonText: "Xem tiếp=>"
        }
    ];

    const musicFiles = [
        "Audio_MP3/loichuc1.mp3",
        "Audio_MP3/loichuc2.mp3",
        "Audio_MP3/loichuc3.mp3",
    ];

    let currentMessageIndex = 0;
    const audioPlayer = new Audio();
    audioPlayer.loop = true;

    const params = new URLSearchParams(window.location.search);
    const indexParam = params.get('msg');
    if (indexParam !== null && !isNaN(parseInt(indexParam))) {
        const parsedIndex = parseInt(indexParam);
        if (parsedIndex >= 0 && parsedIndex < messages.length) {
            currentMessageIndex = parsedIndex;
        }
    }
    
    // Function để phát nhạc
    function playMusic(index) {
        if (index >= 0 && index < musicFiles.length) {
            audioPlayer.src = musicFiles[index];
            const playPromise = audioPlayer.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Tự động phát thành công
                }).catch(e => {
                    // Tự động phát bị chặn, thông báo cho người dùng
                    console.log("Audio playback was prevented. User interaction might be required.", e);
                });
            }
        }
    }

    function updateMessage(index) {
        const message = messages[index];
        
        pageTitle.textContent = message.title;
        messageHeading.textContent = message.title;
        messageContent.textContent = message.content;

        body.className = '';
        body.classList.add('loichuc-body', message.bodyClass);

        prevButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';

        nextButton.textContent = message.nextButtonText;
        document.querySelector('.message-card').style.animation = 'none';
        void document.querySelector('.message-card').offsetWidth;
        document.querySelector('.message-card').style.animation = 'fadeIn 1s ease-out forwards';

        if (index === 0) {
            prevButton.href = 'podcast.html'; 
        } else {
            prevButton.href = `${window.location.pathname}?msg=${index - 1}`;
        }

        if (index < messages.length - 1) {
            nextButton.href = `${window.location.pathname}?msg=${index + 1}`;
        } else {
           nextButton.href = "special_effect.html";
        }

        // Gọi hàm phát nhạc
        playMusic(index);

        // Hiệu ứng Đom đóm chỉ xuất hiện ở trang thứ ba
        if (index === 2) {
            // Remove existing fireflies to prevent accumulation
            document.querySelectorAll('.firefly').forEach(f => f.remove());
            for (let i = 0; i < 30; i++) {
                createFirefly();
            }
        } else {
             document.querySelectorAll('.firefly').forEach(f => f.remove());
        }
        
    }

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        audioPlayer.pause();
        window.location.href = prevButton.href;
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        audioPlayer.pause();
        window.location.href = nextButton.href;
    });

    window.addEventListener('popstate', (event) => {
        const stateIndex = event.state ? event.state.index : 0;
        if (stateIndex !== undefined && stateIndex !== currentMessageIndex) {
            currentMessageIndex = stateIndex;
            updateMessage(currentMessageIndex);
        }
    });

    updateMessage(currentMessageIndex);
    
    // Khởi tạo các hiệu ứng bắt mắt hơn
    
    // particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#ffffff", "#ffcc00", "#ff0077", "#00bfff", "#a855f7", "#32cd32"] },
            "shape": { "type": "star", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
            "opacity": { "value": 0.7, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 5, "random": true, "anim": { "enable": true, "speed": 20, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6, "direction": "top-right", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
        },
        "retina_detect": true
    });

    // Hiệu ứng pháo hoa
    const confettiColors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#fff", "#ffa500"];
    function createConfetti() {
        if (!confettiContainer) return;
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confettiContainer.appendChild(confetti);

        const size = Math.random() * 10 + 5;
        confetti.style.setProperty('--size', `${size}px`);
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        const duration = Math.random() * 2 + 3;
        const delay = Math.random() * 0.5;
        const translateX = (Math.random() - 0.5) * 50;
        const rotate = Math.random() * 1080 + 360;
        const borderRadius = Math.random() > 0.5 ? '50%' : '0';

        confetti.style.setProperty('--duration', `${duration}s`);
        confetti.style.setProperty('--delay', `${delay}s`);
        confetti.style.setProperty('--translateX', `${translateX}vw`);
        confetti.style.setProperty('--rotate', `${rotate}deg`);
        confetti.style.setProperty('--border-radius', borderRadius);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
    setInterval(createConfetti, 100);

    // Hiệu ứng ngôi sao và quà rơi
    const fallingElements = ['✨', '🌟', '💖', '💫', '⭐'];
    const fallingGifts = ['🎁', '🎈', '🎉', '🎊', '💝'];
    const fallingColors = ["#fff", "#ffcc00", "#ff0077", "#a855f7"];

    function createFallingElement() {
        if (!fallingElementsContainer) return;

        const isGift = Math.random() > 0.7; // 30% cơ hội để là quà hoặc bóng bay
        const elementList = isGift ? fallingGifts : fallingElements;
        const element = document.createElement('span');
        element.classList.add('falling-element');
        element.textContent = elementList[Math.floor(Math.random() * elementList.length)];
        fallingElementsContainer.appendChild(element);

        const size = isGift ? (Math.random() * 2 + 1.2) : (Math.random() * 1.5 + 0.8);
        element.style.setProperty('--size', `${size}em`);
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `-10vh`;
        element.style.color = fallingColors[Math.floor(Math.random() * fallingColors.length)];
        
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 5;
        const drift = (Math.random() - 0.5) * 200;

        element.style.setProperty('--duration', `${duration}s`);
        element.style.setProperty('--delay', `${delay}s`);
        element.style.setProperty('--drift', `${drift}px`);

        element.addEventListener('animationend', () => {
            element.remove();
        });
    }
    setInterval(createFallingElement, 200);

    // Hiệu ứng lấp lánh chuột
    const sparkleColors = ["#fff", "#ffcc00", "#ff0077", "#00bfff", "#a855f7"];
    if (cursorSparklesContainer) {
        document.addEventListener('mousemove', (e) => {
            for (let i = 0; i < 2; i++) {
                const sparkle = document.createElement('div');
                sparkle.classList.add('cursor-sparkle');
                cursorSparklesContainer.appendChild(sparkle);

                const size = Math.random() * 8 + 3;
                sparkle.style.width = `${size}px`;
                sparkle.style.height = `${size}px`;
                sparkle.style.left = `${e.clientX + (Math.random() - 0.5) * 10}px`;
                sparkle.style.top = `${e.clientY + (Math.random() - 0.5) * 10}px`;
                sparkle.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
                
                const duration = Math.random() * 0.8 + 0.4;
                sparkle.style.setProperty('--duration', `${duration}s`);

                sparkle.addEventListener('animationend', () => {
                    sparkle.remove();
                });
            }
        });
    }

    // Hiệu ứng click chuột (gợn sóng)
    document.addEventListener('click', (e) => {
        const clickEffect = document.createElement('div');
        clickEffect.classList.add('click-effect');
        document.body.appendChild(clickEffect);

        clickEffect.style.left = `${e.clientX}px`;
        clickEffect.style.top = `${e.clientY}px`;
        clickEffect.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

        clickEffect.addEventListener('animationend', () => {
            clickEffect.remove();
        });
    });

    // Hiệu ứng Đom đóm
    function createFirefly() {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        document.body.appendChild(firefly);

        const size = Math.random() * 5 + 2;
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        firefly.style.left = `${Math.random() * 100}vw`;
        firefly.style.top = `${Math.random() * 100}vh`;

        const duration = Math.random() * 10 + 20;
        firefly.style.animationDuration = `${duration}s`;

        firefly.addEventListener('animationend', () => {
            firefly.remove();
        });
    }

    // Hiệu ứng sao băng
    function createShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        document.body.appendChild(star);

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.2;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 5;

        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }
    setInterval(createShootingStar, 5000);

    // Hiệu ứng bóng bay
    const balloonColors = ["#ff6347", "#ff4500", "#ffd700", "#32cd32", "#4169e1", "#8a2be2"];
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        document.body.appendChild(balloon);

        const size = Math.random() * 100 + 50;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`;

        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }
    setInterval(createBalloon, 2000);

    // Hiệu ứng mưa rơi
    function createRaindrop() {
        const raindrop = document.createElement('div');
        raindrop.classList.add('rain');
        document.body.appendChild(raindrop);

        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 5;

        raindrop.style.width = `${size}px`;
        raindrop.style.height = `${size * 10}px`;
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.animationDuration = `${duration}s`;
        raindrop.style.animationDelay = `${delay}s`;

        raindrop.addEventListener('animationend', () => {
            raindrop.remove();
        });
    }
    setInterval(createRaindrop, 100);

    // Hiệu ứng trái tim rơi
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        document.body.appendChild(heart);

        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
    setInterval(createFallingHeart, 300);

    // Hiệu ứng tuyết rơi
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        document.body.appendChild(snowflake);

        const size = Math.random() * 15 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.opacity = Math.random();
        snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }
    setInterval(createSnowflake, 500);

});