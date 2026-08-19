/* ============================================
   ANIMATIONS — Apple & Linear $100K Motion System
   animations.js — Staggered reveals, spotlight aura, depth physics & scroll spy
   ============================================ */

const AnimationManager = (() => {
    'use strict';

    let observer = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Initialize IntersectionObserver for cinematic Apple-grade scroll reveals
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-stagger'
        );

        if (prefersReducedMotion) {
            revealElements.forEach(el => el.classList.add('revealed'));
            return;
        }

        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            if (!el.classList.contains('revealed')) {
                observer.observe(el);
            }
        });

        // Automatically configure staggered child delays in grids
        document.querySelectorAll('.projects-grid, .blog-grid, .blog-preview-grid, .tech-categories, .expertise-grid, .journey-timeline').forEach(grid => {
            if (!grid.classList.contains('reveal-stagger')) {
                grid.classList.add('reveal-stagger');
            }
            if (!grid.classList.contains('revealed')) {
                observer.observe(grid);
            }
        });
    }

    /**
     * Linear.app Style Spotlight Border & Aura Glow on Mouse Move
     */
    function initSpotlightGlow() {
        if (prefersReducedMotion || window.innerWidth < 768) return;

        const cards = document.querySelectorAll(
            '.project-card, .blog-card, .expertise-card, .card, .hero-photo-frame, .stat-card, .tech-category'
        );

        cards.forEach(card => {
            card.classList.add('spotlight-card');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    /**
     * Subtle 3D Card tilt on hover/mousemove
     */
    function init3DCardTilt() {
        if (prefersReducedMotion || window.innerWidth < 768) return;

        const cards = document.querySelectorAll('.project-card, .card, .tech-category, .hero-photo-frame');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -4.5;
                const rotateY = ((x - centerX) / centerX) * 4.5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /**
     * Hero Apple-style multi-plane scroll depth & parallax
     */
    function initHeroParallax() {
        if (prefersReducedMotion) return;

        const hero = document.getElementById('hero');
        const heroContent = document.querySelector('.hero-content');
        const heroPhoto = document.querySelector('.hero-photo-frame');
        const heroGrid = document.querySelector('.hero-grid');
        const heroGlow = document.querySelector('.hero-glow');

        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight || window.innerHeight;

            if (scrollY <= heroHeight) {
                const progress = scrollY / heroHeight;
                const opacity = Math.max(0, 1 - progress * 1.3);
                const translateY = scrollY * 0.26;
                const scale = Math.max(0.95, 1 - progress * 0.06);

                if (heroContent) {
                    heroContent.style.opacity = opacity;
                    heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
                }

                if (heroPhoto) {
                    const photoTranslateY = scrollY * 0.14;
                    const photoScale = Math.max(0.96, 1 - progress * 0.05);
                    heroPhoto.style.transform = `translateY(${photoTranslateY}px) scale(${photoScale})`;
                    heroPhoto.style.opacity = opacity;
                }
            }
        }, { passive: true });

        // Subtle ambient mouse depth on hero background
        if (window.innerWidth >= 768) {
            let ticking = false;
            document.addEventListener('mousemove', (e) => {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 24;
                    const y = (e.clientY / window.innerHeight - 0.5) * 24;

                    if (heroGrid) {
                        heroGrid.style.transform = `translate(${x * 0.45}px, ${y * 0.45}px)`;
                    }
                    if (heroGlow) {
                        heroGlow.style.transform = `translateX(calc(-50% + ${x * 1.6}px)) translateY(${y * 1.6}px)`;
                    }
                    ticking = false;
                });
            }, { passive: true });
        }
    }

    /**
     * Subtle Magnetic Micro-Interactions on CTAs and Social Badges
     */
    function initMagneticButtons() {
        if (prefersReducedMotion || window.innerWidth < 768) return;

        const magnets = document.querySelectorAll('.hero-buttons .btn, .hero-social a, .filter-btn');

        magnets.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    /**
     * Navbar scroll behavior — add .scrolled class
     */
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 15) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    /**
     * Scroll progress indicator with glowing head
     */
    function initScrollProgress() {
        const bars = document.querySelectorAll('.scroll-progress, .reading-progress-bar');
        if (!bars || bars.length === 0) return;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bars.forEach(bar => {
                bar.style.width = scrollPercent + '%';
            });
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /**
     * Back to top button
     */
    function initBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Initialize all animation systems
     */
    function init() {
        initScrollReveal();
        initSpotlightGlow();
        init3DCardTilt();
        initHeroParallax();
        initMagneticButtons();
        initNavbarScroll();
        initScrollProgress();
        initBackToTop();
    }

    return {
        init,
        initScrollReveal,
        initSpotlightGlow,
        init3DCardTilt,
        initHeroParallax,
        initMagneticButtons
    };
})();
