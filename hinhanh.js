document.addEventListener('DOMContentLoaded', () => {
    // Thêm loading screen animation - MỚI
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000); // Show loading for at least 1 second
    });

    /* --- Carousel Logic (GIỮ NGUYÊN) --- */
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Lưu trữ trạng thái "revealed" của từng hình ảnh
    const revealedState = new Array(carouselItems.length).fill(false);

    // Tìm và gắn sự kiện cho nút "Xem ảnh"
    const viewImageBtn = document.getElementById('viewImageBtn');

    // MỚI: Progress bar và counter
    const progressBar = document.querySelector('.progress-bar');
    const currentImageIndexEl = document.getElementById('currentImageIndex');
    const totalImagesEl = document.getElementById('totalImages');
    
    if (totalImagesEl) {
        totalImagesEl.textContent = carouselItems.length;
    }

    // MỚI: Thumbnail preview
    const thumbnailToggle = document.getElementById('thumbnailToggle');
    const thumbnailPreview = document.querySelector('.thumbnail-preview');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    
    // Create thumbnails - MỚI
    function createThumbnails() {
        if (!thumbnailContainer) return;
        
        thumbnailContainer.innerHTML = '';
        carouselItems.forEach((item, index) => {
            const thumbnailItem = document.createElement('div');
            thumbnailItem.classList.add('thumbnail-item');
            if (index === currentIndex) {
                thumbnailItem.classList.add('active');
            }
            
            const mediaElement = item.querySelector('img, video');
            const mediaText = item.querySelector('.image-overlay-text').textContent;
            
            if (mediaElement.tagName.toLowerCase() === 'video') {
                const video = document.createElement('video');
                video.src = mediaElement.src;
                video.muted = true;
                video.loop = true;
                video.playsinline = true;
                thumbnailItem.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = mediaElement.src;
                img.alt = mediaText;
                thumbnailItem.appendChild(img);
            }
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0,0,0,0.8));
                color: white;
                padding: 10px;
                font-size: 0.8em;
                text-align: center;
            `;
            overlay.textContent = mediaText;
            thumbnailItem.appendChild(overlay);
            
            thumbnailItem.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                thumbnailPreview.classList.add('hidden');
            });
            
            thumbnailContainer.appendChild(thumbnailItem);
        });
    }

    // Thumbnail toggle functionality - MỚI
    if (thumbnailToggle && thumbnailPreview) {
        thumbnailToggle.addEventListener('click', () => {
            if (thumbnailPreview.classList.contains('hidden')) {
                createThumbnails();
                thumbnailPreview.classList.remove('hidden');
                thumbnailToggle.textContent = 'Đóng';
            } else {
                thumbnailPreview.classList.add('hidden');
                thumbnailToggle.textContent = 'Xem tất cả';
            }
        });
        
        // Close thumbnail preview when clicking outside
        thumbnailPreview.addEventListener('click', (e) => {
            if (e.target === thumbnailPreview) {
                thumbnailPreview.classList.add('hidden');
                thumbnailToggle.textContent = 'Xem tất cả';
            }
        });
    }

    // MỚI: Update progress bar and counter
    function updateProgressAndCounter() {
        if (progressBar) {
            const progress = ((currentIndex + 1) / carouselItems.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        if (currentImageIndexEl) {
            currentImageIndexEl.textContent = currentIndex + 1;
        }
        
        // Update active thumbnail
        if (thumbnailContainer) {
            const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail-item');
            thumbnails.forEach((thumb, index) => {
                if (index === currentIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
    }

    function updateViewImageBtn() {
        const activeItem = carouselItems[currentIndex];
        const mediaElement = activeItem.querySelector('img, video');
        const isVideo = mediaElement.tagName.toLowerCase() === 'video';

        if (revealedState[currentIndex]) {
            viewImageBtn.classList.remove('hidden');
        } else {
            viewImageBtn.classList.add('hidden');
        }

        if (isVideo) {
            viewImageBtn.textContent = 'XemStory';
        } else {
            viewImageBtn.textContent = 'Xem ảnh';
        }
    }

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            // Remove all classes first
            item.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
                item.classList.add('prev');
            } else if (index === (currentIndex + 1) % carouselItems.length) {
                item.classList.add('next');
            }
            
            // Cập nhật trạng thái hiển thị của lớp phủ
            if (revealedState[index]) {
                item.classList.add('revealed');
            } else {
                item.classList.remove('revealed');
            }
        });
        
        updateViewImageBtn();
        updateProgressAndCounter(); // MỚI: Update progress bar and counter
    }

    // Xử lý khi trang được tải lại từ trang xem ảnh/video
    const params = new URLSearchParams(window.location.search);
    const savedIndex = params.get('index');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex, 10);
    }
    
    updateCarousel();

    // Navigation với smooth transitions - IMPROVED
    prevImageBtn.addEventListener('click', () => {
        // Thêm smooth transition effect
        const activeItem = carouselItems[currentIndex];
        activeItem.style.transform = 'scale(0.95) translateX(-20px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
            
            // Reset transform
            setTimeout(() => {
                activeItem.style.transform = '';
            }, 100);
        }, 100);
    });

    nextImageBtn.addEventListener('click', () => {
        // Thêm smooth transition effect
        const activeItem = carouselItems[currentIndex];
        activeItem.style.transform = 'scale(0.95) translateX(20px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel();
            
            // Reset transform
            setTimeout(() => {
                activeItem.style.transform = '';
            }, 100);
        }, 100);
    });

    // Keyboard navigation - MỚI
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            e.preventDefault();
            prevImageBtn.click();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            nextImageBtn.click();
        } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!viewImageBtn.classList.contains('hidden')) {
                viewImageBtn.click();
            }
        } else if (e.key === 'Escape') {
            if (!thumbnailPreview.classList.contains('hidden')) {
                thumbnailPreview.classList.add('hidden');
                thumbnailToggle.textContent = 'Xem tất cả';
            }
        }
    });
    
    // Cập nhật logic xử lý nút "Xem ảnh" để chuyển hướng sang trang mới
    viewImageBtn.addEventListener('click', () => {
        const activeItem = carouselItems[currentIndex];
        const mediaElement = activeItem.querySelector('img, video');
        const mediaUrl = mediaElement.src;
        const mediaText = activeItem.querySelector('.image-overlay-text').textContent;
        const isVideo = mediaElement.tagName.toLowerCase() === 'video';
        
        // Thêm tham số `index` vào URL khi chuyển hướng
        const newUrl = isVideo 
            ? `XemStory.html?url=${encodeURIComponent(mediaUrl)}&text=${encodeURIComponent(mediaText)}&index=${currentIndex}`
            : `Xemanh.html?img=${encodeURIComponent(mediaUrl)}&text=${encodeURIComponent(mediaText)}&index=${currentIndex}`;
        
        // Chuyển hướng người dùng đến trang mới
        window.location.href = newUrl;
    });
    
    // Enhanced click interactions - IMPROVED
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            if (item.classList.contains('active') || item.classList.contains('prev') || item.classList.contains('next')) {
                // Thêm ripple effect - MỚI
                createRippleEffect(event, item);
                
                revealedState[index] = !revealedState[index];
                updateCarousel();

                if (revealedState[index]) {
                    // Enhanced heart reaction - IMPROVED
                    const heart = document.createElement('div');
                    heart.classList.add('heart-reaction');
                    heart.innerHTML = '&#10084;';
                    const rect = item.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    heart.style.left = `${x}px`;
                    heart.style.top = `${y}px`;
                    
                    // Random heart variants - MỚI
                    const hearts = ['❤️', '💖', '💝', '💕', '💓', '💗'];
                    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                    
                    item.appendChild(heart);
                    heart.addEventListener('animationend', () => heart.remove());
                    
                    // Thêm screen shake effect - MỚI
                    createScreenShake();
                }
            }
        });
    });

    // MỚI: Ripple effect function
    function createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 20;
        `;
        
        element.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
        
        // Add ripple animation to CSS if not exists
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // MỚI: Screen shake effect
    function createScreenShake() {
        const gallery = document.querySelector('.image-gallery-card');
        gallery.style.animation = 'screenShake 0.3s ease-in-out';
        setTimeout(() => {
            gallery.style.animation = '';
        }, 300);
        
        // Add shake animation to CSS if not exists
        if (!document.querySelector('#shake-style')) {
            const style = document.createElement('style');
            style.id = 'shake-style';
            style.textContent = `
                @keyframes screenShake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    75% { transform: translateX(2px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // --- Xử lý click vào 4 ảnh nhỏ (GIỮ NGUYÊN) ---
    const smallImages = document.querySelectorAll('.small-image');
    smallImages.forEach(item => {
        item.addEventListener('click', () => {
            const mediaElement = item.querySelector('img, video');
            const mediaUrl = mediaElement.src;
            const mediaText = item.querySelector('.image-overlay-text').textContent;
            
            const newUrl = `xemanhnho.html?img=${encodeURIComponent(mediaUrl)}&text=${encodeURIComponent(mediaText)}`;
            window.location.href = newUrl;
        });
    });

    /* --- Background Music & Audio Visualizer (GIỮ NGUYÊN + IMPROVED) --- */
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Improved audio loading with fallback
    const playAudio = async () => {
        try {
            await backgroundMusic.play();
        } catch (e) {
            console.log("Autoplay prevented, waiting for user interaction:", e);
            // Add click to play functionality
            document.addEventListener('click', async () => {
                try {
                    await backgroundMusic.play();
                } catch (error) {
                    console.error("Audio play failed:", error);
                }
            }, { once: true });
        }
    };
    
    playAudio();
    
    // Enhanced audio visualizer - IMPROVED
    let audioContext, analyser, source, bufferLength, dataArray;
    
    const initAudioContext = async () => {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaElementSource(backgroundMusic);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        } catch (error) {
            console.log("Audio context initialization failed:", error);
        }
    };

    function updateScale() {
        if (!analyser) return;
        
        requestAnimationFrame(updateScale);
        analyser.getByteFrequencyData(dataArray);
        
        // Enhanced visualization with multiple frequency ranges
        const bass = dataArray.slice(0, 10).reduce((sum, value) => sum + value, 0) / 10;
        const mid = dataArray.slice(10, 30).reduce((sum, value) => sum + value, 0) / 20;
        const treble = dataArray.slice(30, 50).reduce((sum, value) => sum + value, 0) / 20;
        
        const normalizedScale = 1 + (bass / 255) * 0.05;
        const activeItem = document.querySelector('.carousel-item.active');
        
        if (activeItem) {
            activeItem.style.transform = `scale(${normalizedScale})`;
            
            // Add color pulse based on audio - MỚI
            const hue = (mid / 255) * 360;
            const saturation = (treble / 255) * 100;
            activeItem.style.filter = `hue-rotate(${hue}deg) saturate(${100 + saturation}%)`;
        }
        
        // Visualize on background elements - MỚI
        const galaxySpiral = document.querySelector('.galaxy-spiral');
        if (galaxySpiral) {
            const rotation = (bass / 255) * 5;
            galaxySpiral.style.transform = `rotate(${rotation}deg) scale(2)`;
        }
    }
    
    backgroundMusic.addEventListener('play', () => {
        if (!audioContext) {
            initAudioContext().then(() => {
                updateScale();
            });
        } else {
            updateScale();
        }
    });

    /* --- Enhanced Interactive Effects --- */
    const confettiContainer = document.getElementById('confetti-container');
    const fallingElementsContainer = document.getElementById('falling-elements-container');
    const cursorSparklesContainer = document.getElementById('cursor-sparkles');
    const floatingOrbsContainer = document.getElementById('floating-orbs-container');
    
    const confettiColors = ['var(--color-purple-neon)', 'var(--color-blue-neon)', 'var(--color-pink-neon)', 'var(--color-green-neon)', "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#fff", "#ffa500"];
    const shapes = ['rect', 'circle', 'heart', 'star'];
    const fallingEmojis = ['✨', '💖', '⭐', '🌸', '💫', '🎶', '💝', '🌟', '💕', '🎵'];

    // Enhanced confetti with physics - IMPROVED
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const size = Math.random() * 12 + 4;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Enhanced physics properties
        const startX = Math.random() * window.innerWidth;
        const gravity = Math.random() * 0.5 + 0.3;
        const wind = (Math.random() - 0.5) * 0.3;
        
        confetti.style.setProperty('--size', `${size}px`);
        confetti.style.setProperty('--color', color);
        confetti.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        confetti.style.setProperty('--delay', `${Math.random() * 1}s`);
        confetti.style.setProperty('--translateX', `${wind * 200}px`);
        confetti.style.setProperty('--rotate', `${Math.random() * 1080}deg`);
        confetti.style.setProperty('--shape', shape);
        confetti.style.left = `${startX}px`;
        confetti.style.top = '-20px';
        
        // Shape-specific styling - MỚI
        if (shape === 'heart') {
            confetti.style.borderRadius = '0';
            confetti.innerHTML = '♥';
            confetti.style.fontSize = `${size}px`;
            confetti.style.backgroundColor = 'transparent';
            confetti.style.color = color;
        } else if (shape === 'star') {
            confetti.innerHTML = '★';
            confetti.style.fontSize = `${size}px`;
            confetti.style.backgroundColor = 'transparent';
            confetti.style.color = color;
        } else if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        }
        
        confettiContainer.appendChild(confetti);
        confetti.addEventListener('animationend', () => confetti.remove());
    }
    
    // MỚI: Enhanced falling elements with better physics
    function createFallingElement() {
        const element = document.createElement('div');
        element.classList.add('falling-element');
        element.innerHTML = fallingEmojis[Math.floor(Math.random() * fallingEmojis.length)];
        
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 4 + 5;
        const size = Math.random() * 1.5 + 0.8;
        
        element.style.left = `${startX}vw`;
        element.style.setProperty('--drift', `${drift}px`);
        element.style.animationDuration = `${duration}s`;
        element.style.opacity = Math.random() * 0.7 + 0.3;
        element.style.fontSize = `${size}em`;
        
        fallingElementsContainer.appendChild(element);
        element.addEventListener('animationend', () => element.remove());
    }

    // MỚI: Floating orbs
    function createFloatingOrb() {
        const orb = document.createElement('div');
        orb.classList.add('floating-orb');
        
        const colors = ['var(--color-purple-neon)', 'var(--color-blue-neon)', 'var(--color-pink-neon)', 'var(--color-green-neon)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 15;
        
        orb.style.left = `${startX}px`;
        orb.style.background = `radial-gradient(circle, ${color}, transparent)`;
        orb.style.animationDuration = `${duration}s`;
        orb.style.boxShadow = `0 0 20px ${color}`;
        
        floatingOrbsContainer.appendChild(orb);
        orb.addEventListener('animationend', () => orb.remove());
    }

    // Effect intervals with performance optimization
    if (confettiContainer) {
        setInterval(createConfetti, 600);
    }
    if (fallingElementsContainer) {
        setInterval(createFallingElement, 1200);
    }
    if (floatingOrbsContainer) {
        setInterval(createFloatingOrb, 3000);
    }
    
    // Enhanced cursor sparkles with trail effect - IMPROVED
    if (cursorSparklesContainer) {
        let lastSparkleTime = 0;
        const sparkleDelay = 50; // Minimum time between sparkles
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastSparkleTime < sparkleDelay) return;
            lastSparkleTime = now;
            
            // Create multiple sparkles for trail effect
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('span');
                    sparkle.classList.add('cursor-sparkle');
                    
                    const offsetX = (Math.random() - 0.5) * 20;
                    const offsetY = (Math.random() - 0.5) * 20;
                    
                    sparkle.style.left = `${e.clientX + offsetX}px`;
                    sparkle.style.top = `${e.clientY + offsetY}px`;
                    
                    const size = Math.random() * 6 + 3;
                    sparkle.style.width = `${size}px`;
                    sparkle.style.height = `${size}px`;
                    
                    const hue = Math.random() * 360;
                    sparkle.style.backgroundColor = `hsl(${hue}, 100%, 80%)`;
                    sparkle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 100%, 80%)`;
                    
                    const duration = Math.random() * 1 + 0.5;
                    sparkle.style.animationDuration = `${duration}s`;
                    
                    cursorSparklesContainer.appendChild(sparkle);
                    sparkle.addEventListener('animationend', () => sparkle.remove());
                }, i * 25);
            }
        });
    }

    /* --- Enhanced Particles.js Configuration --- */
    document.body.style.position = 'relative';

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 200, "density": { "enable": true, "value_area": 1000 } },
                "color": { "value": ["#a855f7", "#3b82f6", "#ec4899", "#22c55e"] },
                "shape": { 
                    "type": ["circle", "triangle"], 
                    "stroke": { "width": 0, "color": "#000000" }, 
                    "polygon": { "nb_sides": 5 } 
                },
                "opacity": { 
                    "value": 0.8, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.2, "sync": false } 
                },
                "size": { 
                    "value": 2, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 2, "size_min": 0.5, "sync": false } 
                },
                "line_linked": { 
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": { 
                    "enable": true, 
                    "speed": 0.5, 
                    "direction": "none", 
                    "random": true, 
                    "straight": false, 
                    "out_mode": "out", 
                    "bounce": false, 
                    "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } 
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { 
                    "onhover": { "enable": true, "mode": "repulse" }, 
                    "onclick": { "enable": true, "mode": "push" }, 
                    "resize": true 
                },
                "modes": {
                    "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 100, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }

    // MỚI: Performance monitoring and optimization
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            // Adjust effects based on performance
            if (fps < 30) {
                // Reduce particle count and effects for better performance
                console.log("Performance optimization: Reducing effects");
                const particleCanvas = document.querySelector('#particles-js canvas');
                if (particleCanvas) {
                    particleCanvas.style.opacity = '0.5';
                }
            }
        }
        
        requestAnimationFrame(monitorPerformance);
    }
    
    monitorPerformance();

    // MỚI: Smooth page transitions
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href.includes('.html')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });

    // MỚI: Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImageBtn.click();
            } else {
                // Swipe right - previous image
                prevImageBtn.click();
            }
        }
    }
});