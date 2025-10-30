// ===== PROFESSIONAL BIRTHDAY WEBSITE SCRIPT =====

class BirthdayWebsite {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.particles = null;
        this.animationFrameId = null;
        this.mousePosition = { x: 0, y: 0 };
        
        // Configuration
        this.config = {
            messages: [
                "Wishing you a day filled with happiness and a year filled with joy! 🎂",
                "Hope your special day brings you all that your heart desires! ✨",
                "May this birthday be just the beginning of a year filled with happy memories! 🎊",
                "Sending you smiles for every moment of your special day! 😊",
                "Hope your birthday is as wonderful as you are! 🌟",
                "May your birthday sparkle with joy and laughter! 💫"
            ],
            confettiColors: ['#ff6b9d', '#4facfe', '#00f2fe', '#ffd700', '#ff9472', '#f093fb'],
            particleColors: ['#ffffff', '#ffd700', '#ff6b9d', '#4facfe', '#00f2fe', '#f093fb']
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showLoadingScreen();
        this.setupAudio();
        this.initializeParticles();
        this.startAnimations();
        this.typewriteMessage();
        this.setupMouseTracking();
        
        // Hide loading screen after everything is ready
        setTimeout(() => this.hideLoadingScreen(), 1500);
    }
    
    // ===== LOADING SCREEN =====
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Music control
        const musicButton = document.getElementById('musicButton');
        if (musicButton) {
            musicButton.addEventListener('click', () => this.toggleMusic());
        }
        
        // Volume control
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        }
        
        // Decorative icons interaction
        const iconItems = document.querySelectorAll('.icon-item');
        iconItems.forEach(icon => {
            icon.addEventListener('click', () => this.handleIconClick(icon));
            icon.addEventListener('mouseenter', () => this.handleIconHover(icon));
        });
        
        // Profile image interaction
        const profileContainer = document.getElementById('profileContainer');
        if (profileContainer) {
            profileContainer.addEventListener('click', () => this.handleProfileClick());
        }
        
        // Card hover effects
        const mainCard = document.getElementById('mainCard');
        if (mainCard) {
            mainCard.addEventListener('mouseenter', () => this.handleCardHover(true));
            mainCard.addEventListener('mouseleave', () => this.handleCardHover(false));
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Visibility change (pause/play music when tab changes)
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }
    
    // ===== AUDIO MANAGEMENT =====
    setupAudio() {
        this.audio = document.getElementById('backgroundMusic');
        if (this.audio) {
            this.audio.volume = 0.7;
            this.audio.addEventListener('loadeddata', () => {
                this.showToast('Music ready to play!', 'success');
            });
            this.audio.addEventListener('error', () => {
                this.showToast('Failed to load music', 'error');
            });
            this.audio.addEventListener('play', () => this.onMusicPlay());
            this.audio.addEventListener('pause', () => this.onMusicPause());
        }
    }
    
    toggleMusic() {
        if (!this.audio) return;
        
        if (this.audio.paused) {
            this.playMusic();
        } else {
            this.pauseMusic();
        }
    }
    
    playMusic() {
        if (!this.audio) return;
        
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.showToast('🎵 Music playing', 'success');
        }).catch((error) => {
            console.warn('Audio play failed:', error);
            this.showToast('Please click to enable audio', 'info');
        });
    }
    
    pauseMusic() {
        if (!this.audio) return;
        
        this.audio.pause();
        this.isPlaying = false;
        this.showToast('🎵 Music paused', 'info');
    }
    
    setVolume(value) {
        if (this.audio) {
            this.audio.volume = parseFloat(value);
            
            // Update volume icon
            const volumeIcon = document.querySelector('.volume-icon');
            if (volumeIcon) {
                if (value == 0) {
                    volumeIcon.className = 'fas fa-volume-mute volume-icon';
                } else if (value < 0.5) {
                    volumeIcon.className = 'fas fa-volume-down volume-icon';
                } else {
                    volumeIcon.className = 'fas fa-volume-up volume-icon';
                }
            }
        }
    }
    
    onMusicPlay() {
        document.body.classList.add('playing');
        const musicButton = document.getElementById('musicButton');
        if (musicButton) {
            const icon = musicButton.querySelector('i');
            const text = musicButton.querySelector('span');
            if (icon) icon.className = 'fas fa-pause';
            if (text) text.textContent = 'Pause';
        }
    }
    
    onMusicPause() {
        document.body.classList.remove('playing');
        const musicButton = document.getElementById('musicButton');
        if (musicButton) {
            const icon = musicButton.querySelector('i');
            const text = musicButton.querySelector('span');
            if (icon) icon.className = 'fas fa-music';
            if (text) text.textContent = 'Music';
        }
    }
    
    // ===== PARTICLES SYSTEM =====
    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 60,
                        density: { enable: true, value_area: 1000 }
                    },
                    color: {
                        value: this.config.particleColors
                    },
                    shape: {
                        type: ['circle', 'triangle'],
                        stroke: { width: 0, color: '#000000' }
                    },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: { enable: true, speed: 0.5, opacity_min: 0.1 }
                    },
                    size: {
                        value: 4,
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 200, line_linked: { opacity: 1 } },
                        push: { particles_nb: 3 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // ===== ANIMATIONS =====
    startAnimations() {
        this.startConfetti();
        this.startFloatingHearts();
        this.animateElements();
    }
    
    startConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        if (!confettiContainer) return;
        
        const createConfetti = () => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = this.config.confettiColors[
                Math.floor(Math.random() * this.config.confettiColors.length)
            ];
            
            const size = Math.random() * 8 + 4;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        };
        
        setInterval(createConfetti, 150);
    }
    
    startFloatingHearts() {
        const heartsContainer = document.getElementById('floating-hearts');
        if (!heartsContainer) return;
        
        const hearts = ['💖', '💝', '💕', '💗', '💘', '💙', '💚', '💛', '🧡', '💜'];
        
        const createHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        };
        
        setInterval(createHeart, 800);
    }
    
    // ===== MOUSE TRACKING =====
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            this.createCursorSparkle(e.clientX, e.clientY);
        });
    }
    
    createCursorSparkle(x, y) {
        const sparklesContainer = document.getElementById('cursor-sparkles');
        if (!sparklesContainer) return;
        
        if (Math.random() < 0.3) { // Only create sparkle 30% of the time
            const sparkle = document.createElement('div');
            sparkle.className = 'cursor-sparkle';
            sparkle.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
            sparkle.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
            sparkle.style.backgroundColor = this.config.particleColors[
                Math.floor(Math.random() * this.config.particleColors.length)
            ];
            
            sparklesContainer.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 600);
        }
    }
    
    // ===== TYPEWRITER EFFECT =====
    typewriteMessage() {
        const messageElement = document.getElementById('birthdayMessage');
        if (!messageElement) return;
        
        const message = this.config.messages[
            Math.floor(Math.random() * this.config.messages.length)
        ];
        
        let index = 0;
        messageElement.textContent = '';
        
        const typeNext = () => {
            if (index < message.length) {
                messageElement.textContent += message[index];
                index++;
                setTimeout(typeNext, 50);
            }
        };
        
        setTimeout(typeNext, 1000);
    }
    
    // ===== INTERACTION HANDLERS =====
    handleIconClick(icon) {
        const iconType = icon.getAttribute('data-icon');
        
        // Create explosion effect
        this.createExplosion(icon);
        
        // Special actions based on icon type
        switch(iconType) {
            case 'gift':
                this.showToast('🎁 A special gift awaits!', 'success');
                break;
            case 'cake':
                this.showToast('🎂 Make a wish!', 'success');
                this.createCakeExplosion();
                break;
            case 'balloon':
                this.showToast('🎈 Balloons for celebration!', 'success');
                break;
            case 'star':
                this.showToast('⭐ You\'re a star!', 'success');
                break;
        }
    }
    
    handleIconHover(icon) {
        // Add subtle shake animation
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = '';
        }, 10);
    }
    
    handleProfileClick() {
        const profileContainer = document.getElementById('profileContainer');
        if (profileContainer) {
            // Create ripple effect
            this.createRipple(profileContainer);
            this.showToast('📸 Beautiful photo!', 'success');
        }
    }
    
    handleCardHover(isHovering) {
        const card = document.getElementById('mainCard');
        if (card) {
            if (isHovering) {
                card.style.transform = 'translateY(-5px) rotateY(2deg)';
            } else {
                card.style.transform = '';
            }
        }
    }
    
    handleKeyboard(e) {
        switch(e.key.toLowerCase()) {
            case ' ':
                e.preventDefault();
                this.toggleMusic();
                break;
            case 'm':
                this.toggleMusic();
                break;
            case 'arrowup':
                this.adjustVolume(0.1);
                break;
            case 'arrowdown':
                this.adjustVolume(-0.1);
                break;
        }
    }
    
    handleResize() {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden && this.isPlaying) {
            this.pauseMusic();
        }
    }
    
    // ===== VISUAL EFFECTS =====
    createExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = this.config.confettiColors[
                Math.floor(Math.random() * this.config.confettiColors.length)
            ];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 0, y = 0, opacity = 1;
            
            const animate = () => {
                x += vx * 0.02;
                y += vy * 0.02 + 2; // gravity
                opacity -= 0.02;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(particle);
                }
            };
            
            animate();
        }
    }
    
    createCakeExplosion() {
        const confettiContainer = document.getElementById('confetti-container');
        if (!confettiContainer) return;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎂', '🍰', '🧁', '🎈', '🎊'][Math.floor(Math.random() * 5)];
                confetti.style.position = 'absolute';
                confetti.style.left = '50%';
                confetti.style.top = '20%';
                confetti.style.fontSize = '2rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '100';
                
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 200 + 100;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                confettiContainer.appendChild(confetti);
                
                let x = 0, y = 0, rotation = 0;
                
                const animate = () => {
                    x += vx * 0.01;
                    y += vy * 0.01 + 5; // gravity
                    rotation += 10;
                    
                    confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                    
                    if (y < window.innerHeight + 100) {
                        requestAnimationFrame(animate);
                    } else {
                        confettiContainer.removeChild(confetti);
                    }
                };
                
                animate();
            }, i * 50);
        }
    }
    
    createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // ===== TOAST NOTIFICATIONS =====
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (toast.parentNode) {
                        container.removeChild(toast);
                    }
                }, 300);
            }
        }, 3000);
    }
    
    // ===== UTILITY METHODS =====
    adjustVolume(delta) {
        if (!this.audio) return;
        
        const currentVolume = this.audio.volume;
        const newVolume = Math.max(0, Math.min(1, currentVolume + delta));
        
        this.audio.volume = newVolume;
        
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.value = newVolume;
        }
        
        this.setVolume(newVolume);
    }
    
    animateElements() {
        const elements = document.querySelectorAll('.card-header, .profile-section, .message-section, .controls-section');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (index + 1) * 200);
        });
    }
    
    // ===== SPECIAL EFFECTS =====
    triggerCelebration() {
        // Burst of confetti
        this.createMassConfetti();
        
        // Flash effect
        this.createFlashEffect();
        
        // Play celebration sound (if available)
        this.playCelebrationSound();
    }
    
    createMassConfetti() {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = this.config.confettiColors[
                    Math.floor(Math.random() * this.config.confettiColors.length)
                ];
                
                const shapes = ['circle', 'square', 'triangle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.borderLeft = '5px solid transparent';
                    confetti.style.borderRight = '5px solid transparent';
                    confetti.style.borderBottom = `10px solid ${confetti.style.backgroundColor}`;
                    confetti.style.backgroundColor = 'transparent';
                }
                
                container.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        container.removeChild(confetti);
                    }
                }, 3000);
            }, i * 20);
        }
    }
    
    createFlashEffect() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100vw';
        flash.style.height = '100vh';
        flash.style.background = 'rgba(255, 255, 255, 0.8)';
        flash.style.zIndex = '9998';
        flash.style.pointerEvents = 'none';
        flash.style.opacity = '0';
        
        document.body.appendChild(flash);
        
        // Flash animation
        flash.style.transition = 'opacity 0.1s ease';
        flash.style.opacity = '1';
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                if (flash.parentNode) {
                    document.body.removeChild(flash);
                }
            }, 100);
        }, 100);
    }
    
    playCelebrationSound() {
        // Create a short celebratory beep using Web Audio API
        if (window.AudioContext || window.webkitAudioContext) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
    
    // ===== THEME MANAGEMENT =====
    toggleTheme() {
        document.body.classList.toggle('cream-theme');
        const isCreamy = document.body.classList.contains('cream-theme');
        this.showToast(isCreamy ? 'Switched to cream theme' : 'Switched to default theme', 'info');
    }
    
    // ===== ACCESSIBILITY =====
    setupAccessibility() {
        // Add keyboard navigation support
        const interactiveElements = document.querySelectorAll('.action-button, .icon-item, .volume-slider');
        
        interactiveElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
        
        // Add ARIA labels dynamically
        const musicButton = document.getElementById('musicButton');
        if (musicButton) {
            musicButton.setAttribute('aria-label', 'Toggle background music');
        }
        
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.setAttribute('aria-label', 'Adjust music volume');
        }
    }
    
    // ===== PERFORMANCE OPTIMIZATION =====
    optimizePerformance() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });
        
        // Limit particle count on mobile
        if (window.innerWidth < 768 && window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.particles.number.value = 30;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
        
        // Use requestAnimationFrame for smooth animations
        this.animationFrameId = requestAnimationFrame(() => this.updateAnimations());
    }
    
    updateAnimations() {
        // Update any continuous animations here
        // This runs at 60fps for smooth performance
        
        // Continue the animation loop
        this.animationFrameId = requestAnimationFrame(() => this.updateAnimations());
    }
    
    // ===== CLEANUP =====
    destroy() {
        // Clean up event listeners and animations
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // Pause audio
        if (this.audio) {
            this.audio.pause();
        }
        
        // Clear any running intervals
        // (Note: In a real application, you'd want to store interval IDs and clear them)
    }
}

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Generate random color from palette
function getRandomColor() {
    const colors = ['#ff6b9d', '#4facfe', '#00f2fe', '#ffd700', '#ff9472', '#f093fb'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add CSS animation keyframes dynamically
function addCustomAnimation(name, keyframes) {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ${name} {
            ${keyframes}
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZE APPLICATION =====
let birthdayApp;

document.addEventListener('DOMContentLoaded', () => {
    birthdayApp = new BirthdayWebsite();
    
    // Add custom ripple animation
    addCustomAnimation('ripple', `
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    `);
    
    // Setup accessibility features
    birthdayApp.setupAccessibility();
    
    // Optimize performance
    birthdayApp.optimizePerformance();
    
    // Add special birthday surprise after 10 seconds
    setTimeout(() => {
        if (birthdayApp.isPlaying) {
            birthdayApp.triggerCelebration();
            birthdayApp.showToast('🎉 Surprise celebration!', 'success');
        }
    }, 10000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (birthdayApp) {
        birthdayApp.destroy();
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, reduce animations
        if (birthdayApp && birthdayApp.animationFrameId) {
            cancelAnimationFrame(birthdayApp.animationFrameId);
        }
    } else {
        // Page is visible, resume animations
        if (birthdayApp) {
            birthdayApp.animationFrameId = requestAnimationFrame(() => birthdayApp.updateAnimations());
        }
    }
});

// Export for global access (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BirthdayWebsite;
}