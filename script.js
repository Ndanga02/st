class MatrixRain {
            constructor() {
                this.canvas = document.getElementById('matrix-canvas');
                this.ctx = this.canvas.getContext('2d');
                this.chars = '01';
                this.fontSize = 14;
                this.columns = 0;
                this.drops = [];
                this.init();
            }

            init() {
                this.resize();
                this.animate();
                window.addEventListener('resize', () => this.resize());
            }

            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.columns = Math.floor(this.canvas.width / this.fontSize);
                this.drops = Array(this.columns).fill(1);
            }

            animate() {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = `${this.fontSize}px monospace`;

                for (let i = 0; i < this.drops.length; i++) {
                    const text = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                    
                    if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                        this.drops[i] = 0;
                    }
                    this.drops[i]++;
                }
                
                requestAnimationFrame(() => this.animate());
            }
        }

        // Custom Cursor
        class CustomCursor {
            constructor() {
                this.cursor = document.querySelector('.cursor');
                this.init();
            }

            init() {
                document.addEventListener('mousemove', (e) => {
                    this.cursor.style.left = e.clientX + 'px';
                    this.cursor.style.top = e.clientY + 'px';
                });

                document.addEventListener('mousedown', () => {
                    this.cursor.style.transform = 'scale(0.8)';
                });

                document.addEventListener('mouseup', () => {
                    this.cursor.style.transform = 'scale(1)';
                });
            }
        }

        // Typewriter Effect
        class Typewriter {
            constructor(element, text, speed = 50) {
                this.element = element;
                this.text = text;
                this.speed = speed;
                this.index = 0;
                this.type();
            }

            type() {
                if (this.index < this.text.length) {
                    this.element.textContent += this.text.charAt(this.index);
                    this.index++;
                    setTimeout(() => this.type(), this.speed);
                }
            }
        }

        // Scroll Progress Indicator
        class ScrollProgress {
            constructor() {
                this.progressBar = document.querySelector('.scroll-progress');
                this.init();
            }

            init() {
                window.addEventListener('scroll', () => {
                    const scrollTop = document.documentElement.scrollTop;
                    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrollPercent = (scrollTop / scrollHeight) * 100;
                    this.progressBar.style.width = scrollPercent + '%';
                });
            }
        }

        // Counter Animation
        class CounterAnimation {
            constructor() {
                this.counters = document.querySelectorAll('.stat-number');
                this.init();
            }

            init() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateCounter(entry.target);
                        }
                    });
                });

                this.counters.forEach(counter => observer.observe(counter));
            }

            animateCounter(counter) {
                const target = parseBase(counter.dataset.target);
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 20);
            }
        }

        // Smooth Scroll
        class SmoothScroll {
            constructor() {
                this.init();
            }

            init() {
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', (e) => {
                        e.preventDefault();
                        const target = document.querySelector(anchor.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                });
            }
        }

        // Service Card Interactions
        class ServiceInteractions {
            constructor() {
                this.cards = document.querySelectorAll('.service-card');
                this.init();
            }

            init() {
                this.cards.forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        this.cards.forEach(otherCard => {
                            if (otherCard !== card) {
                                otherCard.style.opacity = '0.5';
                            }
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        this.cards.forEach(otherCard => {
                            otherCard.style.opacity = '1';
                        });
                    });
                });
            }
        }

        // Initialize all systems
        document.addEventListener('DOMContentLoaded', () => {
            new MatrixRain();
            new CustomCursor();
            new ScrollProgress();
            new CounterAnimation();
            new SmoothScroll();
            new ServiceInteractions();

            // Typewriter effect for terminal text
            const terminalText = "INITIALIZING NEURAL NETWORK PROTOCOLS...\nLOADING QUANTUM PROCESSING MODULES...\nENGAGING AUTONOMOUS DECISION MATRIX...\nSYSTEM READY FOR ENTERPRISE INTEGRATION.";
            const typedElement = document.getElementById('typed-text');
            new Typewriter(typedElement, terminalText, 30);

            // Advanced performance monitoring
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                        console.log(`⚡ SEMTEX LOAD TIME: ${entry.loadEventEnd - entry.loadEventStart}ms`);
                    }
                }
            });
            observer.observe({entryTypes: ['navigation']});
        });

        // Utility function for parsing numbers
        function parseBase(str) {
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
        }

        // Advanced error handling
        window.addEventListener('error', (e) => {
            console.error('⚠ SYSTEM ERROR:', e.error);
        });

        // Performance optimization for animations
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
        }
