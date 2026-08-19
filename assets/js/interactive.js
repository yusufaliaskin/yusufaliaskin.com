/* ============================================
   INTERACTIVE ENGINE — $10k Award-Winning Experience
   interactive.js — Cyber-Particle Mesh, Live Terminal, Animated Counters & Sound FX
   ============================================ */

const InteractiveEngine = (() => {
    'use strict';

    /* ============================================
       1. Ambient Cyber-Particle Mesh Canvas
       ============================================ */
    function initParticleMesh() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const particles = [];
        const numParticles = Math.min(Math.floor(window.innerWidth / 24), 65);
        const mouse = { x: null, y: null, radius: 140 };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.8 + 0.8;
                this.baseAlpha = Math.random() * 0.4 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Mouse push interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.x -= Math.cos(angle) * force * 1.5;
                        this.y -= Math.sin(angle) * force * 1.5;
                    }
                }
            }

            draw() {
                const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `rgba(218, 119, 86, ${this.baseAlpha})`
                    : `rgba(201, 100, 66, ${this.baseAlpha * 0.8})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            const maxDistance = 120;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * (isDark ? 0.16 : 0.08);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = isDark
                            ? `rgba(218, 119, 86, ${alpha})`
                            : `rgba(201, 100, 66, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        let animationFrameId;
        function render() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            animationFrameId = requestAnimationFrame(render);
        }
        render();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }

    /* ============================================
       2. Interactive Live Cybersecurity Terminal
       ============================================ */
    function initTerminal() {
        const terminalOutput = document.getElementById('terminal-output');
        const terminalInput = document.getElementById('terminal-input');
        const tabButtons = document.querySelectorAll('.terminal-tab');
        if (!terminalOutput || !terminalInput) return;

        const terminalData = {
            'profile.py': `# =========================================
# Yusuf Ali Aşkın — Profile Matrix
# =========================================

class Developer:
    def __init__(self):
        self.name = "Yusuf Ali Aşkın"
        self.role = "Software Developer & Security Enthusiast"
        self.location = "İstanbul, TR"
        self.status = "Available for hire & collaboration"
        self.stack = ["Python", "JavaScript", "C++", "Linux", "SIEM", "AI"]

    def mission(self):
        return "Building real, functional systems that solve actual problems."

yusuf = Developer()
print(f"Status: {yusuf.status}")`,

            'security.sh': `#!/bin/bash
# Network & Infrastructure Diagnostic
echo "[+] Initializing security scan..."
echo "[+] Active Firewall: UFW Enabled"
echo "[+] Wazuh SIEM Agent: Connected (ID: 004)"
echo "[+] Zero Vulnerabilities Detected"
echo "[+] Network Status: 100% Operational"
echo "========================================="
echo "[*] System Ready. Awaiting commands."`,

            'terminal': null // Interactive shell
        };

        // Render syntax highlighted code or shell
        function showTabContent(tabName) {
            if (tabName === 'terminal') {
                terminalOutput.innerHTML = `
<div class="term-line"><span class="term-prompt">yusuf@arch:~$</span> <span class="term-text">Type <strong class="term-cmd">help</strong> to see available commands or click quick actions below.</span></div>
<div class="term-line"><span class="term-prompt">yusuf@arch:~$</span> <span class="term-highlight">system.status -> ALL SYSTEMS NOMINAL [200 OK]</span></div>`;
                terminalInput.parentElement.style.display = 'flex';
                terminalInput.focus();
            } else {
                const code = terminalData[tabName] || '';
                terminalInput.parentElement.style.display = 'none';
                terminalOutput.innerHTML = `<pre class="code-view"><code>${escapeHTML(code)}</code></pre>`;
            }
        }

        function escapeHTML(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                showTabContent(btn.dataset.tab);
                playTone(400, 'sine', 0.05);
            });
        });

        // Interactive Terminal Commands
        const commands = {
            help: 'Available commands: <strong>whoami</strong>, <strong>skills</strong>, <strong>projects</strong>, <strong>contact</strong>, <strong>matrix</strong>, <strong>clear</strong>',
            whoami: 'Yusuf Ali Aşkın — Software Developer & Cybersecurity Enthusiast crafting high-impact secure applications.',
            skills: 'Python, JavaScript, React, C++, C#, Linux, Active Directory, Wazuh, SIEM, Grafana, Docker, Flask, AI APIs.',
            projects: 'Featured: AfetNet (Disaster Comms), AI System Dashboard (Nmap/SSH), AIStudio (Multi-LLM), Swopy Network (CLI Analyzer).',
            contact: 'Email: yusufaliaskin@gmail.com | GitHub: github.com/yusufaliaskin | LinkedIn: linkedin.com/in/yusufaliaskin',
            status: '🟢 Status: Available for freelance projects, security audits & full-time roles.',
            matrix: '01011001 01010101 01010011 01010101 01000110 — ACCESS GRANTED.',
            clear: '__CLEAR__'
        };

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCmd = terminalInput.value.trim().toLowerCase();
                if (!rawCmd) return;

                terminalInput.value = '';

                if (rawCmd === 'clear') {
                    terminalOutput.innerHTML = '';
                    return;
                }

                const response = commands[rawCmd] || `Command not found: "${rawCmd}". Type <strong>help</strong> for commands.`;

                const cmdLine = document.createElement('div');
                cmdLine.className = 'term-line';
                cmdLine.innerHTML = `<span class="term-prompt">yusuf@arch:~$</span> <span class="term-user-cmd">${escapeHTML(rawCmd)}</span>`;
                terminalOutput.appendChild(cmdLine);

                const resLine = document.createElement('div');
                resLine.className = 'term-line term-response';
                resLine.innerHTML = `<span class="term-output">${response}</span>`;
                terminalOutput.appendChild(resLine);

                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                playTone(520, 'triangle', 0.06);
            }
        });

        // Quick action buttons
        document.querySelectorAll('.quick-cmd-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.dataset.cmd;
                if (!cmd) return;

                // Switch to terminal tab if not already on it
                const termTab = document.querySelector('.terminal-tab[data-tab="terminal"]');
                if (termTab && !termTab.classList.contains('active')) {
                    tabButtons.forEach(b => b.classList.remove('active'));
                    termTab.classList.add('active');
                    showTabContent('terminal');
                }

                terminalInput.value = cmd;
                terminalInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            });
        });

        // Initialize default tab
        showTabContent('profile.py');
    }

    /* ============================================
       3. Animated Counter Statistics on Scroll
       ============================================ */
    function initCounters() {
        const counters = document.querySelectorAll('.stat-counter');
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target, 10) || 0;
                    const suffix = el.dataset.suffix || '';
                    const duration = 1600;
                    const start = performance.now();

                    function updateCount(time) {
                        const elapsed = time - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * target);

                        el.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = target + suffix;
                        }
                    }

                    requestAnimationFrame(updateCount);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.25 });

        counters.forEach(c => observer.observe(c));
    }

    /* ============================================
       4. Spotlight Mouse-Follow Glow on Cards
       ============================================ */
    function initSpotlightCards() {
        const cards = document.querySelectorAll('.card, .project-card, .bento-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    /* ============================================
       5. Procedural Web Audio Sound FX (No audio files needed!)
       ============================================ */
    let audioCtx = null;
    let isMuted = true; // Default muted for accessibility

    function playTone(freq = 440, type = 'sine', duration = 0.05) {
        if (isMuted) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch { /* Audio not supported */ }
    }

    function initSoundToggle() {
        const soundBtn = document.getElementById('sound-toggle-btn');
        if (!soundBtn) return;

        soundBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            soundBtn.setAttribute('aria-label', isMuted ? 'Unmute UI sounds' : 'Mute UI sounds');
            soundBtn.classList.toggle('active', !isMuted);

            soundBtn.innerHTML = isMuted
                ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
                : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;

            if (!isMuted) {
                playTone(600, 'sine', 0.08);
            }
        });
    }

    /* ============================================
       Initialize All Interactive Modules
       ============================================ */
    function init() {
        initParticleMesh();
        initTerminal();
        initCounters();
        initSpotlightCards();
        initSoundToggle();
    }

    return { init, playTone };
})();
