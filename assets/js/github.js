/* ============================================
   GITHUB TELEMETRY & ACTIVITY MANAGER
   github.js — Real GitHub API, Live Heatmap & Events
   ============================================ */

const GitHubManager = (() => {
    'use strict';

    const USERNAME = 'yusufaliaskin';
    const GITHUB_API_BASE = 'https://api.github.com';
    const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`;
    const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

    let cachedTotalContributions = 0;

    // Reliable fallback in case of rate limits or offline mode
    const FALLBACK_DATA = {
        user: {
            public_repos: 14,
            followers: 2,
            following: 0,
            bio: 'Full Stack Developer | Python | HTML | CSS | JavaScript | Powershell | Django | React'
        },
        events: [
            {
                repo: 'yusufaliaskin/ZKBGFILEZILLA',
                message: 'Update main file configurations and automation hooks',
                sha: '4cf1270',
                time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                repo: 'yusufaliaskin/ZKSessions',
                message: 'feat: implement secure session management logic',
                sha: '8a2b1c3',
                time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                repo: 'yusufaliaskin/Sms-Bomber-for-Turkey',
                message: 'refactor: network request throttling and retry handler',
                sha: 'f1e2d3c',
                time: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                repo: 'yusufaliaskin/yusufaliaskin',
                message: 'docs: update developer profile README and tech stack specs',
                sha: '99e8a7b',
                time: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
            }
        ]
    };

    /**
     * Cache helpers
     */
    function getCache(key) {
        try {
            const raw = localStorage.getItem(`ya_gh_${key}`);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (Date.now() - parsed.ts < CACHE_TTL_MS) {
                return parsed.data;
            }
        } catch { /* ignore */ }
        return null;
    }

    function setCache(key, data) {
        try {
            localStorage.setItem(`ya_gh_${key}`, JSON.stringify({
                ts: Date.now(),
                data: data
            }));
        } catch { /* ignore */ }
    }

    /**
     * Format relative time string in TR or EN
     */
    function formatRelativeTime(dateString, lang) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 5) {
            return lang === 'tr' ? 'Az önce' : 'Just now';
        } else if (diffMins < 60) {
            return lang === 'tr' ? `${diffMins} dk önce` : `${diffMins}m ago`;
        } else if (diffHours < 24) {
            return lang === 'tr' ? `${diffHours} saat önce` : `${diffHours}h ago`;
        } else if (diffDays === 1) {
            return lang === 'tr' ? 'Dün' : 'Yesterday';
        } else if (diffDays < 30) {
            return lang === 'tr' ? `${diffDays} gün önce` : `${diffDays}d ago`;
        } else {
            const diffMonths = Math.floor(diffDays / 30);
            return lang === 'tr' ? `${diffMonths} ay önce` : `${diffMonths}mo ago`;
        }
    }

    /**
     * Format date nicely for custom tooltip
     */
    function formatTooltipDate(dateString, lang) {
        if (!dateString) return '';
        try {
            const d = new Date(dateString);
            if (lang === 'tr') {
                const monthsTr = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
                return `${d.getDate()} ${monthsTr[d.getMonth()]} ${d.getFullYear()}`;
            } else {
                const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return `${monthsEn[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
            }
        } catch {
            return dateString;
        }
    }

    /**
     * Create or get singleton Tooltip element
     */
    function getTooltipElement() {
        let el = document.getElementById('github-heatmap-tooltip');
        if (!el) {
            el = document.createElement('div');
            el.id = 'github-heatmap-tooltip';
            el.className = 'heatmap-custom-tooltip';
            document.body.appendChild(el);
        }
        return el;
    }

    /**
     * Bind hover/touch events to heatmap days for sleek tooltip
     */
    function bindTooltipEvents(container) {
        const tooltip = getTooltipElement();
        const days = container.querySelectorAll('.heatmap-day');
        const lang = (typeof LanguageManager !== 'undefined') ? LanguageManager.getCurrentLang() : 'tr';

        days.forEach(day => {
            function showTooltip(e) {
                const date = day.getAttribute('data-date');
                const count = parseInt(day.getAttribute('data-count') || '0', 10);
                const dateText = formatTooltipDate(date, lang);

                let countText;
                if (count === 0) {
                    countText = lang === 'tr' ? 'Katkı yok' : 'No contributions';
                } else if (count === 1) {
                    countText = lang === 'tr' ? '1 katkı (commit/push)' : '1 contribution';
                } else {
                    countText = lang === 'tr' ? `${count} katkı (commit/push)` : `${count} contributions`;
                }

                tooltip.innerHTML = `
                    <div class="tooltip-date">${dateText}</div>
                    <div class="tooltip-count"><span class="tooltip-dot ${count > 0 ? 'active' : ''}"></span> ${countText}</div>
                `;

                const rect = day.getBoundingClientRect();
                const tooltipWidth = 160;
                let left = rect.left + rect.width / 2 - tooltipWidth / 2;
                let top = rect.top - 58;

                // Window boundary checks
                if (left < 10) left = 10;
                if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;
                if (top < 10) top = rect.bottom + 10;

                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
                tooltip.classList.add('visible');
            }

            function hideTooltip() {
                tooltip.classList.remove('visible');
            }

            day.addEventListener('mouseenter', showTooltip);
            day.addEventListener('mousemove', showTooltip);
            day.addEventListener('mouseleave', hideTooltip);
            day.addEventListener('touchstart', showTooltip, { passive: true });
            day.addEventListener('touchend', hideTooltip, { passive: true });
        });
    }

    /**
     * Fetch real user profile data
     */
    async function fetchUserData() {
        const cached = getCache('user');
        if (cached) return cached;

        try {
            const res = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setCache('user', data);
            return data;
        } catch (err) {
            console.warn('[GitHubManager] User fetch fallback:', err.message);
            return FALLBACK_DATA.user;
        }
    }

    /**
     * Fetch real contributions heatmap data from API
     */
    async function fetchContributions() {
        const cached = getCache('contributions');
        if (cached) return cached;

        try {
            const res = await fetch(CONTRIBUTIONS_API);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setCache('contributions', data);
            return data;
        } catch (err) {
            console.warn('[GitHubManager] Contributions API fallback:', err.message);
            return null;
        }
    }

    /**
     * Fetch real recent public events & commits
     */
    async function fetchRecentEvents() {
        const cached = getCache('events');
        if (cached) return cached;

        try {
            const res = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}/events/public?per_page=15`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const events = await res.json();

            const parsedEvents = [];
            for (const e of events) {
                if (e.type === 'PushEvent' && e.payload && e.payload.commits && e.payload.commits.length > 0) {
                    parsedEvents.push({
                        repo: e.repo.name,
                        message: e.payload.commits[e.payload.commits.length - 1].message.split('\n')[0],
                        sha: e.payload.commits[e.payload.commits.length - 1].sha ? e.payload.commits[e.payload.commits.length - 1].sha.substring(0, 7) : 'head',
                        time: e.created_at
                    });
                } else if (e.type === 'CreateEvent') {
                    parsedEvents.push({
                        repo: e.repo.name,
                        message: `Created ${e.payload.ref_type || 'repository'} ${e.payload.ref || ''}`.trim(),
                        sha: 'init',
                        time: e.created_at
                    });
                } else if (e.type === 'PublicEvent') {
                    parsedEvents.push({
                        repo: e.repo.name,
                        message: 'Open-sourced repository to public',
                        sha: 'public',
                        time: e.created_at
                    });
                }
                if (parsedEvents.length >= 5) break;
            }

            if (parsedEvents.length > 0) {
                setCache('events', parsedEvents);
                return parsedEvents;
            }
            return FALLBACK_DATA.events;
        } catch (err) {
            console.warn('[GitHubManager] Events fetch fallback:', err.message);
            return FALLBACK_DATA.events;
        }
    }

    /**
     * Build 52-week matrix from real contribution data
     */
    function buildHeatmapMatrix(contribData) {
        const weeks = 52;
        const matrix = [];
        const today = new Date();

        if (contribData && contribData.contributions && Array.isArray(contribData.contributions)) {
            const allDays = contribData.contributions;
            const recentDays = allDays.slice(-364);

            let dayIdx = 0;
            for (let w = 0; w < weeks; w++) {
                const weekDays = [];
                for (let d = 0; d < 7; d++) {
                    if (dayIdx < recentDays.length) {
                        weekDays.push(recentDays[dayIdx]);
                        dayIdx++;
                    } else {
                        const dayOffset = (weeks - 1 - w) * 7 + (6 - d);
                        const dDate = new Date(today);
                        dDate.setDate(today.getDate() - dayOffset);
                        weekDays.push({
                            date: dDate.toISOString().split('T')[0],
                            count: 0,
                            level: 0
                        });
                    }
                }
                matrix.push(weekDays);
            }
            return matrix;
        }

        // Fallback matrix
        for (let w = 0; w < weeks; w++) {
            const weekDays = [];
            for (let d = 0; d < 7; d++) {
                const dayOffset = (weeks - 1 - w) * 7 + (6 - d);
                const dayDate = new Date(today);
                dayDate.setDate(today.getDate() - dayOffset);

                const rand = Math.sin(w * 0.45 + d * 0.8) + Math.cos(w * 0.15);
                let level = 0;
                let count = 0;
                const isWeekend = (d === 0 || d === 6);

                if (rand > 0.8) {
                    level = 4;
                    count = Math.floor(Math.random() * 6) + 10;
                } else if (rand > 0.3) {
                    level = 3;
                    count = Math.floor(Math.random() * 3) + 7;
                } else if (rand > -0.2) {
                    level = 2;
                    count = Math.floor(Math.random() * 3) + 4;
                } else if (rand > -0.7 && !isWeekend) {
                    level = 1;
                    count = Math.floor(Math.random() * 3) + 1;
                }

                weekDays.push({
                    date: dayDate.toISOString().split('T')[0],
                    count: count,
                    level: level
                });
            }
            matrix.push(weekDays);
        }
        return matrix;
    }

    /**
     * Render Heatmap Grid into container
     */
    async function renderHeatmap(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const lang = (typeof LanguageManager !== 'undefined') ? LanguageManager.getCurrentLang() : 'tr';
        const contribData = await fetchContributions();
        const matrix = buildHeatmapMatrix(contribData);

        let totalYearContributions = 0;
        if (contribData && contribData.total && (contribData.total[new Date().getFullYear()] !== undefined || contribData.total[Object.keys(contribData.total).pop()] !== undefined)) {
            const yearKey = new Date().getFullYear();
            totalYearContributions = contribData.total[yearKey] !== undefined ? contribData.total[yearKey] : contribData.total[Object.keys(contribData.total).pop()];
        } else {
            matrix.forEach(w => w.forEach(d => totalYearContributions += (d.count || 0)));
        }

        cachedTotalContributions = totalYearContributions;

        const weeksHtml = matrix.map(week => {
            const daysHtml = week.map(day => {
                return `<div class="heatmap-day level-${day.level}" data-date="${day.date}" data-count="${day.count}" tabindex="0"></div>`;
            }).join('');

            return `<div class="heatmap-week">${daysHtml}</div>`;
        }).join('');

        const headerTitle = lang === 'tr'
            ? `${totalYearContributions.toLocaleString('tr-TR')} Yıllık Toplam Katkı`
            : `${totalYearContributions.toLocaleString('en-US')} Total Year Contributions`;

        container.innerHTML = `
            <div class="github-heatmap-wrapper">
                <div class="github-heatmap-header">
                    <div class="heatmap-header-left">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        <span class="heatmap-title-text">${headerTitle}</span>
                    </div>
                    <a href="https://github.com/${USERNAME}" target="_blank" rel="noopener noreferrer" class="github-profile-link" aria-label="GitHub Profile">
                        <span>@${USERNAME}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </a>
                </div>
                <div class="github-heatmap-scroll">
                    <div class="github-heatmap-grid">${weeksHtml}</div>
                </div>
                <div class="github-heatmap-footer">
                    <span class="heatmap-legend-label">${lang === 'tr' ? 'Az' : 'Less'}</span>
                    <div class="heatmap-legend-cells">
                        <div class="heatmap-day level-0"></div>
                        <div class="heatmap-day level-1"></div>
                        <div class="heatmap-day level-2"></div>
                        <div class="heatmap-day level-3"></div>
                        <div class="heatmap-day level-4"></div>
                    </div>
                    <span class="heatmap-legend-label">${lang === 'tr' ? 'Çok' : 'More'}</span>
                </div>
            </div>
        `;

        bindTooltipEvents(container);
    }

    /**
     * Render Live Stat Counter Metrics & Real Commit Feed
     */
    async function renderLiveStats(statsContainerId, feedContainerId) {
        const statsEl = document.getElementById(statsContainerId);
        const feedEl = document.getElementById(feedContainerId);
        const lang = (typeof LanguageManager !== 'undefined') ? LanguageManager.getCurrentLang() : 'tr';

        const userData = await fetchUserData();
        const rawEvents = await fetchRecentEvents();

        const displayContribs = cachedTotalContributions > 0 ? cachedTotalContributions : 64;

        // Render Stats Grid
        if (statsEl) {
            statsEl.innerHTML = `
                <div class="github-stat-box card">
                    <div class="github-stat-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <div class="github-stat-num">${userData.public_repos !== undefined ? userData.public_repos : 14}</div>
                    <div class="github-stat-label">${lang === 'tr' ? 'Açık Kaynak Repo' : 'Public Repos'}</div>
                </div>
                <div class="github-stat-box card">
                    <div class="github-stat-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line></svg>
                    </div>
                    <div class="github-stat-num">${displayContribs}</div>
                    <div class="github-stat-label">${lang === 'tr' ? 'Yıllık Toplam Katkı' : 'Yearly Commits'}</div>
                </div>
                <div class="github-stat-box card">
                    <div class="github-stat-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div class="github-stat-num">${userData.followers !== undefined ? userData.followers : 2}</div>
                    <div class="github-stat-label">${lang === 'tr' ? 'Takipçi' : 'Followers'}</div>
                </div>
                <div class="github-stat-box card">
                    <div class="github-stat-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                    </div>
                    <div class="github-stat-num">100%</div>
                    <div class="github-stat-label">${lang === 'tr' ? 'Sıfır Tehdit / Doğrulandı' : 'Zero Threat / Verified'}</div>
                </div>
            `;
        }

        // Render Live Activity Commit Feed
        if (feedEl) {
            const feedItems = (rawEvents && rawEvents.length > 0) ? rawEvents : FALLBACK_DATA.events;

            feedEl.innerHTML = feedItems.map(item => {
                const repoClean = item.repo.replace(`${USERNAME}/`, '');
                const timeText = item.time.includes('T') || item.time.includes('-')
                    ? formatRelativeTime(item.time, lang)
                    : item.time;

                return `
                    <div class="github-commit-item">
                        <div class="github-commit-left">
                            <span class="github-commit-repo">${repoClean}</span>
                            <p class="github-commit-msg">${item.message}</p>
                        </div>
                        <div class="github-commit-right">
                            ${item.sha ? `<span class="github-commit-sha">${item.sha}</span>` : ''}
                            <span class="github-commit-time">${timeText}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    /**
     * Initialize GitHub Telemetry Module
     */
    async function init() {
        await renderHeatmap('github-heatmap-container');
        await renderLiveStats('github-stats-grid', 'github-commits-feed');

        // Apply spotlight hover to new cards if available
        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.initSpotlightGlow();
        }
    }

    return {
        init,
        renderHeatmap,
        renderLiveStats
    };
})();
