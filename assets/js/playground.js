/* ============================================
   SECURITY PLAYGROUND & CRYPTOGRAPHY MODULE
   playground.js — Interactive Cybersecurity Suite
   ============================================ */

const SecurityPlayground = (() => {
    'use strict';

    /**
     * Convert buffer to hex string
     */
    function bufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    /**
     * Convert hex string to buffer
     */
    function hexToBuffer(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes.buffer;
    }

    /**
     * Generate Cryptographic Hash using Web Crypto API
     */
    async function computeHash(algorithm, text) {
        if (!text) return '';
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest(algorithm, data);
            return bufferToHex(hashBuffer);
        } catch (err) {
            console.error('[SecurityPlayground] Hash error:', err);
            return 'Error computing hash';
        }
    }

    /**
     * Password Entropy & Security Analysis
     * Mathematical Shannon Entropy: E = L * log2(R)
     */
    function analyzePassword(password) {
        if (!password) {
            return {
                length: 0,
                poolSize: 0,
                entropy: 0,
                score: 0,
                level: 'none',
                crackTime: '0 seconds',
                crackTimeTr: '0 saniye',
                checks: { length: false, upper: false, lower: false, number: false, symbol: false }
            };
        }

        const len = password.length;
        let poolSize = 0;
        const checks = {
            length: len >= 12,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            symbol: /[^A-Za-z0-9]/.test(password)
        };

        if (checks.lower) poolSize += 26;
        if (checks.upper) poolSize += 26;
        if (checks.number) poolSize += 10;
        if (checks.symbol) poolSize += 33;

        if (poolSize === 0) poolSize = 1;

        // Entropy in bits
        const entropy = Math.round(len * Math.log2(poolSize));

        // Combinations = poolSize ^ len
        // Assume 100 Billion (1e11) guesses/sec for high-end GPU cluster
        const guessesPerSec = 1e11;
        const totalCombinations = Math.pow(poolSize, len);
        const secondsToCrack = totalCombinations / (2 * guessesPerSec);

        let crackTime = '';
        let crackTimeTr = '';

        if (secondsToCrack < 1) {
            crackTime = 'Instant (< 1 second)';
            crackTimeTr = 'Anında (< 1 saniye)';
        } else if (secondsToCrack < 60) {
            crackTime = `${Math.round(secondsToCrack)} seconds`;
            crackTimeTr = `${Math.round(secondsToCrack)} saniye`;
        } else if (secondsToCrack < 3600) {
            crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
            crackTimeTr = `${Math.round(secondsToCrack / 60)} dakika`;
        } else if (secondsToCrack < 86400) {
            crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
            crackTimeTr = `${Math.round(secondsToCrack / 3600)} saat`;
        } else if (secondsToCrack < 31536000) {
            crackTime = `${Math.round(secondsToCrack / 86400)} days`;
            crackTimeTr = `${Math.round(secondsToCrack / 86400)} gün`;
        } else if (secondsToCrack < 31536000 * 1000) {
            crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
            crackTimeTr = `${Math.round(secondsToCrack / 31536000)} yıl`;
        } else if (secondsToCrack < 31536000 * 1e6) {
            crackTime = `${Math.round(secondsToCrack / (31536000 * 1000))} thousand years`;
            crackTimeTr = `${Math.round(secondsToCrack / (31536000 * 1000))} bin yıl`;
        } else if (secondsToCrack < 31536000 * 1e9) {
            crackTime = `${Math.round(secondsToCrack / (31536000 * 1e6))} million years`;
            crackTimeTr = `${Math.round(secondsToCrack / (31536000 * 1e6))} milyon yıl`;
        } else {
            crackTime = 'Centuries / Impractical to crack';
            crackTimeTr = 'Yüzyıllar / Kırılması imkansız';
        }

        let level = 'weak';
        let score = 25;

        if (entropy >= 80 && checks.length && (checks.upper + checks.lower + checks.number + checks.symbol >= 3)) {
            level = 'very-strong';
            score = 100;
        } else if (entropy >= 60 && (checks.upper + checks.lower + checks.number + checks.symbol >= 3)) {
            level = 'strong';
            score = 75;
        } else if (entropy >= 40) {
            level = 'medium';
            score = 50;
        }

        return {
            length: len,
            poolSize,
            entropy,
            score,
            level,
            crackTime,
            crackTimeTr,
            checks
        };
    }

    /**
     * Derive AES-GCM 256 Key from passphrase using PBKDF2
     */
    async function deriveKey(passphrase, salt) {
        const encoder = new TextEncoder();
        const baseKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(passphrase),
            'PBKDF2',
            false,
            ['deriveKey']
        );

        return await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            baseKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    /**
     * Encrypt text with AES-256-GCM
     */
    async function encryptAES(plainText, passphrase) {
        if (!plainText || !passphrase) return '';
        try {
            const encoder = new TextEncoder();
            const salt = crypto.getRandomValues(new Uint8Array(16));
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const key = await deriveKey(passphrase, salt);

            const encryptedBuffer = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encoder.encode(plainText)
            );

            // Payload structure: Salt (16 bytes) + IV (12 bytes) + Ciphertext
            const combined = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

            return btoa(String.fromCharCode.apply(null, combined));
        } catch (err) {
            console.error('[SecurityPlayground] AES Encrypt error:', err);
            return 'Encryption failed';
        }
    }

    /**
     * Decrypt text with AES-256-GCM
     */
    async function decryptAES(cipherBase64, passphrase) {
        if (!cipherBase64 || !passphrase) return '';
        try {
            const binaryString = atob(cipherBase64.trim());
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            if (bytes.length < 28) return 'Invalid ciphertext length';

            const salt = bytes.slice(0, 16);
            const iv = bytes.slice(16, 28);
            const data = bytes.slice(28);

            const key = await deriveKey(passphrase, salt);
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                data
            );

            const decoder = new TextDecoder();
            return decoder.decode(decryptedBuffer);
        } catch (err) {
            return 'Decryption failed: Incorrect passphrase or corrupted payload';
        }
    }

    /**
     * Subnet CIDR Calculator
     */
    function calculateSubnet(cidrString) {
        const parts = cidrString.trim().split('/');
        if (parts.length !== 2) return null;

        const ipStr = parts[0].trim();
        const maskBits = parseInt(parts[1].trim(), 10);

        if (isNaN(maskBits) || maskBits < 0 || maskBits > 32) return null;

        const ipParts = ipStr.split('.').map(Number);
        if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) return null;

        const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
        const maskNum = maskBits === 0 ? 0 : (~0 << (32 - maskBits));
        const networkNum = ipNum & maskNum;
        const broadcastNum = networkNum | ~maskNum;

        const numToIp = num => [
            (num >>> 24) & 255,
            (num >>> 16) & 255,
            (num >>> 8) & 255,
            num & 255
        ].join('.');

        const totalHosts = Math.pow(2, 32 - maskBits);
        const usableHosts = maskBits >= 31 ? (maskBits === 31 ? 2 : 1) : totalHosts - 2;

        const firstHost = maskBits >= 31 ? numToIp(networkNum) : numToIp(networkNum + 1);
        const lastHost = maskBits >= 31 ? numToIp(broadcastNum) : numToIp(broadcastNum - 1);

        return {
            cidr: `${ipStr}/${maskBits}`,
            network: numToIp(networkNum),
            netmask: numToIp(maskNum),
            broadcast: numToIp(broadcastNum),
            firstHost: firstHost,
            lastHost: lastHost,
            usableHosts: usableHosts.toLocaleString(),
            totalHosts: totalHosts.toLocaleString(),
            maskBits: maskBits
        };
    }

    /**
     * Copy text helper
     */
    function copyToClipboard(text, btnElement) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = btnElement.getAttribute('data-original-text') || btnElement.textContent;
            btnElement.setAttribute('data-original-text', originalText);
            btnElement.textContent = 'Copied';
            setTimeout(() => {
                btnElement.textContent = originalText;
            }, 1800);
        });
    }

    /**
     * Initialize DOM Event Handlers for Playground
     */
    function init() {
        const container = document.getElementById('security-playground-root');
        if (!container) return;

        // 1. Tab Switching Logic
        const tabBtns = container.querySelectorAll('.playground-tab-btn');
        const tabPanels = container.querySelectorAll('.playground-tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const activePanel = container.querySelector(`#tab-${target}`);
                if (activePanel) activePanel.classList.add('active');
            });
        });

        // 2. Hash Engine Bindings
        const hashInput = container.querySelector('#hash-input');
        const sha256Output = container.querySelector('#hash-sha256');
        const sha512Output = container.querySelector('#hash-sha512');

        if (hashInput) {
            const updateHashes = async () => {
                const text = hashInput.value;
                if (!text) {
                    if (sha256Output) sha256Output.value = '';
                    if (sha512Output) sha512Output.value = '';
                    return;
                }
                if (sha256Output) sha256Output.value = await computeHash('SHA-256', text);
                if (sha512Output) sha512Output.value = await computeHash('SHA-512', text);
            };

            hashInput.addEventListener('input', updateHashes);
        }

        // 3. Password Entropy Bindings
        const pwdInput = container.querySelector('#pwd-entropy-input');
        const entropyBitsEl = container.querySelector('#entropy-bits-val');
        const crackTimeEl = container.querySelector('#entropy-crack-val');
        const entropyBar = container.querySelector('#entropy-meter-fill');
        const checkLen = container.querySelector('#chk-len');
        const checkUpper = container.querySelector('#chk-upper');
        const checkLower = container.querySelector('#chk-lower');
        const checkNum = container.querySelector('#chk-num');
        const checkSym = container.querySelector('#chk-sym');

        if (pwdInput) {
            pwdInput.addEventListener('input', () => {
                const lang = (typeof LanguageManager !== 'undefined') ? LanguageManager.getCurrentLang() : 'tr';
                const res = analyzePassword(pwdInput.value);

                if (entropyBitsEl) entropyBitsEl.textContent = `${res.entropy} bits`;
                if (crackTimeEl) crackTimeEl.textContent = lang === 'tr' ? res.crackTimeTr : res.crackTime;

                if (entropyBar) {
                    entropyBar.style.width = `${res.score}%`;
                    entropyBar.className = `entropy-bar-fill level-${res.level}`;
                }

                if (checkLen) checkLen.classList.toggle('passed', res.checks.length);
                if (checkUpper) checkUpper.classList.toggle('passed', res.checks.upper);
                if (checkLower) checkLower.classList.toggle('passed', res.checks.lower);
                if (checkNum) checkNum.classList.toggle('passed', res.checks.number);
                if (checkSym) checkSym.classList.toggle('passed', res.checks.symbol);
            });
        }

        // 4. AES-256 Cipher Bindings
        const aesPlainInput = container.querySelector('#aes-plain-input');
        const aesKeyInput = container.querySelector('#aes-key-input');
        const aesEncryptBtn = container.querySelector('#aes-encrypt-btn');
        const aesCipherOutput = container.querySelector('#aes-cipher-output');

        const aesCipherInput = container.querySelector('#aes-cipher-input');
        const aesDecryptKeyInput = container.querySelector('#aes-decrypt-key-input');
        const aesDecryptBtn = container.querySelector('#aes-decrypt-btn');
        const aesPlainOutput = container.querySelector('#aes-plain-output');

        if (aesEncryptBtn && aesPlainInput && aesKeyInput && aesCipherOutput) {
            aesEncryptBtn.addEventListener('click', async () => {
                const text = aesPlainInput.value;
                const key = aesKeyInput.value;
                if (!text || !key) return;
                aesCipherOutput.value = await encryptAES(text, key);
            });
        }

        if (aesDecryptBtn && aesCipherInput && aesDecryptKeyInput && aesPlainOutput) {
            aesDecryptBtn.addEventListener('click', async () => {
                const cipher = aesCipherInput.value;
                const key = aesDecryptKeyInput.value;
                if (!cipher || !key) return;
                aesPlainOutput.value = await decryptAES(cipher, key);
            });
        }

        // 5. CIDR Subnet Calculator Bindings
        const cidrInput = container.querySelector('#cidr-input');
        const cidrCalcBtn = container.querySelector('#cidr-calc-btn');
        const cidrNetEl = container.querySelector('#cidr-net-val');
        const cidrMaskEl = container.querySelector('#cidr-mask-val');
        const cidrRangeEl = container.querySelector('#cidr-range-val');
        const cidrHostsEl = container.querySelector('#cidr-hosts-val');

        const runCidrCalc = () => {
            if (!cidrInput) return;
            const res = calculateSubnet(cidrInput.value);
            if (res) {
                if (cidrNetEl) cidrNetEl.textContent = res.network;
                if (cidrMaskEl) cidrMaskEl.textContent = res.netmask;
                if (cidrRangeEl) cidrRangeEl.textContent = `${res.firstHost} — ${res.lastHost}`;
                if (cidrHostsEl) cidrHostsEl.textContent = `${res.usableHosts} IP (${res.totalHosts} total)`;
            } else {
                if (cidrNetEl) cidrNetEl.textContent = 'Invalid CIDR format';
                if (cidrMaskEl) cidrMaskEl.textContent = '-';
                if (cidrRangeEl) cidrRangeEl.textContent = '-';
                if (cidrHostsEl) cidrHostsEl.textContent = '-';
            }
        };

        if (cidrCalcBtn) cidrCalcBtn.addEventListener('click', runCidrCalc);
        if (cidrInput) {
            cidrInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') runCidrCalc();
            });
        }

        // 6. Generic Copy Buttons
        container.querySelectorAll('.playground-copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-copy-target');
                const targetEl = container.querySelector(`#${targetId}`);
                if (targetEl) copyToClipboard(targetEl.value || targetEl.textContent, btn);
            });
        });
    }

    return {
        init,
        computeHash,
        analyzePassword,
        encryptAES,
        decryptAES,
        calculateSubnet
    };
})();
