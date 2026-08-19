/* ============================================
   LANGUAGE SYSTEM
   language.js — TR/EN Localization with Smooth Text Swap Animation
   ============================================ */

const LanguageManager = (() => {
    'use strict';

    const STORAGE_KEY = 'ya-lang';
    const DEFAULT_LANG = 'en';

    /**
     * Full translation dictionary
     */
    const translations = {
        en: {
            /* Navbar */
            navHome: 'Home',
            navAbout: 'About',
            navWorks: 'Works',
            navBlog: 'Blog',
            navContact: 'Contact',

            /* Hero */
            heroStatusText: 'Open for Architecture & Security Projects',
            heroSubtitle: 'Senior Software Engineer & Cybersecurity Specialist',
            heroDescription: 'Building high-performance software, secure architectures, and modern digital platforms.',
            heroStat1: '10+ Production Systems',
            heroStat2: 'Proactive Cyber Defense',
            heroStat3: 'Ultra-Fast Vanilla Stack',
            heroBtnWork: 'View My Work',
            heroBtnAbout: 'About Me',

            /* GitHub Telemetry */
            githubLabel: 'Telemetry & Activity',
            githubTitle: 'Live GitHub Activity',
            githubDescription: 'Real-time commit telemetry, public repositories, and contribution activity.',
            githubRepos: 'Public Repos',
            githubCommits: 'Yearly Commits',
            githubFollowers: 'Followers',
            githubLiveStatus: 'Security Verified',
            githubRecentCommits: 'Latest Engineering Commits',
            githubHeatmapTitle: 'Total Year Contributions',
            githubLess: 'Less',
            githubMore: 'More',

            /* About Preview */
            aboutPreviewLabel: 'About',
            aboutPreviewTitle: 'Building systems. Solving problems. Engineering security.',
            aboutPreviewText: 'Senior Software Engineer & Cybersecurity Specialist delivering robust applications, proactive defense systems, and modern digital platforms.',
            aboutPreviewBtn: 'Read More →',

            /* Tech Stack */
            techLabel: 'Tech Stack',
            techTitle: 'Technologies & Architecture',
            techDescription: 'Core technologies and frameworks powering production systems.',
            techProgramming: 'Programming',
            techWeb: 'Web & Systems',
            techSecurity: 'Security & Infrastructure',
            techTools: 'Tools & Ecosystem',

            /* Featured Projects */
            featuredLabel: 'Projects',
            featuredTitle: 'Featured Engineering Work',
            featuredDescription: 'Selected production systems in software engineering, cybersecurity, and AI.',
            viewAllProjects: 'View All Projects →',

            /* Blog Preview */
            blogPreviewLabel: 'Blog',
            blogPreviewTitle: 'Technical Insights',
            blogPreviewDescription: 'Articles on software engineering, threat modeling, and modern systems.',
            viewAllPosts: 'View All Posts →',

            /* CTA */
            ctaTitle: 'Have an ambitious project in mind?',
            ctaDescription: 'Whether it is high-scale software engineering, security assessment, or system architecture — let\'s talk.',
            ctaBtn: 'Get In Touch',

            /* Footer */
            footerNavigation: 'Navigation',
            footerConnect: 'Connect',
            footerRights: 'All rights reserved.',
            footerBuiltWith: 'Crafted with Pure HTML, CSS & Vanilla JavaScript.',

            /* About Page */
            aboutPageLabel: 'About',
            aboutPageTitle: 'About Me',
            aboutPageDescription: 'Senior Software Engineer & Cybersecurity Specialist based in İstanbul.',
            aboutWhoTitle: 'Who I Am',
            aboutWhoText1: 'I\'m Yusuf Ali Aşkın — a Senior Software Engineer and Cybersecurity Specialist with expertise in building mission-critical software, secure distributed systems, and modern cloud architectures.',
            aboutWhoText2: 'My engineering practice combines robust software development principles with proactive cybersecurity controls, delivering systems that are scalable, maintainable, and fortified against modern threat vectors.',
            aboutJourneyLabel: 'Journey',
            aboutJourneyTitle: 'My Journey',
            journeyItem1Title: 'Started exploring technology',
            journeyItem1Text: 'First encounters with computers, curiosity about how systems work, early experiments with hardware and software.',
            journeyItem2Title: 'Started software development',
            journeyItem2Text: 'Began learning programming languages, building small projects, and understanding software architecture.',
            journeyItem3Title: 'Focused on cybersecurity',
            journeyItem3Text: 'Deep dive into network security, SIEM systems, penetration testing concepts, and security infrastructure.',
            journeyItem4Title: 'Built real-world projects',
            journeyItem4Text: 'Developed full applications — disaster communication platforms, AI dashboards, network analysis tools, and more.',
            journeyItem5Title: 'Exploring AI and modern systems',
            journeyItem5Text: 'Working with AI APIs, building intelligent tools, and exploring the intersection of security and artificial intelligence.',

            aboutExpertiseLabel: 'Expertise',
            aboutExpertiseTitle: 'What I Focus On',
            expertiseDev: 'Software Development',
            expertiseDevText: 'Modern web applications, backend systems, and full-stack development with Python, JavaScript, and modern frameworks.',
            expertiseSecurity: 'Cybersecurity',
            expertiseSecurityText: 'Network security, SIEM systems, security monitoring, firewall configuration, and infrastructure protection.',
            expertiseNetwork: 'Networking',
            expertiseNetworkText: 'Network architecture, VPN systems, firewall management, traffic analysis, and infrastructure design.',
            expertiseAuto: 'Automation',
            expertiseAutoText: 'Building automation systems with Python and JavaScript to streamline workflows and eliminate repetitive tasks.',
            expertiseAI: 'AI & Intelligence',
            expertiseAIText: 'AI-powered applications, intelligent assistants, and leveraging AI APIs to build smarter tools.',
            expertiseCloud: 'Cloud & Infrastructure',
            expertiseCloudText: 'Linux servers, Docker containers, Cloudflare security, and scalable deployment pipelines.',
            projectDetailsBtn: 'Details →',

            aboutPhilosophyLabel: 'Philosophy',
            aboutPhilosophyTitle: 'I don\'t just learn technologies. I build with them.',
            aboutPhilosophyText: 'Instead of just learning new technologies, I focus on using them in real projects, solving problems, and constantly improving myself. Every tool I learn becomes a part of something I build.',

            aboutCurrentLabel: 'Current Focus',
            aboutCurrentTitle: 'What I\'m Working On',
            aboutCurrentText: 'Currently focused on developing AI-powered tools, strengthening cybersecurity knowledge, and building systems that combine security with modern software development practices.',

            /* Works Page */
            worksPageLabel: 'Portfolio & Systems',
            worksStatusBuilds: 'Active Production Builds',
            worksPageTitle: 'Architected Systems',
            worksPageDescription: 'High-throughput software architectures, cybersecurity inspection engines, AI systems, and networking utilities.',
            worksStatSystems: 'Production Systems',
            worksStatSystemsSub: 'Architecture & Live Builds',
            worksStatDomains: 'Engineering Domains',
            worksStatDomainsSub: 'Web, AI, Sec, Net & Tools',
            worksStatPerform: 'Vanilla & Optimized',
            worksStatPerformSub: 'Pure Code & Maximum Speed',
            projectSearchPlaceholder: 'Search systems by name, keyword, or tech stack (e.g. Python, AI, Nmap)...',
            filterAll: 'All',
            filterWeb: 'Web',
            filterAI: 'AI',
            filterCybersecurity: 'Cybersecurity',
            filterNetworking: 'Networking',
            filterDesktop: 'Desktop',
            filterTools: 'Tools',

            /* Blog Page */
            blogPageLabel: 'Technical Notes',
            blogPageTitle: 'Engineering Articles & Blueprints',
            blogPageDescription: 'In-depth architectural guides, security deep dives, and production software insights.',
            blogAllCategories: 'All Topics',
            blogFilterAll: 'All',
            blogFilterSecurity: 'Cybersecurity',
            blogFilterDev: 'Programming',
            blogFilterLinux: 'Linux',
            blogFilterAI: 'AI',
            blogFilterNetwork: 'Networking',
            blogFilterWeb: 'Web Development',
            blogSearchPlaceholder: 'Search articles by topic, keyword, or language (e.g. SIEM, Linux, Python)...',

            /* Blog Post */
            blogBackBtn: 'Back to Articles',
            blogMoreTopics: 'More from the Engineering Desk',
            blogRelatedTitle: 'Related Articles',
            blogReadMore: 'Read Article →',
            blogMinRead: 'min read',
            blogDemoNotice: 'Production engineering article by Yusuf Ali Aşkın.',

            /* Contact Page */
            contactPageLabel: 'Contact',
            contactPageTitle: 'Let\'s build something useful.',
            contactPageDescription: 'Have a project, idea or opportunity? Feel free to get in touch.',
            contactEmail: 'Email',
            contactLocation: 'Location',
            contactLocationValue: 'İstanbul, Turkey',
            contactFormName: 'Name',
            contactFormNamePlaceholder: 'Your name',
            contactFormEmail: 'Email',
            contactFormEmailPlaceholder: 'your@email.com',
            contactFormSubject: 'Subject',
            contactFormSubjectPlaceholder: 'What is this about?',
            contactFormMessage: 'Message',
            contactFormMessagePlaceholder: 'Tell me about your project or idea...',
            contactFormSend: 'Send Message',
            contactFormNameError: 'Please enter your name.',
            contactFormEmailError: 'Please enter a valid email address.',
            contactFormMessageError: 'Please enter your message.',
            contactFormNoBackend: 'Form backend is not configured. Please reach out via email or social media.',
            contactCopyEmail: 'Copy email',
            contactCopied: 'Copied!',

            /* Modal */
            modalProblem: 'Problem',
            modalSolution: 'Solution',
            modalFeatures: 'Features',
            modalTechnologies: 'Technologies',
            modalGithub: 'GitHub',
            modalDemo: 'Live Demo',
            modalClose: 'Close',

            /* GitHub Telemetry */
            githubSectionLabel: 'Live Telemetry',
            githubSectionTitle: 'GitHub Engineering Activity',
            githubSectionSubtitle: 'Real-time contribution frequency, repositories, and recent production commits.',
            githubHeatmapTitle: 'Contribution Activity Graph',
            githubContributions: 'Contributions',
            githubLess: 'Less',
            githubMore: 'More',
            githubRepos: 'Public Repos',
            githubCommits: 'Yearly Commits',
            githubFollowers: 'Followers',
            githubLiveStatus: 'Security Verified',
            githubRecentCommits: 'Latest Engineering Commits',

            /* Security Playground */
            playgroundSectionLabel: 'Interactive Suite',
            playgroundSectionTitle: 'Cybersecurity & Cryptography Lab',
            playgroundSectionSubtitle: 'Client-side cryptographic hashing, password entropy modeling, AES cipher, and subnet calculator.',
            playgroundTabHash: 'Cryptographic Hashing',
            playgroundTabEntropy: 'Password Entropy',
            playgroundTabAES: 'AES-256-GCM Cipher',
            playgroundTabCIDR: 'CIDR Subnet Calculator',
            playgroundHashInputLabel: 'Input Payload / String',
            playgroundHashInputPlaceholder: 'Type or paste raw string to hash in real-time...',
            playgroundEntropyInputLabel: 'Enter Test Password',
            playgroundEntropyInputPlaceholder: 'Type a password to evaluate Shannon entropy...',
            playgroundEntropyBits: 'Entropy Rating',
            playgroundCrackTime: 'Est. Brute-Force Time (GPU Cluster)',
            playgroundAESPlainLabel: 'Plaintext Message',
            playgroundAESPlainPlaceholder: 'Enter secret text to encrypt...',
            playgroundAESKeyLabel: 'Passphrase / Encryption Key',
            playgroundAESKeyPlaceholder: 'Secret master key...',
            playgroundAESEncryptBtn: 'Encrypt Message',
            playgroundAESCipherLabel: 'Base64 Encrypted Ciphertext',
            playgroundAESDecryptBtn: 'Decrypt Message',
            playgroundAESDecryptedLabel: 'Decrypted Result',
            playgroundCIDRInputLabel: 'IPv4 Address with CIDR Prefix',
            playgroundCIDRInputPlaceholder: 'e.g. 192.168.1.0/24 or 10.0.0.0/16',
            playgroundCIDRCalculateBtn: 'Calculate Subnet',
            playgroundNetworkAddress: 'Network Address',
            playgroundSubnetMask: 'Subnet Mask',
            playgroundHostRange: 'Usable Host Range',
            playgroundUsableHosts: 'Total Usable Hosts',

            /* Work Detail Page */
            workBackBtn: 'Back to Works',
            workProblemLabel: 'Problem & Challenge',
            workSolutionLabel: 'Engineered Solution & Architecture',
            workFeaturesLabel: 'Key Capabilities & Features',
            workTechStackLabel: 'Technologies & Frameworks',
            workLinksLabel: 'Project Links',
            workSourceCode: 'View Source Code',
            workLiveDemo: 'Launch Live Demo',
            workRelatedTitle: 'Related Engineering Works',
            workRelatedSubtitle: 'Explore more systems and security architectures',
            workNotFoundTitle: 'Project Not Found',
            workNotFoundDesc: 'The system or project you are looking for does not exist or has been relocated.',

            /* Certificates Page & Detail */
            navCertificates: 'Certificates',
            certPageLabel: 'Certificates',
            certPageTitle: 'Certifications & Credentials',
            certPageDesc: 'Industry-verified certifications across AI, cybersecurity, cloud infrastructure, and software engineering.',
            certFilterAll: 'All Credentials',
            certFilterAI: 'AI & LLM',
            certFilterSecurity: 'Cybersecurity',
            certFilterNetwork: 'Networking',
            certFilterCloud: 'Cloud & DevOps',
            certFilterSoftware: 'Software Dev',
            certVerifiedBadge: 'Verified Credential',
            certViewBadge: 'View & Verify',
            certModalClose: 'Close',
            certBackBtn: 'Back to Certificates',
            certVerifyOfficial: 'Verify on Official Portal',
            certBackCatalog: 'Browse All Certifications',
            certSpecsTitle: 'Credential Specification',
            certIssuerLabel: 'Issuing Organization',
            certCategoryLabel: 'Technical Domain',
            certDateLabel: 'Issued Date',
            certLevelLabel: 'Proficiency Level',
            certStatusLabel: 'Verification Status',
            certSkillsTitle: 'Acquired Competencies & Technologies',
            certRelatedLabel: 'Related Credentials',
            certRelatedTitle: 'More Certifications from this Track',

            /* Work Experience (About Page) */
            aboutExpLabel: 'Experience',
            aboutExpTitle: 'Work & Career Experience',
            aboutExpSubtitle: 'Professional positions, corporate roles, and engineering contributions',
            btnOpenCV: 'View Interactive CV / Resume',
            expPresent: 'Present',
            expContract: 'Contract',
            expFullTime: 'Full-time',
            expSelfEmployed: 'Startup',
            expOnsite: 'On-site',
            expRemote: 'Remote',
            expRole1: 'Software & Systems Intern',
            expDate1: 'Aug 2026 - Present',
            expLoc1: '📍 Ataşehir, İstanbul • On-site',
            expDesc1: 'Active engineering and IT operations support within enterprise core banking systems, financial software deployments, and infrastructure management.',
            expRole2: 'Lead Software Engineer',
            expDate2: 'Aug 2025 - Present • 1 yr 1 mo',
            expLoc2: '📍 İstanbul, Turkey • Remote',
            expDesc2: 'Architecting a multi-LLM unified aggregation platform featuring dynamic model routing, transparent latency/cost benchmarking, and secure data processing.',
            expRole3: 'IT Specialist',
            expDate3: 'Aug 2024 - Feb 2025 • 7 mos',
            expLoc3: '📍 Beşiktaş, İstanbul • On-site',
            expDesc3: 'Managed enterprise retail tech infrastructure, diagnostic hardware/software troubleshooting, local network administration, and level-2 technical escalation.',
            expRole4: 'Cybersecurity Intern',
            expDate4: 'Sep 2023 - Jul 2024 • 11 mos',
            expLoc4: '📍 Ataşehir, İstanbul • On-site',
            expDesc4: 'Cisco routing & switching administration, FortiGate firewall configuration, Fortinet ecosystem management, and QNAP enterprise network storage operations.',
            footerExpertise: 'Expertise',
            expertiseSoftware: 'Software Engineering',
            expertiseSecurity: 'Cyber Security',
            expertiseCloud: 'Cloud & Infrastructure',
            expertiseAI: 'AI & Machine Learning',

            /* Education (About Page) */
            aboutEduLabel: 'Education',
            aboutEduTitle: 'Education & Academic Track',
            aboutEduSubtitle: 'University degree, specialized technical high school, and student communities',
            eduUniRole: 'Associate Degree • Information Security Technologies',
            eduUniSchool: 'Zonguldak Bülent Ecevit University',
            eduUniDate: 'Sep 2025 – Jul 2027',
            eduUniBadge: 'Active Student',
            eduUniLoc: '📍 Zonguldak, Turkey',
            eduUniDesc: 'First-year student at Zonguldak Bülent Ecevit University, receiving specialized training and developing projects in cybersecurity, network defense, and system architectures.',
            eduHighSchoolRole: 'High School • Cyber Security and Network Security',
            eduHighSchoolSchool: 'Halil Rıfat Paşa Vocational & Technical Anatolian High School',
            eduHighSchoolDate: 'Feb 2019 – Feb 2023',
            eduHighSchoolBadge: 'Graduated',
            eduHighSchoolLoc: '📍 Şişli, İstanbul',
            eduHighSchoolDesc: 'Extensive specialization in network security, server deployment, and virtualization. Hands-on expertise with Cisco Packet Tracer network simulations, physical/virtual server configurations, Active Directory, Linux, and scripting.',
            cvSectionEdu: 'Education & Academic Background',
            cvSectionExp: 'Work & Professional Experience',
            cvSectionCerts: 'Verified Industry Credentials',
            cvSectionSkills: 'Core Technical Competencies',
            cvDownloadBtn: 'Print / Save as PDF',

            /* Architecture Flow (Feature 2) */
            archFlowTitle: 'Interactive System Architecture Flow',
            archFlowSubtitle: 'End-to-end data pipeline, security perimeter, and execution graph',
            archClientTitle: 'Client / UI Layer',
            archClientDesc: 'Vanilla JS, Responsive UI',
            archGatewayTitle: 'API Gateway & Auth',
            archGatewayDesc: 'Rate Limit & Token Auth',
            archCoreTitle: 'Core Processing & AI',
            archCoreDesc: 'Multi-LLM & Threat Engine',
            archDbTitle: 'Database & SIEM',
            archDbDesc: 'Encrypted Vault & Logs',

            /* Interactive CV Modal (Feature 4) */
            cvModalTitle: 'Curriculum Vitae — Yusuf Ali Aşkın',
            cvDownloadBtn: 'Download PDF',
            cvCloseBtn: 'Close',
            cvSectionSummary: 'Professional Summary',
            cvSectionExp: 'Work Experience',
            cvSectionSkills: 'Core Technical Skills',
            cvSectionCert: 'Featured Certifications',

            /* Contact Page */
            contactPageLabel: 'Contact',
            contactPageTitle: 'Let\'s build something useful.',
            contactPageDescription: 'Have a project, idea or opportunity? Feel free to get in touch.',
            contactEmail: 'Email',
            contactLocation: 'Location',
            contactLocationValue: 'İstanbul, Turkey',
            contactFormName: 'Name',
            contactFormNamePlaceholder: 'Your name',
            contactFormNameError: 'Please enter your name.',
            contactFormEmail: 'Email',
            contactFormEmailPlaceholder: 'your@email.com',
            contactFormEmailError: 'Please enter a valid email address.',
            contactFormSubject: 'Subject',
            contactFormSubjectPlaceholder: 'What is this about?',
            contactFormMessage: 'Message',
            contactFormMessagePlaceholder: 'Tell me about your project or idea...',
            contactFormMessageError: 'Please enter your message.',
            contactFormSend: 'Send Message',
            contactCopied: 'Email copied to clipboard!',

            /* Misc */
            scrollToTop: 'Scroll to top',
        },

        tr: {
            /* Navbar */
            navHome: 'Ana Sayfa',
            navAbout: 'Hakkımda',
            navWorks: 'Projeler',
            navCertificates: 'Sertifikalar',
            navBlog: 'Blog',
            navContact: 'İletişim',

            /* Hero */
            heroStatusText: 'Mühendislik & Güvenlik Projelerine Açık',
            heroSubtitle: 'Kıdemli Yazılım Mühendisi & Siber Güvenlik Uzmanı',
            heroDescription: 'Güvenli, yüksek performanslı yazılımlar ve modern sistem mimarileri geliştiriyorum.',
            heroStat1: '10+ Üretim Sistemi',
            heroStat2: 'Proaktif Siber Savunma',
            heroStat3: 'Ultra Hızlı Saf Mimari',
            heroBtnWork: 'Projelerimi Gör',
            heroBtnAbout: 'Hakkımda',

            /* GitHub Telemetry */
            githubLabel: 'Telemetri & Canlı Aktivite',
            githubTitle: 'Canlı GitHub Aktiviteleri',
            githubDescription: 'Gerçek zamanlı commit telemetrisi, açık kaynak repoları ve katkı akışı.',
            githubRepos: 'Açık Kaynak Repo',
            githubCommits: 'Yıllık Katkı',
            githubFollowers: 'Takipçi',
            githubLiveStatus: 'Sıfır Tehdit / Doğrulandı',
            githubRecentCommits: 'Son Mühendislik Commitleri',
            githubHeatmapTitle: 'Yıllık Toplam Katkı',
            githubLess: 'Az',
            githubMore: 'Çok',

            /* About Preview */
            aboutPreviewLabel: 'Hakkımda',
            aboutPreviewTitle: 'Sistemler kuruyorum. Problemleri çözüyorum. Güvenliği inşa ediyorum.',
            aboutPreviewText: 'Güvenilir uygulamalar, proaktif savunma sistemleri ve modern dijital platformlar inşa eden Kıdemli Yazılım Mühendisi ve Siber Güvenlik Uzmanı.',
            aboutPreviewBtn: 'Devamını Oku →',

            /* Tech Stack */
            techLabel: 'Teknolojiler',
            techTitle: 'Teknolojiler & Mimari',
            techDescription: 'Üretim sistemlerimde düzenli olarak kullandığım temel mimariler ve araçlar.',
            techProgramming: 'Programlama',
            techWeb: 'Web & Sistemler',
            techSecurity: 'Güvenlik & Altyapı',
            techTools: 'Araçlar & Ekosistem',

            /* Featured Projects */
            featuredLabel: 'Projeler',
            featuredTitle: 'Öne Çıkan Mühendislik Çalışmaları',
            featuredDescription: 'Yazılım mühendisliği, siber güvenlik ve yapay zeka alanlarından seçilmiş üretim sistemleri.',
            viewAllProjects: 'Tüm Projeleri Gör →',

            /* Blog Preview */
            blogPreviewLabel: 'Blog',
            blogPreviewTitle: 'Teknik Yazılar',
            blogPreviewDescription: 'Yazılım mühendisliği, tehdit modelleme ve modern mimariler üzerine makaleler.',
            viewAllPosts: 'Tüm Yazıları Gör →',

            /* CTA */
            ctaTitle: 'Büyük ölçekli bir projen mi var?',
            ctaDescription: 'İster yüksek ölçekli yazılım mühendisliği, ister güvenlik analizi veya sistem mimarisi olsun — konuşalım.',
            ctaBtn: 'İletişime Geç',

            /* Footer */
            footerNavigation: 'Navigasyon',
            footerConnect: 'Bağlantılar',
            footerRights: 'Tüm hakları saklıdır.',
            footerBuiltWith: 'Saf HTML, CSS & Vanilla JavaScript ile geliştirildi.',

            /* About Page */
            aboutPageLabel: 'Hakkımda',
            aboutPageTitle: 'Hakkımda',
            aboutPageDescription: 'İstanbul merkezli Kıdemli Yazılım Mühendisi & Siber Güvenlik Uzmanı.',
            aboutWhoTitle: 'Kimim?',
            aboutWhoText1: 'Ben Yusuf Ali Aşkın — kritik yazılımlar, güvenli dağıtık sistemler ve modern bulut mimarileri geliştirme konusunda deneyimli Kıdemli Yazılım Mühendisi ve Siber Güvenlik Uzmanıyım.',
            aboutWhoText2: 'Mühendislik yaklaşımım, sağlam yazılım geliştirme prensiplerini proaktif siber güvenlik kontrolleriyle birleştirerek modern tehditlere karşı korunan ve ölçeklenebilir sistemler üretmeye dayanır.',
            aboutJourneyLabel: 'Yolculuk',
            aboutJourneyTitle: 'Gelişim Yolculuğum',
            journeyItem1Title: 'Teknolojiyle İlk Temas',
            journeyItem1Text: 'Bilgisayarlarla ilk tanışma, sistemlerin çalışma mantığına merak, donanım ve yazılımla erken deneyler.',
            journeyItem2Title: 'Yazılım Geliştirmeye Başlangıç',
            journeyItem2Text: 'Programlama dillerini öğrenme, küçük projeler geliştirme ve yazılım mimarisini anlama süreci.',
            journeyItem3Title: 'Siber Güvenliğe Odaklanma',
            journeyItem3Text: 'Ağ güvenliği, SIEM sistemleri, sızma testi kavramları ve güvenlik altyapılarına derinlemesine odaklanma.',
            journeyItem4Title: 'Gerçek Dünya Projeleri',
            journeyItem4Text: 'Tam teşekküllü uygulamalar — afet iletişim platformları, yapay zeka panelleri, ağ analiz araçları ve dahası.',
            journeyItem5Title: 'Yapay Zeka ve Modern Sistemler',
            journeyItem5Text: 'Yapay zeka API\'leri ile çalışma, akıllı araçlar geliştirme ve güvenlik ile yapay zekanın kesişimini keşfetme.',

            aboutExpertiseLabel: 'Uzmanlık',
            aboutExpertiseTitle: 'Odaklandığım Alanlar',
            expertiseDev: 'Yazılım Geliştirme',
            expertiseDevText: 'Modern web uygulamaları, arka uç sistemleri ve Python, JavaScript ile tam yığın geliştirme.',
            expertiseSecurity: 'Siber Güvenlik',
            expertiseSecurityText: 'Ağ güvenliği, SIEM sistemleri, güvenlik izleme, güvenlik duvarı yapılandırması ve altyapı koruması.',
            expertiseNetwork: 'Ağ Sistemleri',
            expertiseNetworkText: 'Ağ mimarisi, VPN sistemleri, güvenlik duvarı yönetimi, trafik analizi ve altyapı tasarımı.',
            expertiseAuto: 'Otomasyon',
            expertiseAutoText: 'Süreç otomasyonu, script geliştirme, sistem optimizasyonu ve tekrarlayan görevleri otomatikleştirme.',

            /* Works Page */
            worksPageLabel: 'Mühendislik & Sistemler',
            worksStatusBuilds: 'Aktif Üretim Mimarisi',
            worksPageTitle: 'Geliştirilen Sistemler & Mühendislik Projeleri',
            worksPageDescription: 'Yüksek performanslı yazılım mimarileri, siber güvenlik denetim motorları ve yapay zeka platformları.',
            worksStatSystems: 'Üretim Sistemleri',
            worksStatSystemsSub: 'Mimari & Canlı Sistemler',
            worksStatDomains: 'Mühendislik Disiplini',
            worksStatDomainsSub: 'Web, Yapay Zeka, Güvenlik & Ağ',
            worksStatPerform: 'Vanilla & Optimize',
            worksStatPerformSub: 'Saf Kod & Maksimum Hız',
            filterAll: 'Tümü',
            filterDev: 'Yazılım',
            filterSecurity: 'Siber Güvenlik',
            filterNetwork: 'Ağ Sistemleri',
            filterAI: 'Yapay Zeka',
            filterAutomation: 'Otomasyon',
            projectSearchPlaceholder: 'Projelerde ara (başlık, teknoloji, açıklama)...',

            /* Modal */
            modalProblem: 'Problem',
            modalSolution: 'Çözüm',
            modalFeatures: 'Özellikler',
            modalTechnologies: 'Teknolojiler',
            modalDemo: 'Canlı Önizleme',

            /* Blog Page */
            blogPageLabel: 'Blog',
            blogPageTitle: 'Teknik Yazılar & İncelemeler',
            blogPageDescription: 'Siber güvenlik, yazılım mimarisi, ağ sistemleri ve teknoloji üzerine derinlemesine analizler.',
            blogFilterAll: 'Tümü',
            blogFilterSecurity: 'Siber Güvenlik',
            blogFilterDev: 'Programlama',
            blogFilterLinux: 'Linux',
            blogFilterAI: 'Yapay Zeka',
            blogFilterNetwork: 'Ağ Sistemleri',
            blogFilterWeb: 'Web Geliştirme',
            blogSearchPlaceholder: 'Makalelerde ara (başlık, özet, etiket)...',
            readPost: 'Yazıyı Oku →',

            /* Contact Page */
            contactPageLabel: 'İletişim',
            contactPageTitle: 'Birlikte değer üretelim.',
            contactPageDescription: 'Bir projeniz, fikriniz veya iş birliği fırsatınız mı var? İletişime geçmekten çekinmeyin.',
            contactEmail: 'E-posta',
            contactLocation: 'Konum',
            contactLocationValue: 'İstanbul, Türkiye',
            contactFormName: 'Adınız Soyadınız',
            contactFormNamePlaceholder: 'Adınızı girin...',
            contactFormEmail: 'E-posta Adresiniz',
            contactFormEmailPlaceholder: 'ornek@alanadi.com',
            contactFormSubject: 'Konu',
            contactFormSubjectPlaceholder: 'Mesajınızın konusu...',
            contactFormMessage: 'Mesajınız',
            contactFormMessagePlaceholder: 'Projeniz veya fikriniz hakkında bilgi verin...',
            contactFormSend: 'Mesajı Gönder',
            contactFormNameError: 'Lütfen adınızı girin.',
            contactFormEmailError: 'Lütfen geçerli bir e-posta adresi girin.',
            contactFormMessageError: 'Lütfen mesajınızı yazın.',
            contactFormNoBackend: 'İletişim formu şu an demo modundadır. Lütfen doğrudan e-posta veya sosyal medya üzerinden iletişime geçin.',
            contactCopyEmail: 'E-postayı kopyala',
            contactCopied: 'Kopyalandı!',

            /* Interactive Security Playground */
            playgroundSectionLabel: 'İnteraktif Laboratuvar',
            playgroundSectionTitle: 'Siber Güvenlik ve Ağ Simülatörü',
            playgroundSectionSubtitle: 'İstemci tarafı kriptografik özetleme, parola entropisi modelleme, AES şifreleme ve CIDR alt ağ hesaplayıcı.',
            playgroundTabHash: 'Kriptografik Özetleme',
            playgroundTabEntropy: 'Parola Entropisi',
            playgroundTabAES: 'AES-256-GCM Şifreleme',
            playgroundTabCIDR: 'CIDR Alt Ağ Hesaplayıcı',
            playgroundHashInputLabel: 'Girdi Metni / Veri',
            playgroundHashInputPlaceholder: 'Gerçek zamanlı özet üretmek için metin yazın...',
            playgroundEntropyInputLabel: 'Test Parolası Girin',
            playgroundEntropyInputPlaceholder: 'Shannon entropisini ölçmek için parola yazın...',
            playgroundEntropyBits: 'Entropi Skoru',
            playgroundCrackTime: 'Tahmini Kırılma Süresi (GPU Kümesi)',
            playgroundAESPlainLabel: 'Düz Metin Mesajı',
            playgroundAESPlainPlaceholder: 'Şifrelenecek metni yazın...',
            playgroundAESKeyLabel: 'Anahtar Parola',
            playgroundAESKeyPlaceholder: 'Gizli anahtar parola...',
            playgroundAESEncryptBtn: 'Mesajı Şifrele',
            playgroundAESCipherLabel: 'Base64 Şifrelenmiş Çıktı',
            playgroundAESDecryptBtn: 'Şifreyi Çöz',
            playgroundAESDecryptedLabel: 'Çözülmüş Düz Metin',
            playgroundCIDRInputLabel: 'CIDR Notasyonu ile IPv4 Adresi',
            playgroundCIDRInputPlaceholder: 'ör. 192.168.1.0/24 veya 10.0.0.0/16',
            playgroundCIDRCalculateBtn: 'Alt Ağı Hesapla',
            playgroundNetworkAddress: 'Ağ Adresi',
            playgroundSubnetMask: 'Alt Ağ Maskesi',
            playgroundHostRange: 'Kullanılabilir IP Aralığı',
            playgroundUsableHosts: 'Kullanılabilir IP Sayısı',

            /* Work Detail Page */
            workBackBtn: 'Tüm Çalışmalara Dön',
            workProblemLabel: 'Problem & Teknik Zorluk',
            workSolutionLabel: 'Geliştirilen Çözüm & Mimari',
            workFeaturesLabel: 'Öne Çıkan Yetenekler & Özellikler',
            workTechStackLabel: 'Kullanılan Teknolojiler & Araçlar',
            workLinksLabel: 'Proje Bağlantıları',
            workSourceCode: 'Kaynak Kodunu İncele',
            workLiveDemo: 'Canlı Önizlemeyi Aç',
            workRelatedTitle: 'İlgili Diğer Sistemler',
            workRelatedSubtitle: 'Diğer mühendislik ve siber güvenlik projelerini keşfedin',
            workNotFoundTitle: 'Proje Bulunamadı',
            workNotFoundDesc: 'Aradığınız sistem veya proje mevcut değil ya da taşınmış olabilir.',

            /* Certificates Page & Detail */
            certPageLabel: 'Sertifikalar',
            certPageTitle: 'Sertifikalar & Yetkinlikler',
            certPageDesc: 'Yapay zeka, siber güvenlik, bulut altyapısı ve yazılım mühendisliği alanlarında kazanılmış onaylı sertifikalar.',
            certFilterAll: 'Tüm Sertifikalar',
            certFilterAI: 'Yapay Zeka & LLM',
            certFilterSecurity: 'Siber Güvenlik',
            certFilterNetwork: 'Ağ Sistemleri',
            certFilterCloud: 'Bulut & DevOps',
            certFilterSoftware: 'Yazılım Geliştirme',
            certVerifiedBadge: 'Doğrulanmış Sertifika',
            certViewBadge: 'İncele & Doğrula',
            certModalClose: 'Kapat',
            certBackBtn: '← Sertifikalara Dön',
            certVerifyOfficial: 'Resmi Portalda Doğrula ↗',
            certBackCatalog: 'Tüm Sertifikaları İncele',
            certSpecsTitle: 'Sertifika Teknik Özellikleri',
            certIssuerLabel: 'Veren Kurum',
            certCategoryLabel: 'Teknik Alan',
            certDateLabel: 'Veriliş Tarihi',
            certLevelLabel: 'Yetkinlik Seviyesi',
            certStatusLabel: 'Doğrulama Durumu',
            certSkillsTitle: 'Kazanılan Yetkinlikler & Teknolojiler',
            certRelatedLabel: 'İlgili Sertifikalar',
            certRelatedTitle: 'Bu Alandaki Diğer Başarı Kayıtları',

            /* Work Experience (About Page) */
            aboutExpLabel: 'Deneyim',
            aboutExpTitle: 'Çalıştığım İş Yerleri & Deneyim',
            aboutExpSubtitle: 'Profesyonel rollerim, kurumsal katkılarım ve mühendislik deneyimlerim',
            btnOpenCV: 'İnteraktif CV / Özgeçmişi Gör',
            expPresent: 'Devam Ediyor',
            expContract: 'Sözleşmeli',
            expFullTime: 'Tam Zamanlı',
            expSelfEmployed: 'Girişim',
            expOnsite: 'Ofiste',
            expRemote: 'Uzaktan',
            expRole1: 'Yazılım & Sistem Mühendisliği Stajyeri',
            expDate1: 'Ağu 2026 - Devam ediyor',
            expLoc1: '📍 Ataşehir, İstanbul • Ofiste',
            expDesc1: 'Kurumsal bankacılık sistemleri, yazılım operasyonları ve finansal BT altyapı yönetim süreçlerinde aktif mühendislik ve sistem destek çalışmaları.',
            expRole2: 'Kurucu Yazılım Mühendisi',
            expDate2: 'Ağu 2025 - Devam ediyor • 1 yıl 1 ay',
            expLoc2: '📍 İstanbul, Türkiye • Uzaktan',
            expDesc2: 'Farklı büyük dil modellerini (Multi-LLM) tek bir platformda birleştirerek dinamik model yönlendirme, şeffaf kıyaslama (benchmarking) ve güvenli veri işleme mimarisinin geliştirilmesi.',
            expRole3: 'BT ve Sistem Uzmanı',
            expDate3: 'Ağu 2024 - Şub 2025 • 7 ay',
            expLoc3: '📍 Beşiktaş, İstanbul • Ofiste',
            expDesc3: 'Geniş ölçekli perakende teknoloji altyapısının kesintisiz işletilmesi, donanım ve yazılım arıza teşhisi, yerel ağ operasyonları ve teknik destek süreçleri.',
            expRole4: 'Siber Güvenlik & Ağ Stajyeri',
            expDate4: 'Eyl 2023 - Tem 2024 • 11 ay',
            expLoc4: '📍 Ataşehir, İstanbul • Ofiste',
            expDesc4: 'Cisco ağ cihazları yönetimi, FortiGate güvenlik duvarı ve Fortinet ekosistem yapılandırması, QNAP kurumsal veri depolama ve ağ güvenliği operasyonları.',
            footerExpertise: 'Uzmanlık Alanları',
            expertiseSoftware: 'Yazılım Mühendisliği',
            expertiseSecurity: 'Siber Güvenlik',
            expertiseCloud: 'Bulut & Altyapı',
            expertiseAI: 'Yapay Zeka & ML',

            /* Education (About Page) */
            aboutEduLabel: 'Eğitim',
            aboutEduTitle: 'Eğitim & Akademik Geçmiş',
            aboutEduSubtitle: 'Üniversite öğrenimim, teknik lise ihtisasım ve öğrenci toplulukları faaliyetlerim',
            eduUniRole: 'Önlisans • Bilgi Güvenliği Teknolojisi',
            eduUniSchool: 'Zonguldak Bülent Ecevit Üniversitesi',
            eduUniDate: 'Eyl 2025 – Tem 2027',
            eduUniBadge: 'Öğrenci • Aktif',
            eduUniLoc: '📍 Zonguldak, Türkiye',
            eduUniDesc: 'Zonguldak Bülent Ecevit Üniversitesi 1. sınıf öğrencisiyim; siber güvenlik, siber savunma ve ağ mimarisi alanında eğitimler alıyor ve projeler geliştiriyorum.',
            eduHighSchoolRole: 'Lise • Siber Güvenlik ve Ağ Güvenliği',
            eduHighSchoolSchool: 'Halil Rıfat Paşa Mesleki ve Teknik Anadolu Lisesi',
            eduHighSchoolDate: 'Şub 2019 – Şub 2023',
            eduHighSchoolBadge: 'Mezun',
            eduHighSchoolLoc: '📍 Şişli, İstanbul',
            eduHighSchoolDesc: 'Ağ güvenliği ve sunucu yönetimi alanında derinlemesine ihtisas eğitimi. Cisco Packet Tracer ile ağ simülasyonları, fiziksel ve sanal sunucu kurulumu, Active Directory, Linux sistem yönetimi ve otomasyon süreçleri.',
            cvSectionEdu: 'Eğitim & Akademik Geçmiş',
            cvSectionExp: 'İş & Profesyonel Deneyim',
            cvSectionCerts: 'Onaylı Kurumsal Sertifikalar',
            cvSectionSkills: 'Temel Teknik Yetkinlikler',
            cvDownloadBtn: 'PDF Olarak Yazdır / İndir',

            /* Architecture Flow (Feature 2) */
            archFlowTitle: 'İnteraktif Sistem Mimarisi Şeması',
            archFlowSubtitle: 'Uçtan uca veri akışı, güvenlik çemberi ve yürütme grafiği',
            archClientTitle: 'İstemci / Kullanıcı Arayüzü',
            archClientDesc: 'Vanilla JS, Hızlı UI',
            archGatewayTitle: 'API Ağ Geçidi & Kimlik',
            archGatewayDesc: 'Hız Limiti & Token Doğrulama',
            archCoreTitle: 'Çekirdek Motor & Yapay Zeka',
            archCoreDesc: 'Multi-LLM & Tehdit Analizi',
            archDbTitle: 'Veritabanı & SIEM',
            archDbDesc: 'Şifreli Kasa & Güvenlik Günlüğü',

            /* Interactive CV Modal (Feature 4) */
            cvModalTitle: 'Özgeçmiş — Yusuf Ali Aşkın',
            cvDownloadBtn: 'PDF İndir',
            cvCloseBtn: 'Kapat',
            cvSectionSummary: 'Profesyonel Özet',
            cvSectionExp: 'İş Deneyimi',
            cvSectionSkills: 'Teknik Yetkinlikler',
            cvSectionCert: 'Öne Çıkan Sertifikalar',

            /* Contact Page */
            contactPageLabel: 'İletişim',
            contactPageTitle: 'Birlikte Faydalı Bir Şeyler İnşa Edelim.',
            contactPageDescription: 'Bir proje, fikir veya iş birliği fırsatınız mı var? Çekinmeden bana ulaşın.',
            contactEmail: 'E-posta',
            contactLocation: 'Konum',
            contactLocationValue: 'İstanbul, Türkiye',
            contactFormName: 'Adınız Soyadınız',
            contactFormNamePlaceholder: 'Adınız ve soyadınız...',
            contactFormNameError: 'Lütfen adınızı girin.',
            contactFormEmail: 'E-posta Adresiniz',
            contactFormEmailPlaceholder: 'ornek@email.com',
            contactFormEmailError: 'Lütfen geçerli bir e-posta adresi girin.',
            contactFormSubject: 'Konu',
            contactFormSubjectPlaceholder: 'Mesajınız ne hakkında?',
            contactFormMessage: 'Mesajınız',
            contactFormMessagePlaceholder: 'Projenizden veya aklınızdaki fikirden bahsedin...',
            contactFormMessageError: 'Lütfen mesajınızı yazın.',
            contactFormSend: 'Mesajı Gönder',
            contactCopied: 'E-posta panoya kopyalandı!',

            /* Misc */
            scrollToTop: 'Yukarı çık',
        }
    };

    /**
     * Get saved language or detect from browser
     */
    function getSavedLang() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && translations[saved]) return saved;
        } catch { /* ignore */ }

        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browserLang.startsWith('tr')) return 'tr';
        return DEFAULT_LANG;
    }

    /**
     * Apply translations to all DOM elements with data-i18n attributes
     */
    function applyTranslations(lang) {
        const dict = translations[lang] || translations[DEFAULT_LANG];
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (key.toLowerCase().includes('placeholder')) {
                        el.setAttribute('placeholder', dict[key]);
                    }
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) {
                el.setAttribute('placeholder', dict[key]);
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (dict[key] !== undefined) {
                el.setAttribute('title', dict[key]);
            }
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (dict[key] !== undefined) {
                el.setAttribute('aria-label', dict[key]);
            }
        });
    }

    /**
     * Update language toggle button visual 3D cube state
     */
    function updateToggleText(lang) {
        document.querySelectorAll('.lang-flag-direct-btn, #lang-direct-toggle, .lang-toggle').forEach(btn => {
            btn.setAttribute('data-lang', lang);
            btn.setAttribute('aria-label', lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç');
            btn.classList.toggle('is-tr', lang === 'tr');
            btn.classList.toggle('is-en', lang === 'en');
        });
    }

    /**
     * Notify pages to re-render dynamic content (projects, blog posts, modal)
     */
    function notifyPageOfLangChange(lang) {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        if (typeof ProjectsManager !== 'undefined') {
            if (page === 'index.html' || page === '') {
                ProjectsManager.renderProjects('featured-projects', null, true);
                ProjectsManager.renderBlogPosts('latest-blog-posts', null, 3);
                if (typeof GitHubManager !== 'undefined') {
                    GitHubManager.renderHeatmap('github-heatmap-container');
                    GitHubManager.renderLiveStats('github-stats-grid', 'github-commits-feed');
                }
            } else if (page === 'works.html') {
                ProjectsManager.renderProjects('all-projects', 'All', false);
            } else if (page === 'certificates.html' && typeof ProjectsManager.renderCertificates === 'function') {
                ProjectsManager.renderCertificates('all-certificates', 'All');
            } else if (page === 'blog.html') {
                ProjectsManager.renderBlogPosts('all-blog-posts', 'All');
            } else if (page === 'blog-post.html' && typeof initBlogPostPage === 'function') {
                initBlogPostPage();
            } else if (page === 'work-detail.html' && typeof ProjectsManager.renderProjectDetail === 'function') {
                ProjectsManager.renderProjectDetail();
            } else if (page === 'certificate-detail.html' && typeof ProjectsManager.renderCertificateDetail === 'function') {
                ProjectsManager.renderCertificateDetail();
            }
        }

        // Adjust sliding nav indicator position for new link width
        if (typeof App !== 'undefined' && typeof App.initNavIndicator === 'function') {
            setTimeout(App.initNavIndicator, 60);
        }
    }

    /**
     * Set language with slow & smooth cinematic morph animation
     */
    function setLang(lang, animated = true) {
        if (!translations[lang]) return;
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch { /* ignore */ }

        if (animated) {
            updateToggleText(lang);
            document.body.classList.add('lang-swapping');

            setTimeout(() => {
                applyTranslations(lang);
                notifyPageOfLangChange(lang);

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        document.body.classList.remove('lang-swapping');
                    }, 40);
                });
            }, 180);
        } else {
            applyTranslations(lang);
            updateToggleText(lang);
            notifyPageOfLangChange(lang);
        }
    }

    /**
     * Toggle between TR and EN directly with 3D flip animation
     */
    function toggle() {
        const current = getSavedLang();
        const next = current === 'en' ? 'tr' : 'en';
        setLang(next, true);
    }

    /**
     * Get current language
     */
    function getCurrentLang() {
        return getSavedLang();
    }

    /**
     * Get translation value by key
     */
    function t(key) {
        const lang = getSavedLang();
        return translations[lang]?.[key] || translations[DEFAULT_LANG]?.[key] || key;
    }

    /**
     * Initialize language system
     */
    function init() {
        const lang = getSavedLang();
        applyTranslations(lang);
        updateToggleText(lang);
    }

    /**
     * Bind direct 3D flag toggle button handlers
     */
    function bindToggles() {
        document.querySelectorAll('.lang-flag-direct-btn, #lang-direct-toggle, .lang-toggle').forEach(btn => {
            btn.removeEventListener('click', toggle);
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggle();
            });
        });

        init();
    }

    return { init, bindToggles, toggle, getCurrentLang, t, setLang };
})();
