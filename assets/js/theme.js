/* ============================================
   THEME SYSTEM
   theme.js — Smooth Shockwave Theme Transition & Day/Night Switch
   ============================================ */

const ThemeManager = (() => {
    'use strict';

    const STORAGE_KEY = 'ya-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    /**
     * Get saved theme or default to dark
     */
    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) || DARK;
        } catch {
            return DARK;
        }
    }

    /**
     * Apply theme to document
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            /* localStorage unavailable */
        }
        updateToggleIcons(theme);
    }

    /**
     * Update all theme toggle button visual state
     */
    function updateToggleIcons(theme) {
        const toggles = document.querySelectorAll('.theme-daynight-switch, .theme-toggle');
        toggles.forEach(toggle => {
            toggle.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
            toggle.setAttribute('data-theme', theme);
            toggle.classList.toggle('is-dark', theme === DARK);
            toggle.classList.toggle('is-light', theme === LIGHT);
        });
    }

    /**
     * Toggle between dark and light with smooth expanding circular shockwave
     */
    function toggle(e) {
        const current = document.documentElement.getAttribute('data-theme') || DARK;
        const next = current === DARK ? LIGHT : DARK;

        const button = (e && (e.currentTarget || (e.target && e.target.closest && (e.target.closest('.theme-daynight-switch') || e.target.closest('.theme-toggle'))))) 
                       || document.querySelector('.theme-daynight-switch') 
                       || document.querySelector('.theme-toggle');

        let x = window.innerWidth - 60;
        let y = 32;

        if (button) {
            const rect = button.getBoundingClientRect();
            x = Math.round(rect.left + rect.width / 2);
            y = Math.round(rect.top + rect.height / 2);
        } else if (e && typeof e.clientX === 'number') {
            x = Math.round(e.clientX);
            y = Math.round(e.clientY);
        }

        const maxDistX = Math.max(x, window.innerWidth - x);
        const maxDistY = Math.max(y, window.innerHeight - y);
        const endRadius = Math.ceil(Math.hypot(maxDistX, maxDistY) * 1.15);

        if (document.startViewTransition) {
            document.documentElement.classList.add('in-theme-transition');

            const transition = document.startViewTransition(() => {
                applyTheme(next);
            });

            transition.ready.then(() => {
                const anim = document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${endRadius}px at ${x}px ${y}px)`
                        ]
                    },
                    {
                        duration: 650,
                        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                        pseudoElement: '::view-transition-new(root)',
                        fill: 'forwards'
                    }
                );

                anim.finished.then(() => {
                    document.documentElement.classList.remove('in-theme-transition');
                }).catch(() => {
                    document.documentElement.classList.remove('in-theme-transition');
                });
            }).catch(() => {
                applyTheme(next);
                document.documentElement.classList.remove('in-theme-transition');
            });
        } else {
            applyTheme(next);
        }
    }

    /**
     * Initialize theme — apply immediately before DOM paints
     */
    function init() {
        const theme = getSavedTheme();
        applyTheme(theme);
    }

    /**
     * Bind toggle buttons
     */
    function bindToggles() {
        document.querySelectorAll('.theme-daynight-switch, .theme-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => toggle(e));
        });
        updateToggleIcons(getSavedTheme());
    }

    return { init, bindToggles, toggle, getSavedTheme };
})();

// Apply theme immediately before DOM paints
ThemeManager.init();
