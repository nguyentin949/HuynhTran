// Enhanced JavaScript với hiệu ứng mượt mà và chuyên nghiệp
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const giftLink = document.getElementById('giftLink');
    const modal = document.getElementById('myModal');
    const closeButton = document.getElementsByClassName('close-button')[0];
    const submitButton = document.getElementById('submitInfo');
    const fullNameInput = document.getElementById('fullName');
    const dobInput = document.getElementById('dob');
    const errorMessage = document.getElementById('errorMessage');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Credentials - có thể mở rộng dễ dàng
    const correctCredentials = [
        { name: "tín", dob: "28/07/2005" },
        { name: "Huynh Bao Tran", dob: "04/09/2005" },
        { name: "Huỳnh Bảo Trân", dob: "04/09/2005" },
        { name: "huỳnh bảo trân", dob: "04/09/2005"},
        { name: "huynh bao tran", dob: "04/09/2005"}
    ];

    const birthdayPageURL = 'hbbd.html';

    // Utility Functions
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const normalizeString = (str) => {
        return str.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .trim();
    };

    // Enhanced Particle Systems
    class ParticleSystem {
        constructor(container, particleClass) {
            this.container = container;
            this.particleClass = particleClass;
            this.particles = new Set();
            this.isActive = true;
        }

        createParticle(config = {}) {
            const particle = document.createElement('div');
            particle.classList.add(this.particleClass);
            
            // Apply configuration
            Object.keys(config).forEach(key => {
                if (key === 'style') {
                    Object.assign(particle.style, config[key]);
                } else {
                    particle[key] = config[key];
                }
            });

            this.container.appendChild(particle);
            this.particles.add(particle);

            return particle;
        }

        removeParticle(particle, delay = 0) {
            setTimeout(() => {
                if (this.particles.has(particle)) {
                    particle.remove();
                    this.particles.delete(particle);
                }
            }, delay);
        }

        clear() {
            this.particles.forEach(particle => {
                particle.remove();
            });
            this.particles.clear();
        }

        stop() {
            this.isActive = false;
        }

        start() {
            this.isActive = true;
        }
    }

    // Initialize Particle Systems
    const confettiSystem = new ParticleSystem(document.querySelector('.confetti-container'), 'confetti');
    const snowflakeSystem = new ParticleSystem(document.querySelector('.snowflake-container'), 'snowflake');
    const bubbleSystem = new ParticleSystem(document.querySelector('.bubble-container'), 'bubble');
    const starSystem = new ParticleSystem(document.querySelector('.star-container'), 'star');
    const heartSystem = new ParticleSystem(document.querySelector('.floating-hearts-container'), 'floating-heart');

    // Enhanced Confetti Effect
    function createConfetti() {
        if (!confettiSystem.isActive) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#ff8c94', '#98fb98', '#dda0dd'];
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 100; i++) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const particle = confettiSystem.createParticle({
                style: {
                    left: `${Math.random() * 100}vw`,
                    backgroundColor: color,
                    width: `${Math.random() * 8 + 8}px`,
                    height: `${Math.random() * 8 + 8}px`,
                    animationDuration: `${Math.random() * 2 + 3}s`,
                    animationDelay: `${Math.random() * 2}s`,
                    borderRadius: shape === 'circle' ? '50%' : '0%',
                    transform: shape === 'triangle' ? 'rotate(45deg)' : 'none'
                }
            });
            
            confettiSystem.removeParticle(particle, 5000);
        }
    }

    // Enhanced Snowflake Effect
    function createSnowflake() {
        if (!snowflakeSystem.isActive) return;
        
        const particle = snowflakeSystem.createParticle({
            textContent: ['❄', '❅', '❆'][Math.floor(Math.random() * 3)],
            style: {
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 10 + 10}px`,
                color: `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`,
                animationDuration: `${Math.random() * 3 + 8}s`,
                animationDelay: `${Math.random() * 5}s`
            }
        });
        
        snowflakeSystem.removeParticle(particle, 13000);
    }

    // Enhanced Bubble Effect
    function createBubble() {
        if (!bubbleSystem.isActive) return;
        
        const size = Math.random() * 30 + 20;
        const particle = bubbleSystem.createParticle({
            style: {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 4 + 10}s`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.3
            }
        });
        
        bubbleSystem.removeParticle(particle, 14000);
    }

    // Enhanced Star Effect
    function createStar() {
        if (!starSystem.isActive) return;
        
        const particle = starSystem.createParticle({
            textContent: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)],
            style: {
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 8 + 12}px`,
                animationDuration: `${Math.random() * 1 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
            }
        });
        
        starSystem.removeParticle(particle, 4000);
    }

    // Floating Hearts Effect
    function createFloatingHeart() {
        if (!heartSystem.isActive) return;
        
        const hearts = ['💖', '💕', '💗', '💝', '💘'];
        const particle = heartSystem.createParticle({
            textContent: hearts[Math.floor(Math.random() * hearts.length)],
            style: {
                left: `${Math.random() * 100}vw`,
                fontSize: `${Math.random() * 10 + 15}px`,
                animationDuration: `${Math.random() * 2 + 6}s`,
                animationDelay: `${Math.random() * 3}s`
            }
        });
        
        heartSystem.removeParticle(particle, 8000);
    }

    // Advanced Modal Animations
    function showModal() {
        modal.style.display = 'flex';
        
        // Reset form
        fullNameInput.value = '';
        dobInput.value = '';
        hideError();
        
        // Add entrance animation
        requestAnimationFrame(() => {
            modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        });
        
        // Focus first input after animation
        setTimeout(() => {
            fullNameInput.focus();
        }, 300);
        
        // Create celebration effects
        createConfetti();
        setTimeout(createFloatingHeart, 200);
    }

    function hideModal() {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalSlideOut 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards';
        
        setTimeout(() => {
            modal.style.display = 'none';
            hideError();
            fullNameInput.value = '';
            dobInput.value = '';
        }, 400);
    }

    function showError(message = 'Thông tin không đúng. Vui lòng thử lại!') {
        errorMessage.innerHTML = `<span class="error-icon">❌</span> ${message}`;
        errorMessage.style.display = 'block';
        
        // Add shake animation to inputs
        [fullNameInput, dobInput].forEach(input => {
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 600);
        });
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function showLoading() {
        loadingOverlay.style.display = 'flex';
    }

    function hideLoading() {
        loadingOverlay.style.display = 'none';
    }

    // Enhanced Input Formatting
    const formatDateInput = debounce((input) => {
        let value = input.value.replace(/[^\d]/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            if (value.length <= 2) {
                formattedValue = value;
            } else if (value.length <= 4) {
                formattedValue = `${value.substring(0, 2)}/${value.substring(2)}`;
            } else if (value.length <= 8) {
                formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4, 8)}`;
            } else {
                formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4, 8)}`;
            }
        }

        input.value = formattedValue;
    }, 100);

    // Enhanced Validation
    function validateCredentials(name, dob) {
        const normalizedName = normalizeString(name);
        
        return correctCredentials.some(cred => {
            const normalizedCredName = normalizeString(cred.name);
            return normalizedName === normalizedCredName && dob === cred.dob;
        });
    }

    function validateDateFormat(dateStr) {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(dateStr)) return false;
        
        const [day, month, year] = dateStr.split('/').map(Number);
        
        // Basic date validation
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        if (year < 1900 || year > new Date().getFullYear()) return false;
        
        // Days in month validation
        const daysInMonth = new Date(year, month, 0).getDate();
        return day <= daysInMonth;
    }

    // Event Listeners
    giftLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Add shake effect to gift
        giftLink.classList.add('shake');
        setTimeout(() => giftLink.classList.remove('shake'), 800);
        
        // Show modal with delay for better UX
        setTimeout(showModal, 200);
    });

    closeButton.addEventListener('click', hideModal);

    // Enhanced click outside modal
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'flex') {
            if (event.key === 'Escape') {
                hideModal();
            } else if (event.key === 'Enter' && event.target !== submitButton) {
                event.preventDefault();
                if (event.target === fullNameInput) {
                    dobInput.focus();
                } else if (event.target === dobInput) {
                    submitButton.click();
                }
            }
        }
    });

    // Enhanced DOB input handling
    dobInput.addEventListener('keydown', function(event) {
        const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'Enter', 'Home', 'End',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
        ];
        
        const isNumeric = /^[0-9]$/.test(event.key);
        const isAllowed = allowedKeys.includes(event.key);
        const isModifierKey = event.ctrlKey || event.metaKey || event.altKey;
        
        if (!isNumeric && !isAllowed && !isModifierKey) {
            event.preventDefault();
        }
    });

    dobInput.addEventListener('input', function() {
        hideError();
        formatDateInput(this);
    });

    dobInput.addEventListener('paste', function(event) {
        event.preventDefault();
        const pastedText = (event.clipboardData || window.clipboardData).getData('text');
        const numbersOnly = pastedText.replace(/[^\d]/g, '');
        
        if (numbersOnly.length <= 8) {
            this.value = numbersOnly;
            formatDateInput(this);
        }
    });

    // Enhanced form submission
    submitButton.addEventListener('click', async function(event) {
        event.preventDefault();
        
        const enteredName = fullNameInput.value.trim();
        const enteredDob = dobInput.value.trim();
        
        // Input validation
        if (!enteredName) {
            showError('Vui lòng nhập họ và tên!');
            fullNameInput.focus();
            return;
        }
        
        if (!enteredDob) {
            showError('Vui lòng nhập ngày sinh!');
            dobInput.focus();
            return;
        }
        
        if (!validateDateFormat(enteredDob)) {
            showError('Định dạng ngày sinh không hợp lệ! (DD/MM/YYYY)');
            dobInput.focus();
            return;
        }
        
        // Show loading
        showLoading();
        
        // Simulate processing delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (validateCredentials(enteredName, enteredDob)) {
            // Success - create celebration effect
            createConfetti();
            setTimeout(() => {
                window.location.href = birthdayPageURL;
            }, 1000);
        } else {
            hideLoading();
            showError('Thông tin không chính xác. Vui lòng kiểm tra lại!');
        }
    });

    // Real-time input validation feedback
    fullNameInput.addEventListener('input', function() {
        hideError();
        
        // Add visual feedback for valid input
        if (this.value.trim().length > 0) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });

    dobInput.addEventListener('input', function() {
        hideError();
        
        // Add visual feedback for date format
        if (validateDateFormat(this.value)) {
            this.style.borderColor = '#4CAF50';
        } else if (this.value.length === 10) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });

    // Initialize particle effects with intervals
    const effects = {
        snowflake: { fn: createSnowflake, interval: 400 },
        bubble: { fn: createBubble, interval: 800 },
        star: { fn: createStar, interval: 200 },
        heart: { fn: createFloatingHeart, interval: 3000 }
    };

    Object.entries(effects).forEach(([name, config]) => {
        setInterval(config.fn, config.interval);
    });

    // Performance optimization - pause effects when page not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            [confettiSystem, snowflakeSystem, bubbleSystem, starSystem, heartSystem]
                .forEach(system => system.stop());
        } else {
            [confettiSystem, snowflakeSystem, bubbleSystem, starSystem, heartSystem]
                .forEach(system => system.start());
        }
    });

    // Accessibility enhancements
    const announceToScreenReader = (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };

    // Add ARIA announcements for important events
    const originalShowError = showError;
    showError = function(message) {
        originalShowError(message);
        announceToScreenReader(message);
    };

    // Smooth scrolling and focus management
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Initialize tooltips for better UX
    const addTooltip = (element, text) => {
        element.setAttribute('title', text);
        element.setAttribute('aria-label', text);
    };

    addTooltip(giftLink, 'Nhấn để mở hộp quà và khám phá bất ngờ');
    addTooltip(closeButton, 'Đóng cửa sổ');
    addTooltip(submitButton, 'Xác nhận thông tin để mở quà');

    // Console welcome message
    console.log(`
    🎁 Chào mừng đến với món quà bất ngờ! 🎁
    
    ✨ Website này được tạo với tình yêu và sự chú ý đến từng chi tiết
    🌟 Hãy thưởng thức những hiệu ứng tuyệt đẹp và trải nghiệm mượt mà
    
    Made with ❤️
    `);
});