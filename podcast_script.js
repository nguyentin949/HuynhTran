document.addEventListener('DOMContentLoaded', () => {
    // --- Enhanced Falling Leaves Effect ---
    const leavesContainer = document.getElementById('falling-leaves-container');
    const numberOfLeaves = 40;
    const leafSymbols = ['🍀', '🍂', '🍃'];
    const greenLeafColors = ['#006400', '#228B22', '#32CD32', '#3CB371', '#90EE90', '#7CFC00'];

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.textContent = leafSymbols[Math.floor(Math.random() * leafSymbols.length)];
        leaf.classList.add('falling-leaf');
        
        // Enhanced styling
        leaf.style.color = greenLeafColors[Math.floor(Math.random() * greenLeafColors.length)];
        leaf.style.fontSize = `${Math.random() * 1.8 + 1.2}em`;
        leaf.style.left = `${Math.random() * 100}vw`;
        leaf.style.animationDuration = `${Math.random() * 6 + 6}s`;
        leaf.style.animationDelay = `${Math.random() * 4}s`;
        leaf.style.opacity = Math.random() * 0.7 + 0.3;
        leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add subtle glow effect
        leaf.style.filter = `drop-shadow(0 0 ${Math.random() * 8 + 3}px rgba(0, 255, 0, 0.4))`;

        leavesContainer.appendChild(leaf);

        leaf.addEventListener('animationend', () => {
            leaf.remove();
            createLeaf();
        });
    }

    // Create initial leaves
    for (let i = 0; i < numberOfLeaves; i++) {
        setTimeout(() => createLeaf(), i * 200);
    }

    // --- Enhanced Light Rays ---
    const lightRaysContainer = document.querySelector('.light-rays-container');
    const numberOfRays = 12;
    
    // Create light rays with enhanced styling
    for (let i = 0; i < numberOfRays; i++) {
        const ray = document.createElement('div');
        ray.classList.add('light-ray');
        
        // Randomize positioning and styling
        ray.style.left = `${Math.random() * 100}%`;
        ray.style.animationDelay = `${Math.random() * 12}s`;
        ray.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        ray.style.width = `${Math.random() * 8 + 3}px`;
        ray.style.opacity = Math.random() * 0.6 + 0.2;
        
        lightRaysContainer.appendChild(ray);
    }

    // --- Enhanced Floating Particles ---
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = '#00ffff';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 10px #00ffff';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = '0';
            particle.style.opacity = '0';
            particle.style.animation = `float ${Math.random() * 4 + 8}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 6}s`;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 14000);
        }
    }

    // Create particles periodically
    setInterval(createFloatingParticles, 3000);
    createFloatingParticles();
    
    // --- Enhanced Typing Effect ---
    function typeWriterEffect(element, text, i = 0) {
        if (!element || !text) return;
        
        // Add cursor effect
        element.style.borderRight = '2px solid var(--color-yellow-neon)';
        element.style.animation = 'blink 1s infinite';
        
        const typeSpeed = 80;
        
        setTimeout(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                typeWriterEffect(element, text, i + 1);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 1000);
            }
        }, typeSpeed);
    }

    // Add CSS for blinking cursor
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: var(--color-yellow-neon); }
            51%, 100% { border-color: transparent; }
        }
    `;
    document.head.appendChild(style);

    // --- Enhanced Audio Player Controls ---
    const mainAudio = document.getElementById('main-podcast-audio');
    const syncTextContainer = document.getElementById('podcast-lyrics-1');
    const playButton = document.getElementById('podcast-play-button');
    const backgroundAudio = document.getElementById('background-audio');
    const audioVisualizer = document.querySelector('.audio-visualizer');

    if (mainAudio && syncTextContainer && playButton && backgroundAudio) {
        const spans = syncTextContainer.querySelectorAll('span');
        let currentIndex = 0;
        let isPlaying = false;

        // Enhanced reset function
        const resetLyrics = () => {
            spans.forEach((span, index) => {
                span.classList.remove('visible');
                // Add staggered fade-out effect
                setTimeout(() => {
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(10px)';
                }, index * 50);
            });
            currentIndex = 0;
            
            // Reset intro text with enhanced effect
            const podcastIntroText = document.getElementById('podcastIntroText');
            if (podcastIntroText) {
                const introText = podcastIntroText.getAttribute('data-text');
                podcastIntroText.textContent = '';
                podcastIntroText.style.opacity = '0';
                setTimeout(() => {
                    podcastIntroText.style.opacity = '1';
                    typeWriterEffect(podcastIntroText, introText);
                }, 500);
            }
        };

        // Enhanced button animations
        const updatePlayButton = (playing) => {
            const buttonContent = playButton.querySelector('.button-content');
            const icon = buttonContent.querySelector('i');
            const text = buttonContent.querySelector('span');
            
            if (playing) {
                icon.className = 'fa fa-pause';
                text.textContent = 'Tạm Dừng';
                playButton.style.background = 'linear-gradient(45deg, var(--color-orange-neon), var(--color-pink-neon))';
                audioVisualizer.classList.add('playing');
                
                // Add playing effect to button
                playButton.style.animation = 'buttonPulse 2s ease-in-out infinite';
            } else {
                icon.className = 'fa fa-play';
                text.textContent = 'Phát Podcast';
                playButton.style.background = 'linear-gradient(45deg, var(--color-blue-neon), var(--color-purple-neon))';
                audioVisualizer.classList.remove('playing');
                playButton.style.animation = 'none';
            }
        };

        // Add button pulse animation
        const buttonStyle = document.createElement('style');
        buttonStyle.textContent = `
            @keyframes buttonPulse {
                0%, 100% { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2); }
                50% { box-shadow: 0 15px 35px rgba(255, 77, 0, 0.4), 0 0 30px rgba(255, 0, 119, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2); }
            }
        `;
        document.head.appendChild(buttonStyle);

        // Initialize
        resetLyrics();
        updatePlayButton(false);

        // Enhanced audio event listeners
        mainAudio.addEventListener('play', () => {
            isPlaying = true;
            updatePlayButton(true);
            backgroundAudio.pause();
            
            // Add visual feedback to content wrapper
            const contentWrapper = document.querySelector('.content-wrapper');
            contentWrapper.style.transform = 'scale(1.02)';
            setTimeout(() => {
                contentWrapper.style.transform = 'scale(1)';
            }, 300);
        });

        mainAudio.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayButton(false);
            backgroundAudio.play().catch(error => {
                console.log("Auto-play background music blocked after podcast pause.");
            });
        });

        mainAudio.addEventListener('ended', () => {
            isPlaying = false;
            resetLyrics();
            updatePlayButton(false);
            backgroundAudio.play().catch(error => {
                console.log("Auto-play background music blocked after podcast end.");
            });
            
            // Add completion effect
            const contentWrapper = document.querySelector('.content-wrapper');
            contentWrapper.style.animation = 'completionGlow 2s ease-out';
            setTimeout(() => {
                contentWrapper.style.animation = 'none';
            }, 2000);
        });

        // Add completion glow animation
        const completionStyle = document.createElement('style');
        completionStyle.textContent = `
            @keyframes completionGlow {
                0% { box-shadow: 0 15px 35px var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
                50% { box-shadow: 0 20px 40px rgba(50, 205, 50, 0.3), 0 0 50px rgba(50, 205, 50, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
                100% { box-shadow: 0 15px 35px var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
            }
        `;
        document.head.appendChild(completionStyle);

        // Enhanced lyrics synchronization
        mainAudio.addEventListener('timeupdate', () => {
            const currentTime = mainAudio.currentTime;

            spans.forEach((span, index) => {
                const startTime = parseFloat(span.getAttribute('data-start'));
                
                if (currentTime >= startTime && !span.classList.contains('visible')) {
                    // Add staggered reveal effect
                    setTimeout(() => {
                        span.classList.add('visible');
                        span.style.transform = 'translateY(0)';
                        
                        // Add ripple effect to lyrics wrapper
                        const lyricsWrapper = document.querySelector('.lyrics-wrapper');
                        lyricsWrapper.style.transform = 'scale(1.01)';
                        setTimeout(() => {
                            lyricsWrapper.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                }
            });

            // Update current index
            for (let i = 0; i < spans.length; i++) {
                if (!spans[i].classList.contains('visible')) {
                    currentIndex = i;
                    break;
                }
                currentIndex = spans.length;
            }
        });

        // Enhanced seeking behavior
        mainAudio.addEventListener('seeking', () => {
            spans.forEach(span => {
                span.classList.remove('visible');
                span.style.opacity = '0';
                span.style.transform = 'translateY(10px)';
            });
        });

        mainAudio.addEventListener('seeked', () => {
            const currentTime = mainAudio.currentTime;
            spans.forEach((span, index) => {
                const startTime = parseFloat(span.getAttribute('data-start'));
                if (currentTime >= startTime) {
                    setTimeout(() => {
                        span.classList.add('visible');
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, index * 50);
                }
            });
        });

        // Enhanced play button interaction
        playButton.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = playButton.querySelector('.button-ripple');
            ripple.style.width = '300px';
            ripple.style.height = '300px';
            
            setTimeout(() => {
                ripple.style.width = '0';
                ripple.style.height = '0';
            }, 600);

            // Toggle play/pause
            if (mainAudio.paused) {
                mainAudio.play().catch(error => {
                    console.log("Play was prevented:", error);
                });
            } else {
                mainAudio.pause();
            }
        });

        // Add hover effects to navigation buttons
        const navButtons = document.querySelectorAll('.back-button-podcast, .next-button-podcast');
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize intro text with enhanced effect
    const podcastIntroText = document.getElementById('podcastIntroText');
    if (podcastIntroText) {
        const introText = podcastIntroText.getAttribute('data-text');
        podcastIntroText.textContent = '';
        podcastIntroText.style.opacity = '0';
        
        // Delayed appearance with fade-in
        setTimeout(() => {
            podcastIntroText.style.transition = 'opacity 0.5s ease-in';
            podcastIntroText.style.opacity = '1';
            typeWriterEffect(podcastIntroText, introText);
        }, 800);
    }
    
    // Enhanced background audio handling
    if (backgroundAudio) {
        // Set volume and create fade effects
        backgroundAudio.volume = 0.3;
        
        backgroundAudio.play().catch(error => {
            console.log("Auto-play background music blocked. User interaction required.");
            
            // Create play prompt if needed
            const playPrompt = document.createElement('div');
            playPrompt.innerHTML = `
                <div style="position: fixed; top: 20px; right: 20px; background: var(--glass-bg); 
                           backdrop-filter: blur(10px); padding: 10px 20px; border-radius: 10px; 
                           color: white; z-index: 1000; cursor: pointer; border: 1px solid var(--glass-border);">
                    🎵 Nhấn để phát nhạc nền
                </div>
            `;
            document.body.appendChild(playPrompt);
            
            playPrompt.addEventListener('click', () => {
                backgroundAudio.play();
                playPrompt.remove();
            });
            
            setTimeout(() => {
                if (playPrompt.parentNode) {
                    playPrompt.remove();
                }
            }, 10000);
        });
    }

    // --- Performance Optimizations ---
    
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate positions if needed
            const leaves = document.querySelectorAll('.falling-leaf');
            leaves.forEach(leaf => {
                if (parseFloat(leaf.style.left) > window.innerWidth) {
                    leaf.style.left = `${Math.random() * 100}vw`;
                }
            });
        }, 250);
    });

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // --- Accessibility Enhancements ---
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            playButton.click();
        }
    });

    // Focus management
    playButton.addEventListener('focus', () => {
        playButton.style.outline = '2px solid var(--color-yellow-neon)';
        playButton.style.outlineOffset = '2px';
    });

    playButton.addEventListener('blur', () => {
        playButton.style.outline = 'none';
    });

    console.log("🎧 Enhanced Podcast Player Initialized Successfully! 🎧");
});