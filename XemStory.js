document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử HTML
    const fullscreenVideo = document.getElementById('fullscreen-video');
    const fullscreenText = document.getElementById('fullscreen-text');
    const backToGalleryBtn = document.getElementById('backToGalleryBtn');
    const replayBtn = document.getElementById('replayBtn');
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    const body = document.body;

    // Các container cho hiệu ứng
    const clickRippleContainer = document.getElementById('click-ripple-container');
    const shootingStarContainer = document.getElementById('shooting-star-container');
    const screenSparkleContainer = document.getElementById('screen-sparkle-container');
    const crystalEffectContainer = document.getElementById('crystal-effect-container');
    const loveHeartsContainer = document.getElementById('love-hearts-container'); 
    const backgroundMusic = document.getElementById('backgroundMusic');

    // CÁC CONTAINER HIỆU ỨNG MỚI
    const neonPulseContainer = document.getElementById('neon-pulse-container');
    const stardustContainer = document.getElementById('stardust-container');
    const meteorShowerContainer = document.getElementById('meteor-shower-container');
    const glowFlickerContainer = document.getElementById('glow-flicker-container');
    const lightOrbsContainer = document.getElementById('light-orbs-container');
    const planetContainer = document.getElementById('planet-container');
    //------------------------------------->


    // Hiệu ứng tải trang ban đầu
    setTimeout(() => {
        fullscreenContainer.classList.add('loaded');
    }, 100);

    // Lấy URL và các tham số từ địa chỉ trang
    const params = new URLSearchParams(window.location.search);
    const mediaUrl = params.get('url');
    const mediaText = params.get('text');
    const mediaIndex = params.get('index'); // Lấy chỉ mục từ URL

    console.log("URL của video được truyền:", mediaUrl);
    console.log("Văn bản được truyền:", mediaText);

    // Xử lý video và văn bản
    if (mediaUrl) {
        fullscreenVideo.src = mediaUrl;
        fullscreenVideo.style.display = 'block';
    } else {
        console.error("Không tìm thấy URL video. Vui lòng kiểm tra lại đường dẫn!");
        fullscreenVideo.style.display = 'none';
    }

    // Hiển thị và chạy hiệu ứng đánh chữ nếu có văn bản
    if (fullscreenText && mediaText) {
        fullscreenText.style.display = 'block';
        typeWriterEffect(mediaText, fullscreenText);
    } else if (fullscreenText) {
        fullscreenText.style.display = 'none';
    }

    // Bắt đầu phát video khi sẵn sàng
    fullscreenVideo.oncanplaythrough = function() {
        fullscreenVideo.play().catch(e => console.error("Video play failed:", e));
        // Kích hoạt hiệu ứng Neon Pulse khi video sẵn sàng
        if (neonPulseContainer) createNeonPulseEffect();
    };

    // Sự kiện cho nút quay lại
    if (backToGalleryBtn) {
        backToGalleryBtn.addEventListener('click', () => {
            // Quay lại trang chính với chỉ mục đã lưu
            if (mediaIndex !== null) {
                window.location.href = `hinhanh.html?index=${mediaIndex}`;
            } else {
                window.location.href = 'hinhanh.html';
            }
        });
    }

    // Sự kiện cho nút phát lại
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            fullscreenVideo.currentTime = 0;
            fullscreenVideo.play().catch(e => console.error("Replay failed:", e));
        });
    }

    // --- Hàm hiệu ứng đánh chữ ---
    /**
     * @param {string} text - Văn bản cần hiển thị.
     * @param {HTMLElement} element - Phần tử HTML để hiển thị văn bản.
     */
    function typeWriterEffect(text, element) {
        let i = 0;
        const speed = 100; // Tốc độ đánh chữ (mili giây)
        element.textContent = ''; // Xóa nội dung cũ trước khi chạy hiệu ứng
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // --- Xử lý click tổng thể để phân biệt click vào video và click ngoài ---
    document.addEventListener('click', (e) => {
        // Kiểm tra xem click có phải trên phần tử video hay không
        if (e.target.closest('#fullscreen-video')) {
            createLoveHearts(e.clientX, e.clientY);
        } else {
            createClickRipple(e.clientX, e.clientY);
        }
        createCrystalSparkles(e.clientX, e.clientY);
    });

    // --- Hàm tạo hiệu ứng gợn sóng (được tách ra) ---
    function createClickRipple(x, y) {
        const ripple = document.createElement('span');
        ripple.classList.add('click-ripple');
        const size = Math.max(clickRippleContainer.clientWidth, clickRippleContainer.clientHeight);
        const rect = clickRippleContainer.getBoundingClientRect();

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.top = `${y - rect.top - size / 2}px`;
        ripple.style.left = `${x - rect.left - size / 2}px`;

        clickRippleContainer.appendChild(ripple);
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    // --- Hiệu ứng Thả Tim ---
    function createLoveHearts(x, y) {
        const numHearts = 5 + Math.floor(Math.random() * 5); // 5 đến 9 trái tim
        const heartIcons = ['💖', '❤️', '💞', '💕', '💓'];

        if (!loveHeartsContainer) {
            console.warn("Element with ID 'love-hearts-container' not found. Love hearts effect cannot run.");
            return;
        }

        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('love-heart');
            heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;

            const destX = (Math.random() - 0.5) * 300;
            const destY = - (Math.random() * 200 + 100);

            heart.style.setProperty('--dest-x', `${destX}px`);
            heart.style.setProperty('--dest-y', `${destY}px`);
            
            loveHeartsContainer.appendChild(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }

    // --- Hiệu ứng Tinh thể Ánh sáng tại con trỏ chuột ---
    function createCrystalSparkles(x, y) {
        const numCrystals = 5 + Math.floor(Math.random() * 5); // 5 đến 9 tinh thể
        const colors = ['#fff', '#f0f', '#0ff', '#ff0', '#00f']; // Màu sắc tinh thể

        if (!crystalEffectContainer) {
            console.warn("Element with ID 'crystal-effect-container' not found. Crystal sparkles effect cannot run.");
            return;
        }

        for (let i = 0; i < numCrystals; i++) {
            const crystal = document.createElement('div');
            crystal.classList.add('crystal-sparkle'); // Kích thước ngẫu nhiên
            const size = Math.random() * 8 + 4; // 4px đến 12px
            crystal.style.width = `${size}px`;
            crystal.style.height = `${size}px`; // Vị trí ban đầu tại con trỏ chuột
            crystal.style.left = `${x}px`;
            crystal.style.top = `${y}px`; // Di chuyển ngẫu nhiên ra xa
            const offsetX = (Math.random() - 0.5) * 200; // -100px đến 100px
            const offsetY = (Math.random() - 0.5) * 200; // Màu sắc ngẫu nhiên
            crystal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Tạo animation
            crystal.style.setProperty('--translate-x', `${offsetX}px`);
            crystal.style.setProperty('--translate-y', `${offsetY}px`);
            crystal.style.animationDuration = `${1 + Math.random() * 1.5}s`; // 1s đến 2.5s
            crystal.style.animationDelay = `${Math.random() * 0.2}s`; // Tạo độ trễ nhỏ
            crystalEffectContainer.appendChild(crystal);
            crystal.addEventListener('animationend', () => {
                crystal.remove();
            });
        }
    }

    // --- Hiệu ứng Sao Băng ---
    function createShootingStar() {
        if (!shootingStarContainer) return;
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.5;
        const duration = 2 + Math.random() * 3;
        const size = 50 + Math.random() * 100;
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        shootingStarContainer.appendChild(star);
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }
    // Chạy hiệu ứng Sao băng
    setInterval(createShootingStar, 3000);

    // 1. Hiệu ứng Nhịp đập Neon (Neon Pulse)
    function createNeonPulseEffect() {
        if (!neonPulseContainer) return;
        const pulse = document.createElement('div');
        pulse.classList.add('neon-pulse-circle');
        neonPulseContainer.appendChild(pulse);
        pulse.addEventListener('animationend', () => pulse.remove());
    }

    // 2. Hiệu ứng Bụi sao (Stardust)
    function createStardust() {
        if (!stardustContainer) return;
        const star = document.createElement('div');
        star.classList.add('stardust-star');
        const size = Math.random() * 3 + 1; // 1px to 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${1 + Math.random() * 2}s`;
        stardustContainer.appendChild(star);
        star.addEventListener('animationend', () => star.remove());
    }
    setInterval(createStardust, 100);

    // 3. Hiệu ứng Mưa sao băng (Meteor Shower)
    function createMeteor() {
        if (!meteorShowerContainer) return;
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * -100;
        const duration = 1 + Math.random() * 2;
        meteor.style.left = `${startX}px`;
        meteor.style.top = `${startY}px`;
        meteor.style.animationDuration = `${duration}s`;
        meteorShowerContainer.appendChild(meteor);
        meteor.addEventListener('animationend', () => meteor.remove());
    }
    setInterval(createMeteor, 1500);

    // 4. Hiệu ứng Nhấp nháy ánh sáng (Glow Flicker)
    if (glowFlickerContainer) {
        document.addEventListener('mousemove', (e) => {
            glowFlickerContainer.style.setProperty('--mouse-x', `${e.clientX}px`);
            glowFlickerContainer.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    }


    // 5. Hiệu ứng Bong bóng ánh sáng (Light Orbs)
    function createLightOrb() {
        if (!lightOrbsContainer) return;
        const orb = document.createElement('div');
        orb.classList.add('light-orb');
        const size = Math.random() * 40 + 20; // Kích thước 20-60px
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;

        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + Math.random() * 100; // Bắt đầu từ dưới màn hình
        const endX = Math.random() * window.innerWidth - 100;
        const endY = -Math.random() * 100; // Kết thúc ở trên màn hình

        orb.style.setProperty('--start-x', `${startX}px`);
        orb.style.setProperty('--start-y', `${startY}px`);
        orb.style.setProperty('--end-x', `${endX}px`);
        orb.style.setProperty('--end-y', `${endY}px`);
        orb.style.animationDuration = `${10 + Math.random() * 10}s`; // 10-20s
        orb.style.animationDelay = `${Math.random() * 5}s`; // Độ trễ ngẫu nhiên
        
        lightOrbsContainer.appendChild(orb);

        orb.addEventListener('animationend', () => orb.remove());
    }
    setInterval(createLightOrb, 1000);

    // 6. Hiệu ứng hành tinh (mới)
    function createPlanet() {
        if (!planetContainer) return;
        const planet = document.createElement('div');
        planet.classList.add('planet-orb');
        
        const size = Math.random() * 80 + 50; // 50px đến 130px
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;

        planet.style.setProperty('--start-x', `${startX}px`);
        planet.style.setProperty('--start-y', `${startY}px`);
        planet.style.setProperty('--end-x', `${endX}px`);
        planet.style.setProperty('--end-y', `${endY}px`);

        planet.style.animationDuration = `${20 + Math.random() * 10}s`;
        
        planetContainer.appendChild(planet);
        
        planet.addEventListener('animationend', () => planet.remove());
    }

    // Chạy hiệu ứng hành tinh
    setInterval(createPlanet, 10000);
});