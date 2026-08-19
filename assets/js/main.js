/* ============================================
   MAIN APPLICATION
   main.js — Component loader, shared utilities
   ============================================ */

const App = (() => {
    'use strict';

    /**
     * Load an HTML component into a placeholder element
     */
    async function loadComponent(selector, file) {
        const element = document.querySelector(selector);
        if (!element) return;

        try {
            const response = await fetch(file);
            if (!response.ok) {
                console.error(`Component failed to load: ${file} (${response.status})`);
                return;
            }
            element.innerHTML = await response.text();
        } catch (err) {
            console.error(`Component fetch error: ${file}`, err);
        }
    }

    /**
     * Set active nav link based on current page
     */
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (!href) return;

            const linkPage = href.split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else if (currentPage === '' && linkPage === 'index.html') {
                link.classList.add('active');
            } else if (currentPage === 'blog-post.html' && linkPage === 'blog.html') {
                link.classList.add('active');
            } else if (currentPage === 'work-detail.html' && linkPage === 'works.html') {
                link.classList.add('active');
            } else if (currentPage === 'certificate-detail.html' && linkPage === 'certificates.html') {
                link.classList.add('active');
            }
        });

        initNavIndicator();
    }

    /**
     * Interactive sliding navbar pill indicator
     */
    function initNavIndicator() {
        const container = document.getElementById('navbar-nav-container');
        const indicator = document.getElementById('nav-indicator');
        if (!container || !indicator) return;

        const navLinks = container.querySelectorAll('.nav-link');
        let activeLink = container.querySelector('.nav-link.active') || navLinks[0];

        function moveToLink(link) {
            if (!link) return;
            const containerRect = container.getBoundingClientRect();
            const linkRect = link.getBoundingClientRect();
            const left = linkRect.left - containerRect.left;
            const width = linkRect.width;

            indicator.style.transform = `translateX(${left}px)`;
            indicator.style.width = `${width}px`;
            indicator.classList.add('visible');
        }

        // Initialize position after fonts & layout settle
        setTimeout(() => moveToLink(activeLink), 60);

        // Hover events for interactive sliding
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                moveToLink(link);
            });
        });

        container.addEventListener('mouseleave', () => {
            activeLink = container.querySelector('.nav-link.active') || navLinks[0];
            moveToLink(activeLink);
        });

        // Window resize reposition
        window.addEventListener('resize', () => {
            activeLink = container.querySelector('.nav-link.active') || navLinks[0];
            moveToLink(activeLink);
        }, { passive: true });
    }

    /**
     * Initialize mobile menu
     */
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.mobile-menu');
        if (!toggle || !menu) return;

        function openMenu() {
            toggle.classList.add('active');
            menu.classList.add('open');
            document.body.classList.add('no-scroll');
        }

        function closeMenu() {
            toggle.classList.remove('active');
            menu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }

        toggle.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on link click
        menu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close on outside click
        menu.addEventListener('click', (e) => {
            if (e.target === menu) closeMenu();
        });
    }

    /**
     * Toast notification system
     */
    function showToast(message, type = 'info', duration = 3000) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let iconSvg = '';
        if (type === 'success') {
            iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        } else if (type === 'error') {
            iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        } else {
            iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        }

        toast.innerHTML = `${iconSvg}<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }



    /**
     * Copy email to clipboard
     */
    function initCopyEmail() {
        document.querySelectorAll('.copy-email-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const email = btn.dataset.email;
                if (!email) return;
                try {
                    await navigator.clipboard.writeText(email);
                    showToast(LanguageManager.t('contactCopied'), 'success');
                } catch {
                    showToast('Could not copy email', 'error');
                }
            });
        });
    }

    /**
     * Auto-update copyright year
     */
    function updateYear() {
        const yearEl = document.getElementById('current-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /**
     * Keyboard shortcuts
     */
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // Alt + T: toggle theme
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                ThemeManager.toggle();
            }

            // Alt + L: toggle language
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                LanguageManager.toggle();
            }
        });
    }

    /**
     * Initialize the entire application
     */
    async function init() {
        // Load shared components
        await Promise.all([
            loadComponent('#navbar', 'assets/components/navbar.html'),
            loadComponent('#footer', 'assets/components/footer.html')
        ]);

        // Bind theme and language toggles (after components are loaded)
        ThemeManager.bindToggles();
        LanguageManager.bindToggles();

        // Set active nav
        setActiveNav();

        // Init mobile menu
        initMobileMenu();

        // Init contact form
        initContactForm();

        // Init copy email
        initCopyEmail();

        // Update year
        updateYear();

        // Init keyboard shortcuts
        initKeyboardShortcuts();

        // Init animations (after DOM is ready)
        AnimationManager.init();

        // Page-specific initialization
        initPageSpecific();
    }

    /**
     * Page-specific initialization with fail-safe DOM detection
     */
    function initPageSpecific() {
        // 1. Certificates Catalog Page
        if (document.getElementById('all-certificates')) {
            if (typeof ProjectsManager !== 'undefined') {
                ProjectsManager.renderCertificates('all-certificates', 'All');
                ProjectsManager.initCertFilters('all-certificates', 'cert-filters', 'cert-search-input');
            }
            return;
        }

        // 2. Certificate Detail Page
        if (document.getElementById('cert-title')) {
            if (typeof ProjectsManager !== 'undefined' && typeof ProjectsManager.renderCertificateDetail === 'function') {
                ProjectsManager.renderCertificateDetail();
            }
            return;
        }

        // 3. Works Page
        if (document.getElementById('all-projects')) {
            ProjectsManager.renderProjects('all-projects', 'All', false);
            ProjectsManager.initProjectFilters('all-projects', 'project-filters', 'project-search-input');
            ProjectsManager.bindModalEvents();
            if (typeof SecurityPlayground !== 'undefined') {
                SecurityPlayground.init();
            }
            return;
        }

        // 4. Work Detail Page
        if (document.getElementById('work-title')) {
            if (typeof ProjectsManager !== 'undefined' && typeof ProjectsManager.renderProjectDetail === 'function') {
                ProjectsManager.renderProjectDetail();
            }
            return;
        }

        // 5. Blog Catalog Page
        if (document.getElementById('all-blog-posts')) {
            ProjectsManager.renderBlogPosts('all-blog-posts', 'All');
            ProjectsManager.initBlogFilters('all-blog-posts', 'blog-filters', 'blog-search-input');
            return;
        }

        // 6. Blog Post Detail Page
        if (document.getElementById('blog-post-title')) {
            initBlogPostPage();
            return;
        }

        // 7. Home Page
        if (document.getElementById('featured-projects')) {
            ProjectsManager.renderProjects('featured-projects', null, true);
            ProjectsManager.renderBlogPosts('latest-blog-posts', null, 3);
            if (typeof GitHubManager !== 'undefined') {
                GitHubManager.init();
            }
            if (typeof AnimationManager !== 'undefined') {
                AnimationManager.initScrollReveal();
                AnimationManager.initSpotlightGlow();
                AnimationManager.init3DCardTilt();
            }
            return;
        }

        // 8. About Page
        if (document.querySelector('.about-timeline') || document.querySelector('.timeline-item')) {
            if (typeof GitHubManager !== 'undefined') {
                GitHubManager.init();
            }
            return;
        }

        // 9. Contact Page
        if (document.getElementById('contact-form')) {
            initContactForm();
            return;
        }
    }

    /**
     * Contact Form Submission Handler (Direct to yusufaliaskin@gmail.com via FormSubmit AJAX)
     */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form || form.dataset.bound === 'true') return;
        form.dataset.bound = 'true';

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const messageInput = document.getElementById('contact-message');
            const submitBtn = form.querySelector('button[type="submit"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Reset previous error classes
            [nameInput, emailInput, messageInput].forEach(inp => inp && inp.classList.remove('error'));

            // Simple validation
            let hasError = false;
            if (!name) {
                if (nameInput) nameInput.classList.add('error');
                hasError = true;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (emailInput) emailInput.classList.add('error');
                hasError = true;
            }
            if (!message) {
                if (messageInput) messageInput.classList.add('error');
                hasError = true;
            }

            if (hasError) return;

            const lang = (typeof LanguageManager !== 'undefined') ? LanguageManager.getCurrentLang() : 'tr';
            const originalBtnHtml = submitBtn.innerHTML;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="btn-spinner"></span> ${lang === 'tr' ? 'Gönderiliyor...' : 'Sending...'}`;

            try {
                const response = await fetch('https://formsubmit.co/ajax/yusufaliaskin@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject || 'Portfolio Contact Message',
                        message: message,
                        _subject: `[YusufAliAskin.com] ${name}: ${subject || 'Yeni İletişim Mesajı'}`
                    })
                });

                const data = await response.json();

                if (response.ok && data.success !== 'false') {
                    form.reset();
                    showToast(lang === 'tr' ? 'Mesajınız başarıyla iletildi!' : 'Message sent successfully!', 'success', 4000);
                } else {
                    const errorMsg = data.message || 'Transmission failed';
                    throw new Error(errorMsg);
                }
            } catch (err) {
                console.warn('[ContactForm] FormSubmit Error:', err);
                const isActivation = err.message && err.message.toLowerCase().includes('activation');
                
                if (isActivation) {
                    showToast(lang === 'tr' ? 'Aktivasyon e-postası gönderildi. Lütfen gelen kutunuzdaki linke tıklayın.' : 'Activation email sent. Please check your inbox.', 'info', 6000);
                } else {
                    showToast(lang === 'tr' ? 'Mesaj iletilemedi. Lütfen yusufaliaskin@gmail.com adresine yazın.' : 'Could not send. Please email directly to yusufaliaskin@gmail.com.', 'error', 5000);
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }

    /**
     * Blog post detail page initialization with full rich content & related articles
     */
    function initBlogPostPage() {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');

        if (!postId) {
            window.location.href = 'blog.html';
            return;
        }

        const post = ProjectsManager.getBlogPost(postId);
        if (!post) {
            window.location.href = 'blog.html';
            return;
        }

        const lang = LanguageManager.getCurrentLang();
        const title = ProjectsManager.getLocalizedText(post.title, lang);
        const description = ProjectsManager.getLocalizedText(post.description, lang);

        // Update page title & meta
        document.title = `${title} — Yusuf Ali Aşkın`;

        // Fill in blog post details
        const categoryEl = document.getElementById('blog-post-category');
        const dateEl = document.getElementById('blog-post-date');
        const readTimeEl = document.getElementById('blog-post-readtime');
        const titleEl = document.getElementById('blog-post-title');
        const contentEl = document.getElementById('blog-post-content');

        if (categoryEl) categoryEl.textContent = post.category;
        if (dateEl) dateEl.textContent = ProjectsManager.formatDate(post.date, lang);
        if (readTimeEl) readTimeEl.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>${post.readTime} ${lang === 'tr' ? 'dk okuma' : 'min read'}`;
        if (titleEl) titleEl.textContent = title;

        if (contentEl) {
            const articleBody = (post.content && post.content[lang]) || (post.content && post.content.en) || `<p>${description}</p>`;
            contentEl.innerHTML = articleBody;
        }

        // Render related posts (exclude current, prefer same category)
        const allPosts = ProjectsManager.getBlogPosts();
        let related = allPosts.filter(p => p.id !== postId && p.category === post.category);
        if (related.length < 3) {
            const otherPosts = allPosts.filter(p => p.id !== postId && p.category !== post.category);
            related = [...related, ...otherPosts].slice(0, 3);
        } else {
            related = related.slice(0, 3);
        }

        const relatedContainer = document.getElementById('related-posts');
        if (relatedContainer && related.length > 0) {
            relatedContainer.innerHTML = related.map(rp => `
                <article class="card card-accent blog-card reveal" tabindex="0" role="button" aria-label="${ProjectsManager.getLocalizedText(rp.title, lang)}" onclick="window.location.href='blog-post.html?id=${rp.id}'">
                    <div class="blog-card-header">
                        <span class="blog-category-badge">${rp.category}</span>
                        <span class="blog-card-date">${ProjectsManager.formatDate(rp.date, lang)}</span>
                    </div>
                    <h3 class="blog-card-title">${ProjectsManager.getLocalizedText(rp.title, lang)}</h3>
                    <p class="blog-card-summary">${ProjectsManager.getLocalizedText(rp.description, lang)}</p>
                    <div class="blog-card-footer">
                        <span class="blog-read-time-pill">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            ${rp.readTime} ${LanguageManager.t('blogMinRead')}
                        </span>
                        <span class="blog-read-action">
                            ${LanguageManager.t('blogReadMore')}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </span>
                    </div>
                </article>
            `).join('');
        }

        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.initScrollReveal();
            AnimationManager.init3DCardTilt();
        }
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { showToast, loadComponent };
})();
