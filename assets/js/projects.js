/* ============================================
   PROJECTS & BLOG DATA
   projects.js — Project/blog data, filtering, modal
   ============================================ */

const ProjectsManager = (() => {
    'use strict';

    /* ============================================
       Project Data (Concise & Punchy Summaries)
       ============================================ */
    const projects = [
        {
            id: 'afetnet',
            title: 'AfetNet',
            category: 'Web',
            description: {
                en: 'Disaster communication platform with real-time earthquake data and family tracking.',
                tr: 'Gerçek zamanlı deprem verileri ve aile takibi sunan afet iletişim platformu.'
            },
            problem: {
                en: 'During natural disasters, communication breaks down and people struggle to locate family members and access reliable information.',
                tr: 'Doğal afetler sırasında iletişim kesintiye uğrar ve insanlar aile üyelerini bulmakta ve güvenilir bilgiye erişmekte zorlanır.'
            },
            solution: {
                en: 'Built a mobile-first platform that integrates real-time seismic data with family tracking and community coordination tools.',
                tr: 'Gerçek zamanlı sismik verileri aile takibi ve topluluk koordinasyon araçlarıyla entegre eden mobil öncelikli bir platform geliştirdim.'
            },
            features: {
                en: ['Real-time earthquake data integration', 'Family member location tracking', 'Emergency notifications system', 'Community coordination tools', 'Offline-capable architecture'],
                tr: ['Gerçek zamanlı deprem verisi entegrasyonu', 'Aile üyesi konum takibi', 'Acil durum bildirim sistemi', 'Topluluk koordinasyon araçları', 'Çevrimdışı çalışabilir mimari']
            },
            technologies: ['JavaScript', 'React Native', 'Supabase', 'Mobile'],
            github: 'https://github.com/yusufaliaskin/afetnet.com',
            demo: '',
            featured: true
        },
        {
            id: 'ai-system-dashboard',
            title: 'AI System Dashboard',
            category: 'Cybersecurity',
            description: {
                en: 'Centralized network device management with Nmap scanning and SSH/RDP connectivity.',
                tr: 'Nmap taraması ve SSH/RDP bağlantısıyla merkezi ağ cihazı yönetim panosu.'
            },
            problem: {
                en: 'Managing multiple network devices requires switching between different tools and interfaces, making monitoring inefficient.',
                tr: 'Birden fazla ağ cihazını yönetmek farklı araçlar ve arayüzler arasında geçiş yapmayı gerektirir ve izlemeyi verimsiz hale getirir.'
            },
            solution: {
                en: 'Created a unified dashboard that combines network scanning, device management, and remote connectivity in one interface.',
                tr: 'Ağ tarama, cihaz yönetimi ve uzak bağlantıyı tek bir arayüzde birleştiren birleşik bir pano oluşturdum.'
            },
            features: {
                en: ['Nmap-based network scanning', 'SSH device management', 'RDP connectivity', 'Real-time monitoring', 'Device inventory tracking'],
                tr: ['Nmap tabanlı ağ tarama', 'SSH cihaz yönetimi', 'RDP bağlantısı', 'Gerçek zamanlı izleme', 'Cihaz envanter takibi']
            },
            technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Nmap'],
            github: 'https://github.com/yusufaliaskin/AI-System-Dashboard',
            demo: '',
            featured: true
        },
        {
            id: 'aistudio',
            title: 'AIStudio',
            category: 'AI',
            description: {
                en: 'Unified glassmorphism interface for Gemini, OpenAI, and Claude with Deep Research.',
                tr: 'Derin araştırma yetenekli Gemini, OpenAI ve Claude için birleşik modern yapay zeka arayüzü.'
            },
            problem: {
                en: 'Using multiple AI platforms requires switching between different interfaces, making workflows fragmented.',
                tr: 'Birden fazla yapay zeka platformu kullanmak farklı arayüzler arasında geçiş yapmayı gerektirir ve iş akışlarını parçalar.'
            },
            solution: {
                en: 'Built a single interface that unifies access to multiple AI providers with a modern, glassmorphism design.',
                tr: 'Modern cam görünümlü tasarımla birden fazla yapay zeka sağlayıcısına erişimi birleştiren tek bir arayüz geliştirdim.'
            },
            features: {
                en: ['Multi-provider AI access', 'Deep Research capability', 'Multimodal support', 'Glassmorphism UI design', 'Conversation history'],
                tr: ['Çoklu yapay zeka sağlayıcı erişimi', 'Derin Araştırma özelliği', 'Çok modlu destek', 'Cam görünümlü UI tasarımı', 'Konuşma geçmişi']
            },
            technologies: ['Python', 'Flask', 'JavaScript', 'AI APIs'],
            github: 'https://github.com/yusufaliaskin/AIStudio',
            demo: '',
            featured: true
        },
        {
            id: 'friday-ai',
            title: 'F.R.I.D.A.Y-AI',
            category: 'AI',
            description: {
                en: 'Intelligent personal assistant for automated workflow execution and task assistance.',
                tr: 'İş akışı otomasyonu ve akıllı görev yürütme için kişisel yapay zeka asistanı.'
            },
            problem: {
                en: 'Repetitive tasks and information lookups consume time that could be spent on creative problem-solving.',
                tr: 'Tekrarlayan görevler ve bilgi aramaları, yaratıcı problem çözmeye harcanabilecek zamanı tüketir.'
            },
            solution: {
                en: 'Developed an AI-powered assistant that automates routine tasks and provides intelligent responses.',
                tr: 'Rutin görevleri otomatikleştiren ve akıllı yanıtlar sağlayan yapay zeka destekli bir asistan geliştirdim.'
            },
            features: {
                en: ['Intelligent task automation', 'Natural language processing', 'Customizable responses', 'Python-based architecture'],
                tr: ['Akıllı görev otomasyonu', 'Doğal dil işleme', 'Özelleştirilebilir yanıtlar', 'Python tabanlı mimari']
            },
            technologies: ['Python', 'AI APIs', 'NLP'],
            github: 'https://github.com/yusufaliaskin/F.R.I.D.A.Y-AI',
            demo: '',
            featured: true
        },
        {
            id: 'swopy-network',
            title: 'Swopy-Network',
            category: 'Networking',
            description: {
                en: 'CLI utility for local network scanning, device discovery, and bandwidth testing.',
                tr: 'Yerel ağ tarama, cihaz keşfi ve bant genişliği testi için Python tabanlı CLI aracı.'
            },
            problem: {
                en: 'Network administrators need quick, reliable tools to analyze and diagnose local network issues.',
                tr: 'Ağ yöneticileri yerel ağ sorunlarını analiz etmek ve teşhis etmek için hızlı, güvenilir araçlara ihtiyaç duyar.'
            },
            solution: {
                en: 'Created a comprehensive command-line tool that combines multiple network analysis functions in one utility.',
                tr: 'Birden fazla ağ analiz fonksiyonunu tek bir araçta birleştiren kapsamlı bir komut satırı aracı oluşturdum.'
            },
            features: {
                en: ['Network device scanning', 'Internet speed testing', 'Traffic monitoring', 'Device discovery', 'CLI interface'],
                tr: ['Ağ cihazı tarama', 'İnternet hız testi', 'Trafik izleme', 'Cihaz keşfi', 'CLI arayüzü']
            },
            technologies: ['Python', 'Networking', 'CLI'],
            github: 'https://github.com/yusufaliaskin/Swopy-Network',
            demo: '',
            featured: false
        },
        {
            id: 'swopy-troi',
            title: 'Swopy-Troi',
            category: 'Networking',
            description: {
                en: 'Professional network evaluation toolkit for DNS querying and Wi-Fi analysis.',
                tr: 'DNS sorgulama ve Wi-Fi analizi için profesyonel ağ değerlendirme aracı.'
            },
            problem: {
                en: 'Professional network evaluation requires multiple specialized tools and significant time investment.',
                tr: 'Profesyonel ağ değerlendirmesi birden fazla özel araç ve önemli zaman yatırımı gerektirir.'
            },
            solution: {
                en: 'Built an all-in-one network evaluation tool that combines scanning, DNS queries, and Wi-Fi analysis.',
                tr: 'Tarama, DNS sorguları ve Wi-Fi analizini birleştiren hepsi bir arada bir ağ değerlendirme aracı geliştirdim.'
            },
            features: {
                en: ['Professional network scanning', 'DNS querying', 'Wi-Fi analysis', 'Data evaluation', 'Time-efficient workflow'],
                tr: ['Profesyonel ağ tarama', 'DNS sorgulama', 'Wi-Fi analizi', 'Veri değerlendirme', 'Zaman tasarruflu iş akışı']
            },
            technologies: ['Python', 'Networking', 'DNS'],
            github: 'https://github.com/yusufaliaskin/Swopy-Troi',
            demo: '',
            featured: false
        },
        {
            id: 'zksessions',
            title: 'ZKSessions',
            category: 'Tools',
            description: {
                en: 'Corporate session tracking and audit reporting utility for system administrators.',
                tr: 'Sistem yöneticileri için kurumsal oturum takibi ve denetim raporlama aracı.'
            },
            problem: {
                en: 'Organizations need visibility into user sessions for security compliance and operational monitoring.',
                tr: 'Kuruluşlar güvenlik uyumluluğu ve operasyonel izleme için kullanıcı oturumlarına görünürlük ihtiyaç duyar.'
            },
            solution: {
                en: 'Developed a session tracking system that monitors, logs, and reports on corporate user sessions.',
                tr: 'Kurumsal kullanıcı oturumlarını izleyen, kaydeden ve raporlayan bir oturum takip sistemi geliştirdim.'
            },
            features: {
                en: ['Session monitoring', 'Automated reporting', 'User activity tracking', 'Admin dashboard'],
                tr: ['Oturum izleme', 'Otomatik raporlama', 'Kullanıcı aktivite takibi', 'Yönetici panosu']
            },
            technologies: ['Python', 'Monitoring', 'Security'],
            github: 'https://github.com/yusufaliaskin/ZKSessions',
            demo: '',
            featured: false
        },
        {
            id: 'guacview-search',
            title: 'Guacview Search',
            category: 'Tools',
            description: {
                en: 'Active Directory data retrieval tool for streamlined IT file organization.',
                tr: 'IT dosya düzenleme süreçleri için Active Directory veri alma aracı.'
            },
            problem: {
                en: 'IT teams waste time manually searching for user data and managing file clutter across Active Directory environments.',
                tr: 'IT ekipleri Active Directory ortamlarında kullanıcı verilerini manuel olarak aramak ve dosya karmaşasını yönetmek için zaman harcar.'
            },
            solution: {
                en: 'Created a streamlined tool that automatically retrieves and organizes user data from Active Directory.',
                tr: 'Active Directory\'den kullanıcı verilerini otomatik olarak alan ve düzenleyen verimli bir araç oluşturdum.'
            },
            features: {
                en: ['Active Directory integration', 'Automated data retrieval', 'File management', 'Efficient task execution'],
                tr: ['Active Directory entegrasyonu', 'Otomatik veri alma', 'Dosya yönetimi', 'Verimli görev yürütme']
            },
            technologies: ['JavaScript', 'Active Directory', 'Windows'],
            github: 'https://github.com/yusufaliaskin/Guacview-Search',
            demo: '',
            featured: false
        },
        {
            id: 'it-toolbox',
            title: 'IT Toolbox Global',
            category: 'Tools',
            description: {
                en: 'Curated resource hub of essential tools and software for IT specialists.',
                tr: 'IT uzmanları için temel araç ve yazılımların kategorize edilmiş kaynak merkezi.'
            },
            problem: {
                en: 'IT professionals spend time searching for the right tools across different sources.',
                tr: 'IT profesyonelleri farklı kaynaklarda doğru araçları aramak için zaman harcar.'
            },
            solution: {
                en: 'Built a centralized, categorized resource hub for essential IT tools and software.',
                tr: 'Temel IT araçları ve yazılımları için merkezi, kategorize edilmiş bir kaynak merkezi oluşturdum.'
            },
            features: {
                en: ['Categorized tool listings', 'Regular updates', 'IT professional focused', 'Easy navigation'],
                tr: ['Kategorize araç listeleri', 'Düzenli güncellemeler', 'IT profesyonellerine odaklı', 'Kolay navigasyon']
            },
            technologies: ['HTML', 'CSS', 'Documentation'],
            github: 'https://github.com/yusufaliaskin/IT-Toolbox-Global',
            demo: '',
            featured: false
        },
        {
            id: 'zkbgfilezilla',
            title: 'ZKBGFILEZILLA',
            category: 'Tools',
            description: {
                en: 'Corporate file transfer automation utility with scheduled batch sync operations.',
                tr: 'Zamanlanmış toplu senkronizasyon özellikli kurumsal dosya transfer otomasyonu.'
            },
            problem: {
                en: 'File management in corporate environments often involves repetitive manual operations.',
                tr: 'Kurumsal ortamlarda dosya yönetimi genellikle tekrarlayan manuel işlemleri içerir.'
            },
            solution: {
                en: 'Created an automated utility to streamline file management and synchronization tasks.',
                tr: 'Dosya yönetimi ve senkronizasyon görevlerini kolaylaştırmak için otomatik bir yardımcı program oluşturdum.'
            },
            features: {
                en: ['File management', 'Automated operations', 'Corporate workflow integration', 'Secure transfers'],
                tr: ['Dosya yönetimi', 'Otomatik işlemler', 'Kurumsal iş akışı entegrasyonu', 'Güvenli transferler']
            },
            technologies: ['Python', 'Automation', 'FTP'],
            github: 'https://github.com/yusufaliaskin/ZKBGFILEZILLA',
            demo: '',
            featured: false
        }
    ];

    /* ============================================
       Blog Data (Full Technical Articles)
       ============================================ */
    const blogPosts = [
        {
            id: 'siem-architecture',
            title: {
                en: 'Understanding SIEM Architecture & Modern Threat Detection',
                tr: 'SIEM Mimarisini ve Modern Tehdit Tespitini Anlamak'
            },
            category: 'Cybersecurity',
            description: {
                en: 'A deep dive into Security Information and Event Management systems, log parsing pipelines, and correlation rule engines.',
                tr: 'Güvenlik Bilgi ve Olay Yönetimi (SIEM) sistemleri, log ayrıştırma boru hatları ve korelasyon motorlarına derinlemesine bir bakış.'
            },
            date: '2026-08-10',
            readTime: 8,
            isDemo: false,
            content: {
                en: `
                    <p class="lead-text">In modern enterprise cybersecurity, perimeter firewalls alone are no longer sufficient. Modern adversaries operate with stolen credentials, living-off-the-land binaries, and evasive techniques. <strong>Security Information and Event Management (SIEM)</strong> serves as the central nervous system of security operations (SOC), ingesting millions of disparate events to uncover malicious activity before catastrophic breaches occur.</p>

                    <h2>1. The Four Pillars of Modern SIEM</h2>
                    <p>A resilient SIEM architecture is divided into four critical pipelines:</p>
                    <ul>
                        <li><strong>Data Ingestion & Collectors:</strong> Syslog, Windows Event Logs (WEF/WEC), cloud audit trails (AWS CloudTrail, GCP Cloud Audit), and network flow logs (NetFlow, IPFIX).</li>
                        <li><strong>Normalization & Schema Mapping:</strong> Parsing unstructured logs into standardized schemas such as ECS (Elastic Common Schema) or CIM (Common Information Model).</li>
                        <li><strong>Real-Time Correlation & Detection Engine:</strong> Rule-based engines, threshold detectors, and machine-learning-assisted anomaly detection evaluating event sequences.</li>
                        <li><strong>Storage & Indexing:</strong> Tiered hot-warm-cold distributed clusters allowing sub-second analytical search across terabytes of historical telemetry.</li>
                    </ul>

                    <blockquote>
                        <p>"Telemetry without standardized context is just noise. The real power of a SIEM lies in deterministic correlation across disparate data sources."</p>
                    </blockquote>

                    <h2>2. Building a Custom Log Normalizer in Python</h2>
                    <p>Below is an architectural example of an asynchronous log ingestion pipeline parser that extracts IP indicators and computes threat heuristics:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code>import re
from datetime import datetime

class SIEMLogParser:
    """Normalizes raw auth logs into structured security events."""
    
    AUTH_FAIL_REGEX = re.compile(
        r'(?P<timestamp>\w+\s+\d+\s+[\d:]+)\s+(?P<host>[\w\.\-]+)\s+sshd\[\d+\]:\s+Failed password for (?:invalid user )?(?P<user>\w+) from (?P<src_ip>\d+\.\d+\.\d+\.\d+) port (?P<port>\d+)'
    )

    def parse_auth_line(self, raw_line: str) -> dict:
        match = self.AUTH_FAIL_REGEX.search(raw_line)
        if not match:
            return None
        
        event = match.groupdict()
        event["event_type"] = "AUTH_FAILURE"
        event["severity"] = "MEDIUM"
        event["target_service"] = "SSH"
        return event

# Example Execution
parser = SIEMLogParser()
raw_log = "Aug 10 14:23:41 edge-gateway-01 sshd[28491]: Failed password for invalid user admin from 198.51.100.42 port 48291 ssh2"
print(parser.parse_auth_line(raw_log))</code></pre>
                    </div>

                    <h2>3. Correlation Rules & Behavioral Detection</h2>
                    <p>Detecting brute force attacks requires correlation rules tracking state across sliding time windows:</p>
                    <ul>
                        <li><strong>Threshold Rule:</strong> <code>COUNT(event_type = 'AUTH_FAILURE') > 10 WHERE time_window <= 60s GROUP BY src_ip</code></li>
                        <li><strong>Multi-Vector Rule:</strong> A successful login preceded by multiple failed logins from an anomalous geolocated IP address within 5 minutes.</li>
                    </ul>

                    <h2>4. Key Takeaways</h2>
                    <p>Deploying a successful SIEM requires tuning alert noise, eliminating alert fatigue, and establishing automated SOAR playbooks that quarantine compromised hosts instantly.</p>
                `,
                tr: `
                    <p class="lead-text">Modern kurumsal siber güvenlikte, tek başına güvenlik duvarları (firewall) yeterli değildir. Saldırganlar ele geçirilmiş kimlik bilgileri ve sistem içi araçlarla (living-off-the-land) hareket eder. <strong>Güvenlik Bilgi ve Olay Yönetimi (SIEM)</strong>, güvenlik operasyon merkezlerinin (SOC) merkezi sinir sistemidir; milyonlarca logu toplayıp analiz ederek tehditleri gerçekleşmeden ortaya çıkarır.</p>

                    <h2>1. Modern SIEM Mimarisinin 4 Temel Ayağı</h2>
                    <p>Dayanıklı bir SIEM altyapısı şu dört ana hattan oluşur:</p>
                    <ul>
                        <li><strong>Veri Toplama (Ingestion):</strong> Syslog, Windows Olay Günlükleri (WEF), bulut denetim logları (AWS CloudTrail, GCP Audit) ve ağ akışları (NetFlow).</li>
                        <li><strong>Normalizasyon & Şema Eşleme:</strong> Yapılandırılmamış logları ECS (Elastic Common Schema) veya CIM gibi ortak veri modellerine dönüştürme.</li>
                        <li><strong>Gerçek Zamanlı Korelasyon Motoru:</strong> Olay dizilerini değerlendiren kural tabanlı ve makine öğrenimi destekli anomali tespit motorları.</li>
                        <li><strong>Depolama ve İndeksleme:</strong> Terabaytlarca geçmiş veride saniyeler içinde arama yapabilen katmanlı (hot-warm-cold) dağıtık veritabanları.</li>
                    </ul>

                    <blockquote>
                        <p>"Standartlaştırılmamış telemetri sadece gürültüdür. Bir SIEM'in gerçek gücü, farklı kaynaklardan gelen olayları birbiriyle ilişkilendirebilmesinde yatar."</p>
                    </blockquote>

                    <h2>2. Python ile Özel Log Ayrıştırıcı Oluşturma</h2>
                    <p>Aşağıda, kimlik doğrulama loglarını ayrıştırıp güvenlik olayına dönüştüren asenkron bir Python ayrıştırıcı örneği yer almaktadır:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Kopyala</button>
                        </div>
                        <pre><code>import re
from datetime import datetime

class SIEMLogParser:
    """Ham kimlik doğrulama loglarını yapılandırılmış güvenlik olaylarına dönüştürür."""
    
    AUTH_FAIL_REGEX = re.compile(
        r'(?P<timestamp>\w+\s+\d+\s+[\d:]+)\s+(?P<host>[\w\.\-]+)\s+sshd\[\d+\]:\s+Failed password for (?:invalid user )?(?P<user>\w+) from (?P<src_ip>\d+\.\d+\.\d+\.\d+) port (?P<port>\d+)'
    )

    def parse_auth_line(self, raw_line: str) -> dict:
        match = self.AUTH_FAIL_REGEX.search(raw_line)
        if not match:
            return None
        
        event = match.groupdict()
        event["event_type"] = "AUTH_FAILURE"
        event["severity"] = "MEDIUM"
        event["target_service"] = "SSH"
        return event

# Örnek Çalıştırma
parser = SIEMLogParser()
raw_log = "Aug 10 14:23:41 edge-gateway-01 sshd[28491]: Failed password for invalid user admin from 198.51.100.42 port 48291 ssh2"
print(parser.parse_auth_line(raw_log))</code></pre>
                    </div>

                    <h2>3. Korelasyon Kuralları & Davranışsal Analiz</h2>
                    <p>Kaba kuvvet (brute-force) saldırılarını tespit etmek, kayan zaman pencerelerinde durum takibi gerektirir:</p>
                    <ul>
                        <li><strong>Eşik Kuralı:</strong> <code>COUNT(event_type = 'AUTH_FAILURE') > 10 WHERE time_window <= 60s GROUP BY src_ip</code></li>
                        <li><strong>Çok Vektörlü Kural:</strong> 5 dakika içinde aynı IP adresinden gelen başarısız giriş denemelerinin ardından gerçekleşen başarılı bir oturum açma.</li>
                    </ul>

                    <h2>4. Sonuç ve Çıkarımlar</h2>
                    <p>Başarılı bir SIEM entegrasyonu, yanlış alarmları (false positives) en aza indirmek ve şüpheli ana bilgisayarları anında karantinaya alan otomatik SOAR senaryoları geliştirmekle mümkündür.</p>
                `
            }
        },
        {
            id: 'django-monitoring',
            title: {
                en: 'Building a Modern Django Monitoring System with Prometheus & Grafana',
                tr: 'Prometheus ve Grafana ile Modern Django İzleme Sistemi Kurulumu'
            },
            category: 'Programming',
            description: {
                en: 'How to instrument Django applications with custom Prometheus metrics, middleware latency tracking, and Grafana telemetry.',
                tr: 'Django uygulamalarını özel Prometheus metrikleri, ara katman gecikme takibi ve Grafana panoları ile telemetriye bağlama rehberi.'
            },
            date: '2026-07-28',
            readTime: 12,
            isDemo: false,
            content: {
                en: `
                    <p class="lead-text">When scaling Django applications in production, relying solely on standard HTTP server logs is a recipe for blind spots. True observability demands real-time request metrics, database query histograms, and cache hit ratios exposed to a continuous scraping engine like Prometheus.</p>

                    <h2>1. Designing the Observability Middleware</h2>
                    <p>To measure the precise execution lifecycle of incoming HTTP requests, we implement a lightweight Django middleware that updates Prometheus metric counters and latency histograms:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code>import time
from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter(
    'django_http_requests_total',
    'Total HTTP requests processed by Django',
    ['method', 'endpoint', 'status_code']
)

REQUEST_LATENCY = Histogram(
    'django_http_request_duration_seconds',
    'Histogram of request processing duration in seconds',
    ['endpoint'],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0]
)

class PrometheusMetricsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.perf_counter()
        response = self.get_response(request)
        duration = time.perf_counter() - start_time

        endpoint = getattr(request.resolver_match, 'route', request.path)
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=endpoint,
            status_code=response.status_code
        ).inc()

        REQUEST_LATENCY.labels(endpoint=endpoint).observe(duration)
        return response</code></pre>
                    </div>

                    <h2>2. Exposing the Metrics Endpoint</h2>
                    <p>Protecting the <code>/metrics</code> scrape route is crucial. In production, configure an internal endpoint accessible only by the Prometheus cluster:</p>
                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code>from django.urls import path
from prometheus_client import make_wsgi_app
from django.core.wsgi import get_wsgi_application

# Internal metrics route
urlpatterns = [
    path('metrics/', make_wsgi_app()),
]</code></pre>
                    </div>

                    <h2>3. Database Pool & Memory Telemetry</h2>
                    <p>In high-throughput environments, monitoring PostgreSQL connection pool exhaustion and garbage collection pauses prevents cascading outages during traffic spikes.</p>
                `,
                tr: `
                    <p class="lead-text">Üretim ortamındaki Django uygulamalarını ölçeklendirirken yalnızca web sunucu loglarına güvenmek kör noktalara sebep olur. Gerçek gözlemlenebilirlik (observability); gerçek zamanlı istek sayıları, veritabanı sorgu gecikmeleri ve önbellek (cache) isabet oranlarının Prometheus gibi sistemlerle izlenmesini gerektirir.</p>

                    <h2>1. Telemetri Ara Katmanı (Middleware) Tasarımı</h2>
                    <p>Gelen HTTP isteklerinin yaşam döngüsünü milisaniyelik hassasiyetle ölçmek için özel bir Django ara katmanı kullanıyoruz:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Kopyala</button>
                        </div>
                        <pre><code>import time
from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter(
    'django_http_requests_total',
    'Django tarafından işlenen toplam HTTP istek sayısı',
    ['method', 'endpoint', 'status_code']
)

REQUEST_LATENCY = Histogram(
    'django_http_request_duration_seconds',
    'İstek işleme süresi histogramı (saniye)',
    ['endpoint'],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0]
)

class PrometheusMetricsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.perf_counter()
        response = self.get_response(request)
        duration = time.perf_counter() - start_time

        endpoint = getattr(request.resolver_match, 'route', request.path)
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=endpoint,
            status_code=response.status_code
        ).inc()

        REQUEST_LATENCY.labels(endpoint=endpoint).observe(duration)
        return response</code></pre>
                    </div>

                    <h2>2. /metrics Uç Noktasını Yapılandırma</h2>
                    <p>Metriklerin Prometheus tarafından toplanabilmesi için <code>/metrics</code> rotasını yalnızca iç ağa ve izleme sunucusuna açık olacak şekilde yapılandırıyoruz.</p>

                    <h2>3. Veritabanı ve Bellek Yönetimi</h2>
                    <p>Yüksek trafikli sistemlerde PostgreSQL bağlantı havuzu tükenmelerini ve Python Garbage Collection duraklamalarını izlemek, sistem kilitlenmelerinin önüne geçer.</p>
                `
            }
        },
        {
            id: 'linux-networking',
            title: {
                en: 'Linux Networking Deep Dive: Sockets, Netfilter & eBPF',
                tr: 'Derinlemesine Linux Ağ Mimarisi: Soketler, Netfilter ve eBPF'
            },
            category: 'Linux',
            description: {
                en: 'Mastering the Linux kernel network stack, packet lifecycle, iptables chains, and next-generation eBPF packet filtering.',
                tr: 'Linux çekirdek ağ yığını, paket yaşam döngüsü, iptables zincirleri ve yeni nesil eBPF paket filtreleme teknikleri.'
            },
            date: '2026-07-15',
            readTime: 10,
            isDemo: false,
            content: {
                en: `
                    <p class="lead-text">Understanding how a network packet travels through the Linux kernel from the physical Network Interface Card (NIC) up to user-space applications is fundamental for building high-performance, fortified network infrastructure.</p>

                    <h2>1. The Kernel Packet Traversal Path</h2>
                    <p>When an Ethernet frame hits a physical NIC, the following sequence occurs within microseconds:</p>
                    <ol>
                        <li><strong>DMA Transfer & Ring Buffer:</strong> The NIC moves frame bytes into host memory via DMA (Direct Memory Access) and raises a hardware interrupt (IRQ).</li>
                        <li><strong>NAPI & SoftIRQ:</strong> Linux switches to polling mode to prevent interrupt storms, allocating an <code>sk_buff</code> struct for the packet.</li>
                        <li><strong>Netfilter Hooks:</strong> The packet traverses <code>PREROUTING</code>, <code>INPUT</code>, <code>FORWARD</code>, <code>OUTPUT</code>, and <code>POSTROUTING</code> hooks.</li>
                        <li><strong>Socket Buffer Queue:</strong> If destination matches a local listening socket, the payload is enqueued in the socket's receive buffer ready for user-space <code>recv()</code>.</li>
                    </ol>

                    <h2>2. Kernel Firewalling with Netfilter & iptables</h2>
                    <p>Securing an edge node requires strict stateful connection tracking:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">bash</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code># Drop all invalid packets and allow established connections
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Rate limit new SSH connections to prevent brute force
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --set
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --update --seconds 60 --hitcount 4 -j DROP

# Default policy drop
iptables -P INPUT DROP
iptables -P FORWARD DROP</code></pre>
                    </div>

                    <h2>3. The Revolution of eBPF and XDP</h2>
                    <p>eBPF (Extended Berkeley Packet Filter) combined with XDP (eXpress Data Path) allows running sandboxed C programs directly inside the NIC driver, processing millions of packets per second before the kernel even allocates an <code>sk_buff</code>.</p>
                `,
                tr: `
                    <p class="lead-text">Bir ağ paketinin fiziksel ağ kartından (NIC) Linux çekirdeğine ve oradan kullanıcı alanındaki (user-space) bir uygulamaya kadar olan yolculuğunu anlamak, yüksek performanslı ve güvenli ağ sistemleri kurmanın temelidir.</p>

                    <h2>1. Çekirdekte Paketin Yaşam Döngüsü</h2>
                    <p>Bir Ethernet çerçevesi ağ kartına ulaştığında mikrosaniyeler içinde şu adımlar gerçekleşir:</p>
                    <ol>
                        <li><strong>DMA Transferi ve Ring Buffer:</strong> NIC, çerçeveyi DMA ile ana belleğe yazar ve bir donanım kesmesi (IRQ) tetikler.</li>
                        <li><strong>NAPI & SoftIRQ:</strong> Linux kesme fırtınasını önlemek için yoklama (polling) moduna geçer ve paket için bir <code>sk_buff</code> nesnesi tahsis eder.</li>
                        <li><strong>Netfilter Kancaları:</strong> Paket <code>PREROUTING</code>, <code>INPUT</code>, <code>FORWARD</code> gibi Netfilter kontrol noktalarından geçer.</li>
                        <li><strong>Soket Kuyruğu:</strong> Paket yerel bir soketi hedefliyorsa, uygulamanın okuması için soket tampon belleğine (socket buffer) yerleştirilir.</li>
                    </ol>

                    <h2>2. iptables ile Durum Bilgili (Stateful) Güvenlik Duvarı</h2>
                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">bash</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Kopyala</button>
                        </div>
                        <pre><code># Geçersiz paketleri engelle, mevcut bağlantılara izin ver
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# SSH için kaba kuvvet saldırısı engelleme (60 sn'de 4 deneme)
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --set
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --update --seconds 60 --hitcount 4 -j DROP

# Varsayılan politika: Reddet (DROP)
iptables -P INPUT DROP
iptables -P FORWARD DROP</code></pre>
                    </div>

                    <h2>3. eBPF ve XDP ile Yeni Nesil Ağ Filtreleme</h2>
                    <p>eBPF ve XDP, kodların doğrudan ağ kartı sürücüsünde çalışmasını sağlayarak saniyede milyonlarca paketi çekirdek yükü olmadan filtrelemeyi mümkün kılar.</p>
                `
            }
        },
        {
            id: 'ai-developer-tools',
            title: {
                en: 'Building Local AI Developer Tools with LLMs & Structured Tool Calling',
                tr: 'LLM ve Yapılandırılmış Araç Çağrısı ile Yerel Yapay Zeka Araçları Geliştirme'
            },
            category: 'AI',
            description: {
                en: 'Leveraging LLM function calling, vector embeddings, and local agents to build robust coding and security assistants.',
                tr: 'Fonksiyon çağırma, vektör gömmeleri ve yerel ajan mimarileriyle güçlü kodlama ve güvenlik asistanları geliştirme.'
            },
            date: '2026-07-02',
            readTime: 7,
            isDemo: false,
            content: {
                en: `
                    <p class="lead-text">Generative AI tools are evolving from conversational chatbots into autonomous developer agents capable of reading codebases, running unit tests, inspecting vulnerabilities, and refactoring software with deterministic precision.</p>

                    <h2>1. The Agent Loop Pattern</h2>
                    <p>An effective AI coding agent operates on a continuous feedback loop: <strong>Observe → Plan → Act → Verify</strong>. Determinism is maintained by requiring the model to emit strictly validated JSON schema tool calls.</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code>import json
from typing import Dict, Any

class SecurityAuditAgent:
    """Autonomous agent inspecting source code for security vulnerabilities."""
    
    TOOLS_SCHEMA = [
        {
            "name": "scan_hardcoded_secrets",
            "description": "Searches code files for exposed API tokens and private keys.",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string"}
                },
                "required": ["file_path"]
            }
        }
    ]

    def execute_tool(self, tool_name: str, args: Dict[str, Any]) -> str:
        if tool_name == "scan_hardcoded_secrets":
            # Logic scanning file for JWT/RSA/AWS credentials
            return json.dumps({"status": "clean", "file": args["file_path"]})
        return json.dumps({"error": "Unknown tool"})</code></pre>
                    </div>

                    <h2>2. Context Window & Semantic Code Embeddings</h2>
                    <p>Feeding an entire 100,000-line repository into an LLM context is wasteful and slow. By utilizing local embedding models and cosine similarity, we retrieve only the relevant AST syntax trees and symbol definitions.</p>
                `,
                tr: `
                    <p class="lead-text">Yapay zeka araçları artık basit sohbet botlarından; kaynak kodları okuyabilen, birim testleri çalıştırabilen ve güvenlik açıklarını analiz edebilen otonom geliştirici ajanlarına dönüşüyor.</p>

                    <h2>1. Ajan Çalışma Döngüsü (Agent Loop)</h2>
                    <p>Başarılı bir geliştirici ajanı şu döngüyle çalışır: <strong>Gözlemle → Planla → Eyleme Geç → Doğrula</strong>. Modelin kararlı davranması için JSON şeması ile tanımlanmış araç çağrıları (Tool Calling) kullanılır.</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Kopyala</button>
                        </div>
                        <pre><code>import json
from typing import Dict, Any

class SecurityAuditAgent:
    """Kaynak kodları güvenlik açıkları için denetleyen otonom ajan."""
    
    TOOLS_SCHEMA = [
        {
            "name": "scan_hardcoded_secrets",
            "description": "Kod dosyalarındaki API anahtarlarını ve gizli verileri tarar.",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string"}
                },
                "required": ["file_path"]
            }
        }
    ]

    def execute_tool(self, tool_name: str, args: Dict[str, Any]) -> str:
        if tool_name == "scan_hardcoded_secrets":
            return json.dumps({"status": "clean", "file": args["file_path"]})
        return json.dumps({"error": "Bilinmeyen araç"})</code></pre>
                    </div>

                    <h2>2. Vektör Gömmeleri ve Anlamsal Kod Arama</h2>
                    <p>Yüz binlerce satırlık bir projeyi modele tek seferde vermek yerine, yerel vektör modelleri ile yalnızca aranan işlevle ilgili fonksiyon ve sınıflar çekilir.</p>
                `
            }
        },
        {
            id: 'network-scanning-python',
            title: {
                en: 'Building an Asynchronous Network Scanner with Python & Scapy',
                tr: 'Python ve Scapy ile Asenkron Ağ ve Port Tarayıcı Geliştirme'
            },
            category: 'Networking',
            description: {
                en: 'Practical guide to crafting raw TCP SYN packets, banner grabbing, and high-concurrency network discovery tools.',
                tr: 'Ham TCP SYN paketleri üretme, banner grabbing ve yüksek eşzamanlı ağ keşif araçları geliştirme rehberi.'
            },
            date: '2026-06-20',
            readTime: 9,
            isDemo: false,
            content: {
                en: `
                    <p class="lead-text">Port scanning is the foundational reconnaissance phase in security auditing. While tools like Nmap are ubiquitous, building a custom asynchronous scanner in Python provides deep insight into socket mechanics, TCP handshakes, and non-blocking concurrency.</p>

                    <h2>1. TCP SYN (Half-Open) Scanning Mechanics</h2>
                    <p>A stealthy TCP SYN scan never completes the three-way handshake:</p>
                    <ul>
                        <li><strong>Target Open:</strong> Scanner sends <code>SYN</code> → Target replies with <code>SYN-ACK</code> → Scanner immediately sends <code>RST</code> to tear down connection before application logging.</li>
                        <li><strong>Target Closed:</strong> Scanner sends <code>SYN</code> → Target replies with <code>RST</code>.</li>
                        <li><strong>Filtered / Firewall:</strong> Scanner sends <code>SYN</code> → No response (timeout) or ICMP Type 3 error.</li>
                    </ul>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code>import asyncio
import socket

async def check_port(host: str, port: int, timeout: float = 1.0) -> bool:
    """Asynchronously checks if a TCP port is open via non-blocking connect."""
    try:
        conn = asyncio.open_connection(host, port)
        reader, writer = await asyncio.wait_for(conn, timeout=timeout)
        writer.close()
        await writer.wait_closed()
        return True
    except (asyncio.TimeoutError, ConnectionRefusedError, OSError):
        return False

async def scan_range(host: str, ports: list[int]):
    tasks = [check_port(host, port) for port in ports]
    results = await asyncio.gather(*tasks)
    open_ports = [port for port, is_open in zip(ports, results) if is_open]
    print(f"[+] Open ports on {host}: {open_ports}")

# Run async scan across common ports
asyncio.run(scan_range("127.0.0.1", [22, 80, 443, 3306, 8080, 8443]))</code></pre>
                    </div>

                    <h2>2. High-Concurrency Optimization</h2>
                    <p>Using <code>asyncio.Semaphore</code> ensures we do not overwhelm the host operating system's file descriptor limits (<code>ulimit -n</code>) when scanning thousands of endpoints simultaneously.</p>
                `,
                tr: `
                    <p class="lead-text">Port tarama, güvenlik denetimlerinin ve sızma testlerinin temel keşif aşamasıdır. Python ile özel asenkron bir tarayıcı geliştirmek; soket mekaniklerini, TCP el sıkışmasını ve engellemesiz (non-blocking) eşzamanlılığı derinlemesine kavramayı sağlar.</p>

                    <h2>1. TCP SYN (Yarı Açık) Tarama Mantığı</h2>
                    <p>TCP SYN taraması 3 adımlı el sıkışmayı bilinçli olarak tamamlamaz:</p>
                    <ul>
                        <li><strong>Port Açık:</strong> İstemci <code>SYN</code> yollar → Hedef <code>SYN-ACK</code> döner → İstemci hemen <code>RST</code> göndererek bağlantıyı kapatır.</li>
                        <li><strong>Port Kapalı:</strong> İstemci <code>SYN</code> yollar → Hedef <code>RST</code> ile yanıt verir.</li>
                    </ul>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">python</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Kopyala</button>
                        </div>
                        <pre><code>import asyncio
import socket

async def check_port(host: str, port: int, timeout: float = 1.0) -> bool:
    """Asenkron soket ile TCP portunun açık olup olmadığını kontrol eder."""
    try:
        conn = asyncio.open_connection(host, port)
        reader, writer = await asyncio.wait_for(conn, timeout=timeout)
        writer.close()
        await writer.wait_closed()
        return True
    except (asyncio.TimeoutError, ConnectionRefusedError, OSError):
        return False

async def scan_range(host: str, ports: list[int]):
    tasks = [check_port(host, port) for port in ports]
    results = await asyncio.gather(*tasks)
    open_ports = [port for port, is_open in zip(ports, results) if is_open]
    print(f"[+] {host} üzerinde açık portlar: {open_ports}")

# Yaygın portları asenkron tara
asyncio.run(scan_range("127.0.0.1", [22, 80, 443, 3306, 8080, 8443]))</code></pre>
                    </div>

                    <h2>2. Eşzamanlılık ve Sistem Kaynakları</h2>
                    <p>Binlerce portu aynı anda tararken işletim sisteminin dosya tanıtıcı (file descriptor) sınırına takılmamak için <code>asyncio.Semaphore</code> kullanımı kritik öneme sahiptir.</p>
                `
            }
        },
        {
            id: 'modern-css-techniques',
            title: {
                en: 'Modern CSS in 2026: Subgrid, View Transitions & Container Queries',
                tr: '2026\'da Modern CSS: Subgrid, View Transitions ve Container Queries'
            },
            category: 'Web Development',
            description: {
                en: 'Architecting ultra-fast, premium web interfaces with modern native CSS features without heavy JavaScript frameworks.',
                tr: 'Ağır JavaScript kütüphanelerine ihtiyaç duymadan modern yerel CSS özellikleri ile ultra hızlı ve şık arayüzler tasarlama.'
            },
            date: '2026-06-05',
            readTime: 6,
            isDemo: false,
            content: {
                en: `
                    <p class="lead-text">Web design in 2026 has entered a golden age of native browser capabilities. Heavy UI libraries and bulky animation frameworks are increasingly replaced by standard CSS features that deliver 120fps hardware-accelerated fluid performance.</p>

                    <h2>1. Native View Transitions API</h2>
                    <p>Seamless page and theme morphing can now be achieved natively with circular clip-path animations and zero layout thrashing:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">css</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code>::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-new(root) {
    z-index: 9999;
}</code></pre>
                    </div>

                    <h2>2. Container Queries for True Component Modularity</h2>
                    <p>Instead of designing for viewport widths, components can now respond directly to their immediate parent container's width:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">css</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Copy</button>
                        </div>
                        <pre><code>.card-container {
    container-type: inline-size;
}

@container (min-width: 480px) {
    .card-layout {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 1.5rem;
    }
}</code></pre>
                    </div>

                    <h2>3. Conclusion</h2>
                    <p>By leveraging pure CSS tokens, trigonometric functions (<code>sin()</code>, <code>cos()</code>), and subgrids, web applications stay featherlight, accessible, and blindingly fast.</p>
                `,
                tr: `
                    <p class="lead-text">2026 web standartları, tarayıcıların yerel yeteneklerinin zirveye ulaştığı bir dönemi temsil ediyor. Ağır UI paketleri ve hantal animasyon kütüphaneleri, yerini doğrudan donanım hızlandırmalı 120fps performans sunan yerel CSS özelliklerine bırakıyor.</p>

                    <h2>1. Yerel View Transitions API</h2>
                    <p>Sayfalar ve temalar arası dairesel şok dalgası geçişleri artık sıfır gecikmeyle yerel olarak yapılabiliyor:</p>

                    <div class="code-block-wrapper">
                        <div class="code-header">
                            <span class="code-lang">css</span>
                            <button class="copy-code-btn" onclick="ProjectsManager.copyCode(this)">Kopyala</button>
                        </div>
                        <pre><code>::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-new(root) {
    z-index: 9999;
}</code></pre>
                    </div>

                    <h2>2. Konteyner Sorguları (Container Queries)</h2>
                    <p>Bileşenler artık ekran genişliğine değil, doğrudan içinde bulundukları ebeveyn kutunun genişliğine göre duyarlı (responsive) hale gelebiliyor.</p>

                    <h2>3. Sonuç</h2>
                    <p>Saf CSS değişkenleri, subgrid ve modern seçicilerle inşa edilen web siteleri; hem hafif, hem erişilebilir hem de ışık hızında çalışır.</p>
                `
            }
        }
    ];

    /**
     * Get project description based on current language
     */
    function getLocalizedText(obj, lang) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[lang] || obj['en'] || '';
    }

    /**
     * Get localized array of items (e.g. features)
     */
    function getLocalizedArray(obj, lang) {
        if (!obj) return [];
        if (Array.isArray(obj)) return obj;
        return obj[lang] || obj['en'] || [];
    }

    /**
     * Render project cards into a container with search and category filtering
     */
    function renderProjects(containerId, filterCategory, featuredOnly, searchQuery = '') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const lang = LanguageManager.getCurrentLang();
        let filtered = projects;

        if (featuredOnly) {
            filtered = filtered.filter(p => p.featured);
        }

        if (filterCategory && filterCategory !== 'All') {
            filtered = filtered.filter(p => p.category === filterCategory);
        }

        if (searchQuery && searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p => {
                const title = p.title.toLowerCase();
                const desc = getLocalizedText(p.description, lang).toLowerCase();
                const cat = p.category.toLowerCase();
                const techs = p.technologies ? p.technologies.join(' ').toLowerCase() : '';
                return title.includes(q) || desc.includes(q) || cat.includes(q) || techs.includes(q);
            });
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="project-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl);">
                    <div style="margin-bottom: 1rem; color: var(--text-muted);">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">${lang === 'tr' ? 'Aradığınız kriterlere uygun proje bulunamadı' : 'No projects found matching your criteria'}</h3>
                    <p style="color: var(--text-muted); font-size: 0.92rem; max-width: 420px; margin: 0 auto;">${lang === 'tr' ? 'Arama terimini değiştirmeyi veya farklı bir kategori seçmeyi deneyebilirsiniz.' : 'Try adjusting your search query or selecting a different category.'}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(project => `
            <article class="card card-accent project-card reveal" data-project-id="${project.id}" tabindex="0" role="button" aria-label="${project.title}" onclick="window.location.href='work-detail.html?id=${project.id}'">
                <div class="project-card-header">
                    <span class="project-card-badge">${project.category}</span>
                    <div class="project-card-arrow" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                </div>
                <h3 class="project-card-title">${project.title}</h3>
                <p class="project-card-desc">${getLocalizedText(project.description, lang)}</p>
                <div class="project-card-techs">
                    ${project.technologies.slice(0, 3).map(t => `<span class="project-tech">${t}</span>`).join('')}
                </div>
                <div class="project-card-footer">
                    <span class="project-view-details">${lang === 'tr' ? 'Detaylar →' : 'Details →'}</span>
                    ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" onclick="event.stopPropagation()" aria-label="GitHub">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>` : ''}
                </div>
            </article>
        `).join('');

        // Bind keyboard events
        container.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = `work-detail.html?id=${encodeURIComponent(card.dataset.projectId)}`;
                }
            });
        });

        // Re-init scroll reveal & 3D tilt for new elements
        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.initScrollReveal();
            AnimationManager.init3DCardTilt();
        }

        // Init slider if container is featured-projects
        if (containerId === 'featured-projects') {
            initProjectsSlider();
        }
    }

    /**
     * Initialize project page filters and search bar
     */
    function initProjectFilters(containerId, filterBarId, searchInputId) {
        const filterBar = document.getElementById(filterBarId);
        const searchInput = document.getElementById(searchInputId);
        let activeCategory = 'All';
        let currentQuery = '';

        function update() {
            renderProjects(containerId, activeCategory, false, currentQuery);
        }

        if (filterBar) {
            const buttons = filterBar.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeCategory = btn.dataset.filter || 'All';
                    update();
                });
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentQuery = e.target.value;
                update();
            });
        }
    }

    /**
     * Initialize Interactive Drag & Arrow Slider for Featured Projects
     */
    function initProjectsSlider() {
        const viewport = document.getElementById('projects-slider-viewport');
        const prevBtn = document.getElementById('projects-slider-prev');
        const nextBtn = document.getElementById('projects-slider-next');

        if (!viewport) return;

        if (prevBtn && !prevBtn._hasBound) {
            prevBtn._hasBound = true;
            prevBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: -360, behavior: 'smooth' });
            });
        }

        if (nextBtn && !nextBtn._hasBound) {
            nextBtn._hasBound = true;
            nextBtn.addEventListener('click', () => {
                viewport.scrollBy({ left: 360, behavior: 'smooth' });
            });
        }

        // Drag to scroll functionality
        if (!viewport._hasDrag) {
            viewport._hasDrag = true;
            let isDown = false;
            let startX;
            let scrollLeft;
            let hasMoved = false;

            viewport.addEventListener('mousedown', (e) => {
                isDown = true;
                hasMoved = false;
                viewport.classList.add('is-dragging');
                startX = e.pageX - viewport.offsetLeft;
                scrollLeft = viewport.scrollLeft;
            });

            viewport.addEventListener('mouseleave', () => {
                isDown = false;
                viewport.classList.remove('is-dragging');
            });

            viewport.addEventListener('mouseup', () => {
                isDown = false;
                setTimeout(() => {
                    viewport.classList.remove('is-dragging');
                }, 50);
            });

            viewport.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                const x = e.pageX - viewport.offsetLeft;
                const walk = (x - startX) * 1.5;
                if (Math.abs(walk) > 5) {
                    hasMoved = true;
                }
                viewport.scrollLeft = scrollLeft - walk;
            });

            // Prevent modal click if user was dragging
            viewport.addEventListener('click', (e) => {
                if (hasMoved) {
                    e.stopPropagation();
                }
            }, true);
        }
    }

    /**
     * Open project detail modal safely with full data binding
     */
    function openProjectModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const lang = LanguageManager.getCurrentLang();
        const overlay = document.getElementById('project-modal');
        if (!overlay) return;

        const catEl = overlay.querySelector('.modal-category');
        const titleEl = overlay.querySelector('.modal h2');
        const descEl = overlay.querySelector('[data-modal="description"]');
        const problemEl = overlay.querySelector('[data-modal="problem"]');
        const solutionEl = overlay.querySelector('[data-modal="solution"]');
        const featuresEl = overlay.querySelector('[data-modal="features"]');
        const techsEl = overlay.querySelector('[data-modal="technologies"], .modal-techs');
        const linksEl = overlay.querySelector('[data-modal="links"], .modal-buttons');

        if (catEl) catEl.textContent = project.category;
        if (titleEl) titleEl.textContent = project.title;

        if (descEl) {
            descEl.innerHTML = `<p>${getLocalizedText(project.description, lang)}</p>`;
        }

        if (problemEl) {
            problemEl.innerHTML = `
                <h4 data-i18n="modalProblem">${LanguageManager.t('modalProblem')}</h4>
                <p>${getLocalizedText(project.problem, lang)}</p>
            `;
        }

        if (solutionEl) {
            solutionEl.innerHTML = `
                <h4 data-i18n="modalSolution">${LanguageManager.t('modalSolution')}</h4>
                <p>${getLocalizedText(project.solution, lang)}</p>
            `;
        }

        if (featuresEl) {
            const features = getLocalizedText(project.features, lang);
            const featuresList = Array.isArray(features)
                ? features.map(f => `<li>${f}</li>`).join('')
                : '';
            featuresEl.innerHTML = `
                <h4 data-i18n="modalFeatures">${LanguageManager.t('modalFeatures')}</h4>
                <ul>${featuresList}</ul>
            `;
        }

        if (techsEl) {
            techsEl.innerHTML = `
                <h4 data-i18n="modalTechnologies" style="margin-bottom: 8px;">${LanguageManager.t('modalTechnologies')}</h4>
                <div class="project-card-techs">
                    ${project.technologies.map(t => `<span class="project-tech">${t}</span>`).join('')}
                </div>
            `;
        }

        if (linksEl) {
            linksEl.innerHTML = `
                ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                </a>` : ''}
                ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    ${LanguageManager.t('modalDemo')}
                </a>` : ''}
            `;
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus trap
        const closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    }

    /**
     * Close project detail modal
     */
    function closeProjectModal() {
        const overlay = document.getElementById('project-modal');
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Bind modal close events
     */
    function bindModalEvents() {
        const overlay = document.getElementById('project-modal');
        if (!overlay) return;

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.closest('.modal-close')) {
                closeProjectModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    /**
     * Render dynamic project detail page (work-detail.html)
     */
    function renderProjectDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        const lang = LanguageManager.getCurrentLang();

        const titleEl = document.getElementById('work-title');
        const descEl = document.getElementById('work-description');
        const catEl = document.getElementById('work-category');
        const problemBodyEl = document.getElementById('work-problem-body');
        const solutionBodyEl = document.getElementById('work-solution-body');
        const featuresListEl = document.getElementById('work-features-list');
        const techsContainerEl = document.getElementById('work-techs-container');
        const githubBtnEl = document.getElementById('work-github-btn');
        const demoBtnEl = document.getElementById('work-demo-btn');
        const relatedContainer = document.getElementById('related-projects');

        if (!titleEl) return; // Not on work-detail.html

        const project = projects.find(p => p.id === projectId);

        if (!project) {
            // Fallback / Not Found State
            document.title = (lang === 'tr' ? 'Proje Bulunamadı' : 'Project Not Found') + ' — Yusuf Ali Aşkın';
            if (catEl) catEl.textContent = '404';
            titleEl.textContent = lang === 'tr' ? 'Proje Bulunamadı' : 'Project Not Found';
            if (descEl) descEl.textContent = lang === 'tr' ? 'Aradığınız proje mevcut değil veya kaldırılmış olabilir.' : 'The requested project could not be found or has been moved.';
            
            if (problemBodyEl) problemBodyEl.textContent = lang === 'tr' ? 'Kayıtlı sistem detayı bulunamadı.' : 'No system record found.';
            if (solutionBodyEl) solutionBodyEl.textContent = lang === 'tr' ? 'Lütfen projeler listesine geri dönünüz.' : 'Please return to the works catalog.';
            if (featuresListEl) featuresListEl.innerHTML = '';
            if (techsContainerEl) techsContainerEl.innerHTML = '';
            if (githubBtnEl) githubBtnEl.style.display = 'none';
            if (demoBtnEl) demoBtnEl.style.display = 'none';
            return;
        }

        // Populate metadata & content
        document.title = `${project.title} — Yusuf Ali Aşkın`;
        if (catEl) catEl.textContent = project.category;
        if (titleEl) titleEl.textContent = project.title;
        if (descEl) descEl.textContent = getLocalizedText(project.description, lang);
        if (problemBodyEl) problemBodyEl.textContent = getLocalizedText(project.problem, lang);
        if (solutionBodyEl) solutionBodyEl.textContent = getLocalizedText(project.solution, lang);

        // Populate Key Features
        if (featuresListEl) {
            const feats = getLocalizedArray(project.features, lang);
            if (feats.length > 0) {
                featuresListEl.innerHTML = feats.map(f => `
                    <div class="work-feature-item">
                        <span class="work-feature-bullet">✦</span>
                        <span>${f}</span>
                    </div>
                `).join('');
                if (featuresListEl.closest('.work-features-card')) {
                    featuresListEl.closest('.work-features-card').style.display = 'block';
                }
            } else if (featuresListEl.closest('.work-features-card')) {
                featuresListEl.closest('.work-features-card').style.display = 'none';
            }
        }

        // Populate Techs
        if (techsContainerEl) {
            techsContainerEl.innerHTML = project.technologies.map(tech => `
                <span class="work-tech-pill">${tech}</span>
            `).join('');
        }

        // Populate Action Buttons
        if (githubBtnEl) {
            if (project.github) {
                githubBtnEl.href = project.github;
                githubBtnEl.style.display = 'inline-flex';
            } else {
                githubBtnEl.style.display = 'none';
            }
        }

        if (demoBtnEl) {
            if (project.demo) {
                demoBtnEl.href = project.demo;
                demoBtnEl.style.display = 'inline-flex';
            } else {
                demoBtnEl.style.display = 'none';
            }
        }

        // Populate Related Projects (exclude current)
        if (relatedContainer) {
            const related = projects.filter(p => p.id !== project.id).slice(0, 3);
            relatedContainer.innerHTML = related.map(rel => `
                <article class="card card-accent project-card reveal" data-project-id="${rel.id}" tabindex="0" role="button" aria-label="${rel.title}" onclick="window.location.href='work-detail.html?id=${rel.id}'">
                    <div class="project-card-header">
                        <span class="project-card-badge">${rel.category}</span>
                        <div class="project-card-arrow" aria-hidden="true">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </div>
                    </div>
                    <h3 class="project-card-title">${rel.title}</h3>
                    <p class="project-card-desc">${getLocalizedText(rel.description, lang)}</p>
                    <div class="project-card-techs">
                        ${rel.technologies.slice(0, 3).map(t => `<span class="project-tech">${t}</span>`).join('')}
                    </div>
                    <div class="project-card-footer">
                        <span class="project-view-details">${lang === 'tr' ? 'Detaylar →' : 'Details →'}</span>
                        ${rel.github ? `<a href="${rel.github}" target="_blank" rel="noopener noreferrer" class="project-icon-btn" onclick="event.stopPropagation()" aria-label="GitHub">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>` : ''}
                    </div>
                </article>
            `).join('');
        }

        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.initScrollReveal();
            AnimationManager.init3DCardTilt();
        }
    }

    /**
     * Render blog posts into a container with search and category filtering
     */
    function renderBlogPosts(containerId, filterCategory, limit, searchQuery = '') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const lang = LanguageManager.getCurrentLang();
        let filtered = blogPosts;

        if (filterCategory && filterCategory !== 'All') {
            filtered = filtered.filter(p => p.category === filterCategory);
        }

        if (searchQuery && searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p => {
                const title = getLocalizedText(p.title, lang).toLowerCase();
                const desc = getLocalizedText(p.description, lang).toLowerCase();
                const cat = p.category.toLowerCase();
                return title.includes(q) || desc.includes(q) || cat.includes(q);
            });
        }

        if (limit) {
            filtered = filtered.slice(0, limit);
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="blog-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl);">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.7;">🔍</div>
                    <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">${lang === 'tr' ? 'Aradığınız kriterlere uygun yazı bulunamadı' : 'No articles found matching your criteria'}</h3>
                    <p style="color: var(--text-muted); font-size: 0.92rem; max-width: 420px; margin: 0 auto;">${lang === 'tr' ? 'Arama terimini değiştirmeyi veya farklı bir kategori seçmeyi deneyebilirsiniz.' : 'Try adjusting your search query or selecting a different category.'}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(post => `
            <article class="card card-accent blog-card reveal" tabindex="0" role="button" aria-label="${getLocalizedText(post.title, lang)}" onclick="window.location.href='blog-post.html?id=${post.id}'">
                <div class="blog-card-header">
                    <span class="blog-category-badge">${post.category}</span>
                    <span class="blog-card-date">${formatDate(post.date, lang)}</span>
                </div>
                <h3 class="blog-card-title">${getLocalizedText(post.title, lang)}</h3>
                <p class="blog-card-summary">${getLocalizedText(post.description, lang)}</p>
                <div class="blog-card-footer">
                    <span class="blog-read-time-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        ${post.readTime} ${LanguageManager.t('blogMinRead')}
                    </span>
                    <span class="blog-read-action">
                        ${LanguageManager.t('blogReadMore')}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </span>
                </div>
            </article>
        `).join('');

        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.initScrollReveal();
            AnimationManager.init3DCardTilt();
        }
    }

    /**
     * Format date based on language
     */
    function formatDate(dateStr, lang) {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', options);
    }

    /**
     * Initialize blog page filters and search bar
     */
    function initBlogFilters(containerId, filterBarId, searchInputId) {
        const filterBar = document.getElementById(filterBarId);
        const searchInput = document.getElementById(searchInputId);
        let activeCategory = 'All';
        let currentQuery = '';

        function update() {
            renderBlogPosts(containerId, activeCategory, null, currentQuery);
        }

        if (filterBar) {
            const buttons = filterBar.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeCategory = btn.dataset.filter || 'All';
                    update();
                });
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentQuery = e.target.value;
                update();
            });
        }
    }

    /**
     * Copy code snippet to clipboard with visual feedback
     */
    function copyCode(btn) {
        const pre = btn.closest('.code-block-wrapper').querySelector('pre code');
        if (!pre) return;
        const text = pre.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const original = btn.textContent;
            btn.textContent = LanguageManager.getCurrentLang() === 'tr' ? 'Kopyalandı!' : 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('copied');
            }, 2000);
        });
    }

    /**
     * Brand Image Helper
     */
    function getBrandImageName(issuer, titleText = '') {
        const low = (issuer + ' ' + titleText).toLowerCase();
        if (low.includes('anthropic') || low.includes('claude')) return 'anthropic.svg';
        if (low.includes('azure')) return 'azure.svg';
        if (low.includes('google') || low.includes('gemini') || low.includes('vertex')) return 'googlecloud.svg';
        if (low.includes('cisco')) return 'cisco.svg';
        if (low.includes('btk')) return 'btk.svg';
        if (low.includes('fortinet')) return 'fortinet.svg';
        if (low.includes('udemy')) return 'udemy.svg';
        if (low.includes('flutter') || low.includes('android')) return 'flutter.svg';
        if (low.includes('python')) return 'python.svg';
        return 'googlecloud.svg';
    }

    /**
     * Complete Real Certificates Database with User Brand Logos
     */
    const certificates = [
        /* Anthropic (Agent & Claude) */
        {
            id: 'cert-anthropic-agent',
            title: {
                en: 'Certificate of Completion: Introduction to Agent Skills',
                tr: 'Başarı Sertifikası: Agent Yeteneklerine Giriş'
            },
            issuer: 'Anthropic',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Introduction',
            verifyUrl: 'https://verify.skilljar.com/c/rtvh6o7igd2i',
            image: '',
            skills: ['Claude Agent SDK', 'Anthropic Claude', 'Agentic Workflows', 'Tool Integration']
        },
        {
            id: 'cert-anthropic-vertex',
            title: {
                en: 'Claude with Google Cloud\'s Vertex AI',
                tr: 'Google Cloud Vertex AI ile Claude Mimarisi'
            },
            issuer: 'Anthropic',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Extended',
            verifyUrl: 'https://verify.skilljar.com/c/dsyw6gqykx2g',
            image: '',
            skills: ['Anthropic Claude', 'Google Vertex AI', 'Claude Agent SDK', 'Enterprise AI']
        },
        {
            id: 'cert-anthropic-101',
            title: {
                en: 'Certificate of Completion: Claude 101',
                tr: 'Başarı Sertifikası: Claude 101'
            },
            issuer: 'Anthropic',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Introduction',
            verifyUrl: 'https://verify.skilljar.com/c/yuanenjmxxyk',
            image: '',
            skills: ['Anthropic Claude', 'Prompt Engineering', 'LLM Capabilities', 'Claude Becerileri']
        },

        /* BTK Akademi */
        {
            id: 'cert-btk-azure-devops',
            title: {
                en: 'Microsoft Azure DevOps & CI/CD Pipelines',
                tr: 'Microsoft Azure DevOps & CI/CD Boru Hatları'
            },
            issuer: 'BTK Akademi',
            category: 'Cloud',
            date: 'Şub 2026',
            level: 'İleri Seviye',
            verifyUrl: '',
            image: '',
            skills: ['Azure DevOps', 'Microsoft Entra ID', 'CI/CD Pipelines', 'Cloud Security']
        },
        {
            id: 'cert-btk-cyber-intro',
            title: {
                en: 'Siber Güvenliğe Giriş & Tehdit Analizi',
                tr: 'Siber Güvenliğe Giriş & Tehdit Analizi'
            },
            issuer: 'BTK Akademi',
            category: 'Cybersecurity',
            date: 'Kas 2024',
            level: 'Introduction',
            verifyUrl: '',
            image: '',
            skills: ['Siber Güvenlik', 'Bilgi Güvenliği', 'Ağ Güvenliği', 'Tehdit Analizi']
        },
        {
            id: 'cert-btk-adv-net',
            title: {
                en: 'İleri Ağ Teknolojileri & Altyapı Yönetimi',
                tr: 'İleri Ağ Teknolojileri & Altyapı Yönetimi'
            },
            issuer: 'BTK Akademi',
            category: 'Networking',
            date: 'Oca 2026',
            level: 'İleri Seviye',
            verifyUrl: '',
            image: '',
            skills: ['Ağ Güvenliği', 'Ağ Sistemleri', 'VLAN', 'Routing & Switching']
        },
        {
            id: 'cert-btk-adv-python',
            title: {
                en: 'İleri Seviye Python Programlama Dili',
                tr: 'İleri Seviye Python Programlama Dili'
            },
            issuer: 'BTK Akademi',
            category: 'Software',
            date: 'Şub 2026',
            level: 'İleri Seviye',
            verifyUrl: '',
            image: '',
            skills: ['Python', 'Yazılım Geliştirme', 'OOP', 'Otomasyon']
        },

        /* Google Cloud Security & Developers */
        {
            id: 'cert-google-resp-ai',
            title: {
                en: 'Introduction to Responsible Artificial Intelligence',
                tr: 'Sorumlu Yapay Zekaya Giriş (Responsible AI)'
            },
            issuer: 'Google Cloud Security',
            category: 'AI',
            date: 'Şub 2026',
            level: 'Introduction',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22793928',
            image: '',
            skills: ['Responsible AI', 'AI Ethics', 'Model Governance', 'Safety Controls']
        },
        {
            id: 'cert-google-image-gen',
            title: {
                en: 'Introduction to Image Generation',
                tr: 'Yapay Zeka Görüntü Üretimine Giriş'
            },
            issuer: 'Google Cloud Security',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Introduction',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22794009',
            image: '',
            skills: ['Görüntü Düzenleme', 'Diffusion Models', 'Computer Vision']
        },
        {
            id: 'cert-google-encoder-decoder',
            title: {
                en: 'Encoder-Decoder Architecture',
                tr: 'Encoder-Decoder Sinir Ağı Mimarisi'
            },
            issuer: 'Google Cloud Security',
            category: 'AI',
            date: 'Eyl 2025',
            level: 'Intermediate',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22794070',
            image: '',
            skills: ['Neural Networks', 'Transformer Model', 'Seq2Seq', 'Deep Learning']
        },
        {
            id: 'cert-google-modernize-infra',
            title: {
                en: 'Modernize Infrastructure and Applications with Google Cloud',
                tr: 'Google Cloud ile Altyapı ve Uygulama Modernizasyonu'
            },
            issuer: 'Google Cloud Security',
            category: 'Cloud',
            date: 'Eki 2025',
            level: 'Extended',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22794172',
            image: '',
            skills: ['Google Cloud Platform', 'Cloud Modernization', 'Kubernetes', 'App Engine']
        },
        {
            id: 'cert-google-data-transform',
            title: {
                en: 'Exploring Data Transformation with Google Cloud',
                tr: 'Google Cloud ile Veri Dönüşümü ve Analitiği'
            },
            issuer: 'Google Cloud Security',
            category: 'Cloud',
            date: 'Şub 2026',
            level: 'Intermediate',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22794359',
            image: '',
            skills: ['BigQuery', 'Data Pipelines', 'ETL Processes', 'Data Analytics']
        },
        {
            id: 'cert-google-cloud-identity',
            title: {
                en: 'Introduction to Cloud Identity & Access Security',
                tr: 'Bulut Kimlik ve Erişim Güvenliğine Giriş'
            },
            issuer: 'Google Cloud Security',
            category: 'Cybersecurity',
            date: 'Oca 2026',
            level: 'Introduction',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22799264',
            image: '',
            skills: ['Cloud Identity', 'IAM & MFA', 'Zero-Trust Security', 'Access Management']
        },
        {
            id: 'cert-google-sql',
            title: {
                en: 'Introduction to SQL Database Architecture',
                tr: 'SQL Veritabanı Mimarisine Giriş'
            },
            issuer: 'Google for Developers',
            category: 'Software',
            date: 'Mar 2026',
            level: 'Intermediate',
            verifyUrl: '',
            image: '',
            skills: ['SQL', 'Relational Databases', 'Schema Modeling', 'Query Optimization']
        },
        {
            id: 'cert-flutter',
            title: {
                en: 'Build Apps with Flutter Framework',
                tr: 'Flutter ile Çapraz Platform Uygulama Geliştirme'
            },
            issuer: 'Android Studio Solutions',
            category: 'Software',
            date: 'Şub 2026',
            level: 'Introduction',
            verifyUrl: '',
            image: '',
            skills: ['Flutter', 'Dart', 'Mobile App Development', 'UI/UX']
        },
        {
            id: 'cert-firebase-emulators',
            title: {
                en: 'Firebase Emulators & Serverless Architecture',
                tr: 'Firebase Emülatörleri ve Sunucusuz Mimari'
            },
            issuer: 'Google for Developers',
            category: 'Cloud',
            date: 'Oca 2026',
            level: 'Introduction',
            verifyUrl: '',
            image: '',
            skills: ['Firebase Suite', 'Local Emulators', 'Cloud Functions', 'Firestore']
        },
        {
            id: 'cert-google-cloud-sec-eng',
            title: {
                en: 'Preparing for Professional Cloud Security Engineer Journey',
                tr: 'Profesyonel Bulut Güvenliği Mühendisliği'
            },
            issuer: 'Google Cloud Security',
            category: 'Cybersecurity',
            date: 'Mar 2026',
            level: 'Intermediate',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22770472',
            image: '',
            skills: ['Cloud Security Engineering', 'VPC Firewalls', 'KMS Encryption', 'SecOps']
        },
        {
            id: 'cert-google-gen-ai',
            title: {
                en: 'Introduction to Generative AI Foundations',
                tr: 'Üretken Yapay Zeka Temellerine Giriş'
            },
            issuer: 'Google Cloud Security',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Introduction',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22768464',
            image: '',
            skills: ['Generative AI', 'Model Architectures', 'Google AI Ecosystem']
        },
        {
            id: 'cert-google-llm',
            title: {
                en: 'Introduction to Large Language Models (LLM)',
                tr: 'Büyük Dil Modellerine (LLM) Giriş'
            },
            issuer: 'Google Cloud Security',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Introduction',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22768641',
            image: '',
            skills: ['LLM Architecture', 'Prompt Optimization', 'Context Windows', 'Fine-Tuning']
        },
        {
            id: 'cert-google-mlops-genai',
            title: {
                en: 'MLOps for Generative Artificial Intelligence',
                tr: 'Üretken Yapay Zeka için MLOps Boru Hatları'
            },
            issuer: 'Google Cloud Security',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Extended',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22768691',
            image: '',
            skills: ['MLOps', 'Vertex AI Pipelines', 'Model CI/CD', 'Drift Monitoring']
        },
        {
            id: 'cert-google-mlops-eval',
            title: {
                en: 'MLOps with Vertex AI: Model Evaluation',
                tr: 'Vertex AI ile MLOps: Model Değerlendirme'
            },
            issuer: 'Google Cloud Security',
            category: 'AI',
            date: 'Mar 2026',
            level: 'Introduction',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22768829',
            image: '',
            skills: ['Model Evaluation', 'Vertex AI', 'Benchmarking Metrics', 'Model QA']
        },
        {
            id: 'cert-google-gemini-sec',
            title: {
                en: 'Gemini for Security Engineers',
                tr: 'Güvenlik Mühendisleri için Google Gemini'
            },
            issuer: 'Google Cloud Security',
            category: 'Cybersecurity',
            date: 'Mar 2026',
            level: 'Intermediate',
            verifyUrl: 'https://www.skills.google/public_profiles/238a380c-bb5a-41b5-aaef-7f7390bb65fc/badges/22768909',
            image: '',
            skills: ['Google Gemini SecOps', 'Threat Intelligence', 'Automated Triage', 'Security Workflows']
        },

        /* Fortinet */
        {
            id: 'cert-fortinet-fcf',
            title: {
                en: 'FCF - Introduction to the Threat Landscape 2.0',
                tr: 'FCF - Siber Tehdit Ortamına Giriş 2.0'
            },
            issuer: 'Fortinet',
            category: 'Cybersecurity',
            date: 'Nis 2025',
            level: 'Introduction',
            verifyUrl: 'https://training.fortinet.com/mod/customcert/view.php?id=482931&downloadown=1',
            image: '',
            skills: ['Siber Güvenlik', 'Kötü Amaçlı Yazılım Analizi', 'Fortinet UTM', 'Threat Intelligence']
        },

        /* Udemy */
        {
            id: 'cert-udemy-kali',
            title: {
                en: 'Kali Linux ile Kapsamlı Sızma Testleri',
                tr: 'Kali Linux ile Kapsamlı Sızma Testleri'
            },
            issuer: 'Udemy',
            category: 'Cybersecurity',
            date: 'Ağu 2024',
            level: 'İleri Seviye',
            verifyUrl: 'https://www.udemy.com/certificate/UC-7339b2bc-cd36-4f3d-a979-14bea6888ea0/',
            image: '',
            skills: ['Kali Linux', 'Penetration Testing', 'Nmap & Metasploit', 'Vulnerability Assessment']
        },

        /* Cisco & Cisco Networking Academy */
        {
            id: 'cert-cisco-ccnav7-intro',
            title: {
                en: 'CCNAv7: Introduction to Networks',
                tr: 'CCNAv7: Ağ Sistemlerine Giriş'
            },
            issuer: 'Cisco',
            category: 'Networking',
            date: 'Nis 2023',
            level: 'İleri Seviye',
            verifyUrl: 'https://www.netacad.com/certificates?issuanceId=ca40be64-6d8b-441e-b823-37019fea8e85',
            image: '',
            skills: ['OSI & TCP/IP Model', 'IPv4/IPv6 Subnetting', 'Cisco IOS', 'Router/Switch Config']
        },
        {
            id: 'cert-cisco-ccna-srwe',
            title: {
                en: 'CCNA: Switching, Routing, and Wireless Essentials',
                tr: 'CCNA: Anahtarlama, Yönlendirme ve Kablosuz Ağ Temelleri'
            },
            issuer: 'Cisco Networking Academy',
            category: 'Networking',
            date: 'Haz 2023',
            level: 'İleri Seviye',
            verifyUrl: 'https://www.netacad.com/certificates?issuanceId=149d5635-9f56-49d1-a40f-f216f7136b10',
            image: '',
            skills: ['VLAN & Inter-VLAN', 'STP & EtherChannel', 'WLAN Security', 'OSPF Routing']
        },
        {
            id: 'cert-cisco-intro-cyber',
            title: {
                en: 'Introduction to Cybersecurity Fundamentals',
                tr: 'Siber Güvenlik Temellerine Giriş'
            },
            issuer: 'Cisco Networking Academy',
            category: 'Cybersecurity',
            date: 'Eki 2022',
            level: 'İleri Seviye',
            verifyUrl: 'https://www.netacad.com/certificates?issuanceId=64761c8d-4bbe-4b6e-b393-b2f7aaa1c00a',
            image: '',
            skills: ['Cyber Defense', 'Security Governance', 'Cryptography', 'Risk Management']
        },
        {
            id: 'cert-cisco-cyber-essentials',
            title: {
                en: 'Cybersecurity Essentials',
                tr: 'Siber Güvenlik Esasları'
            },
            issuer: 'Cisco Networking Academy',
            category: 'Cybersecurity',
            date: 'Kas 2022',
            level: 'Temel Seviye',
            verifyUrl: 'https://www.netacad.com/certificates?issuanceId=c52663b8-566c-49aa-bda6-ea1cee3add55',
            image: '',
            skills: ['Firewall Design', 'Access Control', 'Confidentiality & Integrity', 'SecOps']
        },
        {
            id: 'cert-cisco-pcap-python',
            title: {
                en: 'Partner: PCAP - Programming Essentials in Python',
                tr: 'PCAP - Python Programlama Esasları'
            },
            issuer: 'Cisco Networking Academy',
            category: 'Software',
            date: 'Eki 2022',
            level: 'Temel Seviye',
            verifyUrl: 'https://www.netacad.com/certificates?issuanceId=72bd5e31-8a63-4918-be70-7a87c8bd7589',
            image: '',
            skills: ['Python Fundamentals', 'Data Structures', 'Modules & Packages', 'Automation']
        },
        {
            id: 'cert-cisco-ndg-essentials',
            title: {
                en: 'Partner: NDG Linux Essentials',
                tr: 'NDG Linux Temelleri ve Sistem Yönetimi'
            },
            issuer: 'Cisco Networking Academy',
            category: 'Software',
            date: 'Haz 2023',
            level: 'Temel Seviye',
            verifyUrl: 'https://www.netacad.com/certificates?issuanceId=63994cbd-1279-45cc-8937-831ff7f74b2f',
            image: '',
            skills: ['Linux CLI', 'User & Group Permissions', 'Package Management', 'Bash Shell']
        },
        {
            id: 'cert-cisco-ndg-unhatched',
            title: {
                en: 'Partner: NDG Linux Unhatched',
                tr: 'NDG Linux Başlangıç Eğitimi'
            },
            issuer: 'Cisco Networking Academy',
            category: 'Software',
            date: 'Haz 2023',
            level: 'İleri Seviye',
            verifyUrl: 'https://www.netacad.com/certificates?issuanceId=354211c9-a11e-4970-85f2-d44f10bfdd25',
            image: '',
            skills: ['Linux Commands', 'Filesystem Operations', 'Shell Navigation']
        }
    ];

    /**
     * Render photo-centric certificate cards into grid container
     */
    function renderCertificates(containerId, filterCategory, searchQuery = '') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const lang = LanguageManager.getCurrentLang();
        let filtered = certificates;

        if (filterCategory && filterCategory !== 'All') {
            filtered = filtered.filter(c => c.category === filterCategory);
        }

        if (searchQuery && searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(c => {
                const title = getLocalizedText(c.title, lang).toLowerCase();
                const issuer = c.issuer.toLowerCase();
                const skills = c.skills.join(' ').toLowerCase();
                return title.includes(q) || issuer.includes(q) || skills.includes(q);
            });
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="project-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl);">
                    <div style="margin-bottom: 0.75rem; color: var(--text-muted);">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <h3 style="margin-bottom: 0.4rem; font-size: 1.15rem;">${lang === 'tr' ? 'Bu kategoride sertifika bulunamadı' : 'No certificates found'}</h3>
                    <p style="color: var(--text-muted); font-size: 0.88rem;">${lang === 'tr' ? 'Farklı bir filtre seçmeyi deneyebilirsiniz.' : 'Try selecting a different filter.'}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(cert => {
            const logoSrc = `assets/images/brands/${getBrandImageName(cert.issuer, cert.title.en)}`;
            const certImg = cert.image || 'assets/images/zkbank.png';
            const title = getLocalizedText(cert.title, lang);

            return `
                <article class="card card-accent cert-photo-card reveal" tabindex="0" role="button" aria-label="${title}" onclick="window.location.href='certificate-detail.html?id=${cert.id}'">
                    <div class="cert-photo-frame">
                        <img src="${certImg}" alt="${title}" class="cert-photo-img" loading="lazy">
                        <div class="cert-photo-overlay">
                            <span class="cert-zoom-btn">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                <span>${lang === 'tr' ? 'Detayları İncele →' : 'View Details →'}</span>
                            </span>
                        </div>
                    </div>
                    <div class="cert-photo-info">
                        <div class="cert-company-row">
                            <span class="cert-company-logo-frame">
                                <img src="${logoSrc}" alt="${cert.issuer}" class="cert-company-logo-img">
                            </span>
                            <span class="cert-company-name-label">${cert.issuer}</span>
                        </div>
                        <h3 class="cert-photo-title">${title}</h3>
                    </div>
                </article>
            `;
        }).join('');

        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.initScrollReveal();
            AnimationManager.init3DCardTilt();
        }
    }

    /**
     * Initialize certificates filters
     */
    function initCertFilters(containerId, filterBarId, searchInputId) {
        const filterBar = document.getElementById(filterBarId);
        const searchInput = document.getElementById(searchInputId);
        let activeCategory = 'All';
        let currentQuery = '';

        function update() {
            renderCertificates(containerId, activeCategory, currentQuery);
        }

        if (filterBar) {
            const buttons = filterBar.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeCategory = btn.dataset.filter || 'All';
                    update();
                });
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentQuery = e.target.value;
                update();
            });
        }
    }

    /**
     * Render Certificate Detail Page (certificate-detail.html)
     */
    function renderCertificateDetail() {
        const params = new URLSearchParams(window.location.search);
        const certId = params.get('id');

        if (!certId) {
            window.location.href = 'certificates.html';
            return;
        }

        const cert = certificates.find(c => c.id === certId);
        if (!cert) {
            window.location.href = 'certificates.html';
            return;
        }

        const lang = LanguageManager.getCurrentLang();
        const title = getLocalizedText(cert.title, lang);
        const badgeClass = cert.issuer.split(' ')[0].toLowerCase();
        const logoSrc = `assets/images/brands/${getBrandImageName(cert.issuer, cert.title.en)}`;
        const certImg = cert.image || 'assets/images/zkbank.png';

        // Page Title
        document.title = `${title} — Yusuf Ali Aşkın`;

        // Update elements
        const titleEl = document.getElementById('cert-title');
        const issuerBadgeEl = document.getElementById('cert-issuer-badge');
        const levelBadgeEl = document.getElementById('cert-level-badge');
        const leadDescEl = document.getElementById('cert-lead-desc');
        const imgEl = document.getElementById('cert-image');
        const verifyBtn = document.getElementById('cert-verify-btn');

        const specIssuer = document.getElementById('cert-spec-issuer');
        const specCategory = document.getElementById('cert-spec-category');
        const specDate = document.getElementById('cert-spec-date');
        const specLevel = document.getElementById('cert-spec-level');
        const skillsList = document.getElementById('cert-skills-list');

        if (titleEl) titleEl.textContent = title;
        if (issuerBadgeEl) {
            issuerBadgeEl.innerHTML = `
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                    <img src="${logoSrc}" alt="${cert.issuer}" style="width: 16px; height: 16px; object-fit: contain;">
                    <span>${cert.issuer}</span>
                </span>
            `;
            issuerBadgeEl.className = `work-category-badge cert-badge-${badgeClass}`;
        }
        if (levelBadgeEl) levelBadgeEl.textContent = cert.level || 'Certified';
        if (leadDescEl) {
            leadDescEl.textContent = lang === 'tr'
                ? `${cert.issuer} tarafından yetkilendirilen, ${cert.category} mühendislik disiplini altındaki resmi başarı sertifikası.`
                : `Official technical credential and competency certification authorized by ${cert.issuer} in the ${cert.category} engineering domain.`;
        }

        if (imgEl) {
            imgEl.src = certImg;
            imgEl.alt = title;
        }

        if (verifyBtn) {
            if (cert.verifyUrl) {
                verifyBtn.href = cert.verifyUrl;
                verifyBtn.style.display = 'inline-flex';
            } else {
                verifyBtn.style.display = 'none';
            }
        }

        if (specIssuer) {
            specIssuer.innerHTML = `
                <div style="display: inline-flex; align-items: center; gap: 8px;">
                    <span class="cert-company-logo-frame" style="width: 22px; height: 22px; padding: 2px;">
                        <img src="${logoSrc}" alt="${cert.issuer}" class="cert-company-logo-img">
                    </span>
                    <span>${cert.issuer}</span>
                </div>
            `;
        }
        if (specCategory) specCategory.textContent = cert.category;
        if (specDate) specDate.textContent = cert.date;
        if (specLevel) specLevel.textContent = cert.level || 'Certified';

        if (skillsList) {
            skillsList.innerHTML = cert.skills.map(s => `<span class="work-tech-pill">${s}</span>`).join('');
        }

        // Render Related Certs
        const relatedContainer = document.getElementById('related-certs-grid');
        if (relatedContainer) {
            const related = certificates.filter(c => c.id !== cert.id && (c.category === cert.category || c.issuer === cert.issuer)).slice(0, 3);
            relatedContainer.innerHTML = related.map(rc => {
                const rcLogo = `assets/images/brands/${getBrandImageName(rc.issuer, rc.title.en)}`;
                const rcImg = rc.image || 'assets/images/zkbank.png';
                const rcTitle = getLocalizedText(rc.title, lang);
                return `
                    <article class="card card-accent cert-photo-card reveal" tabindex="0" role="button" aria-label="${rcTitle}" onclick="window.location.href='certificate-detail.html?id=${rc.id}'">
                        <div class="cert-photo-frame">
                            <img src="${rcImg}" alt="${rcTitle}" class="cert-photo-img" loading="lazy">
                            <div class="cert-photo-overlay">
                                <span class="cert-zoom-btn">
                                    <span>${lang === 'tr' ? 'Detayları İncele →' : 'View Details →'}</span>
                                </span>
                            </div>
                        </div>
                        <div class="cert-photo-info">
                            <div class="cert-company-row">
                                <span class="cert-company-logo-frame">
                                    <img src="${rcLogo}" alt="${rc.issuer}" class="cert-company-logo-img">
                                </span>
                                <span class="cert-company-name-label">${rc.issuer}</span>
                            </div>
                            <h3 class="cert-photo-title">${rcTitle}</h3>
                        </div>
                    </article>
                `;
            }).join('');
        }

        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.initScrollReveal();
            AnimationManager.init3DCardTilt();
        }
    }

    /**
     * Open Certificate Detail / Modal
     */
    function openCertModal(certId) {
        window.location.href = `certificate-detail.html?id=${certId}`;
    }

    /**
     * Close Certificate Zoom Modal
     */
    function closeCertModal() {
        const modal = document.getElementById('cert-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Open Interactive CV Modal
     */
    function openCVModal() {
        const lang = LanguageManager.getCurrentLang();
        let modal = document.getElementById('cv-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'cv-modal';
            modal.className = 'cv-preview-modal';
            modal.innerHTML = `
                <div class="cv-modal-box">
                    <button class="modal-close-round" onclick="ProjectsManager.closeCVModal()" aria-label="Close">✕</button>
                    <div class="cv-modal-content-area"></div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeCVModal();
            });
        }

        const area = modal.querySelector('.cv-modal-content-area');
        if (area) {
            area.innerHTML = `
                <div class="cv-header-strip">
                    <div>
                        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">YUSUF ALİ AŞKIN</h2>
                        <p style="color: var(--text-accent); font-weight: 600; font-size: 0.95rem;">${lang === 'tr' ? 'Senior Software Developer & AI Solutions' : 'Senior Software Developer & AI Solutions'}</p>
                        <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">📍 İstanbul, Türkiye • ✉️ yusufaliaskin@gmail.com • 📞 +90 537 024 85 28</p>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <a href="assets/docs/Yusuf_Ali_Askin_CV.pdf" download="Yusuf_Ali_Askin_CV.pdf" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            ${lang === 'tr' ? 'Orijinal PDF CV İndir' : 'Download Original PDF CV'}
                        </a>
                        <button class="btn btn-secondary" onclick="window.print()">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                            ${lang === 'tr' ? 'Yazdır' : 'Print'}
                        </button>
                    </div>
                </div>

                <div class="cv-preview-body">
                    <!-- About Summary -->
                    <div class="cv-section-block">
                        <p style="font-size: 0.92rem; line-height: 1.65; color: var(--text-secondary); background: var(--bg-tertiary); padding: 12px 16px; border-radius: var(--radius-md); border-left: 3px solid var(--accent); margin-bottom: 1.25rem;">
                            ${lang === 'tr' 
                                ? 'Siber güvenlik, ağ sistemleri ve yazılım geliştirme alanlarında kendisini sürekli geliştiren, proje odaklı yazılım geliştirici. Python, web teknolojileri, ağ analizi, güvenlik duvarı mimarileri ve otomasyon sistemleri üzerinde uzmanlaşmıştır.'
                                : 'A project-oriented software developer continuously improving in cybersecurity, network systems, and software engineering. Specialized in Python, web technologies, network analysis, firewall architectures, and automation systems.'}
                        </p>
                    </div>

                    <div class="cv-section-block">
                        <h3>💼 ${LanguageManager.t('cvSectionExp')}</h3>
                        
                        <div style="margin-bottom: 1.25rem; border-left: 2px solid var(--accent); padding-left: 14px;">
                            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); align-items: center;">
                                <span>🚀 Senior Software Engineer Team Lead — AtlasCode AI &amp; LLM</span>
                                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${lang === 'tr' ? '2025 - Devam Ediyor • Uzaktan' : '2025 - Present • Remote'}</span>
                            </div>
                            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
                                ${lang === 'tr' ? 'Geliştirici üretkenliğini artıran yapay zeka destekli komut satırı kodlama asistanı AtlasCode\'un mimari liderliği, LLM entegrasyonu, kod üretimi, hata ayıklama ve iş akışı otomasyonu.' : 'Leading architecture and development of AtlasCode, an AI-driven command-line coding assistant featuring project analysis, code generation, LLM integration, and workflow automation.'}
                            </p>
                        </div>

                        <div style="margin-bottom: 1.25rem; border-left: 2px solid var(--accent); padding-left: 14px;">
                            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); align-items: center;">
                                <span style="display: flex; align-items: center; gap: 8px;">
                                    <img src="assets/images/medimarkt.png" alt="MediaMarkt & Saturn" style="width: 22px; height: 22px; object-fit: contain;">
                                    IT Support Specialist — MediaMarkt Saturn
                                </span>
                                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${lang === 'tr' ? '2024 - 2025 • Beşiktaş, İstanbul' : '2024 - 2025 • Beşiktaş, İstanbul'}</span>
                            </div>
                            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
                                ${lang === 'tr' ? 'Windows ve macOS cihazlarda donanım ve yazılım arıza teşhisi, bakım, optimizasyon ve kurumsal performans standartlarının sağlanması.' : 'Diagnosed hardware and software issues on Windows and macOS devices, performed maintenance, optimizations, and technical support.'}
                            </p>
                        </div>

                        <div style="margin-bottom: 1.25rem; border-left: 2px solid var(--accent); padding-left: 14px;">
                            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); align-items: center;">
                                <span style="display: flex; align-items: center; gap: 8px;">
                                    <img src="assets/images/zkbank.png" alt="Ziraat Katılım" style="width: 22px; height: 22px; object-fit: contain;">
                                    Intern — Ziraat Katılım Bank
                                </span>
                                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${lang === 'tr' ? '2023 - 2024 • Ataşehir, İstanbul' : '2023 - 2024 • Ataşehir, İstanbul'}</span>
                            </div>
                            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
                                ${lang === 'tr' ? 'Sunucu güvenliği, sistem tasarımı ve siber güvenlik operasyonları. Linux, Python, Django, HTML, CSS, JavaScript ve Bash mimarileri.' : 'Advances in server security, server system design, cybersecurity, Linux administration, Python, Django, and Bash.'}
                            </p>
                        </div>
                    </div>

                    <div class="cv-section-block">
                        <h3>🎓 ${LanguageManager.t('cvSectionEdu')}</h3>
                        
                        <div style="margin-bottom: 1.25rem; border-left: 2px solid var(--accent); padding-left: 14px;">
                            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); align-items: center;">
                                <span>🏛️ ${lang === 'tr' ? 'Information Security Tech — Zonguldak Bülent Ecevit University' : 'Information Security Tech — Zonguldak Bülent Ecevit University'}</span>
                                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">2025 - 2027</span>
                            </div>
                            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
                                ${lang === 'tr' ? 'Siber güvenlik, ağ güvenliği mimarileri, siber savunma stratejileri ve BEÜN Cyber Team.' : 'Cybersecurity, network security architectures, cyber defense strategies, and BEÜN Cyber Team.'}
                            </p>
                        </div>

                        <div style="margin-bottom: 1.25rem; border-left: 2px solid var(--accent); padding-left: 14px;">
                            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); align-items: center;">
                                <span>🏫 ${lang === 'tr' ? 'Network and Cyber Security — Halil Rıfat Paşa MTAL' : 'Network and Cyber Security — Halil Rıfat Paşa MTAL'}</span>
                                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">2020 - 2024</span>
                            </div>
                            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
                                ${lang === 'tr' ? 'Ağ ve siber güvenlik ihtisas eğitimi, Packet Tracer simülasyonları, sunucu yönetimi ve Active Directory.' : 'Network and cyber security vocational education, Packet Tracer simulations, server management, and Active Directory.'}
                            </p>
                        </div>
                    </div>

                    <div class="cv-section-block">
                        <h3>🏆 ${LanguageManager.t('cvSectionCerts')} (31 Certificates)</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 8px;">
                            <div style="padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                                <strong style="color: var(--text-primary); font-size: 0.84rem; display: block;">Claude 101 &amp; Agent Skills</strong>
                                <span style="font-size: 0.74rem; color: var(--text-muted); font-family: var(--font-mono);">Anthropic • Mar 2026</span>
                            </div>
                            <div style="padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                                <strong style="color: var(--text-primary); font-size: 0.84rem; display: block;">Microsoft Azure DevOps</strong>
                                <span style="font-size: 0.74rem; color: var(--text-muted); font-family: var(--font-mono);">BTK Akademi • Feb 2026</span>
                            </div>
                            <div style="padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                                <strong style="color: var(--text-primary); font-size: 0.84rem; display: block;">Cisco CCNA: Switching &amp; Routing</strong>
                                <span style="font-size: 0.74rem; color: var(--text-muted); font-family: var(--font-mono);">Cisco • Jun 2023</span>
                            </div>
                            <div style="padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                                <strong style="color: var(--text-primary); font-size: 0.84rem; display: block;">Fortinet FCF Threat Landscape</strong>
                                <span style="font-size: 0.74rem; color: var(--text-muted); font-family: var(--font-mono);">Fortinet • Apr 2025</span>
                            </div>
                            <div style="padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                                <strong style="color: var(--text-primary); font-size: 0.84rem; display: block;">Google Cloud Security Engineer</strong>
                                <span style="font-size: 0.74rem; color: var(--text-muted); font-family: var(--font-mono);">Google • Mar 2026</span>
                            </div>
                            <div style="padding: 8px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                                <strong style="color: var(--text-primary); font-size: 0.84rem; display: block;">Penetration Testing with Kali Linux</strong>
                                <span style="font-size: 0.74rem; color: var(--text-muted); font-family: var(--font-mono);">Udemy • Aug 2024</span>
                            </div>
                        </div>
                    </div>

                    <div class="cv-section-block">
                        <h3>🛠️ ${LanguageManager.t('cvSectionSkills')}</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            <span class="work-tech-pill">Python</span>
                            <span class="work-tech-pill">JavaScript / TypeScript</span>
                            <span class="work-tech-pill">HTML / CSS</span>
                            <span class="work-tech-pill">PHP / MySQL</span>
                            <span class="work-tech-pill">React / Node.js</span>
                            <span class="work-tech-pill">Flask &amp; Django</span>
                            <span class="work-tech-pill">Cybersecurity</span>
                            <span class="work-tech-pill">Network Security</span>
                            <span class="work-tech-pill">Firewall Management</span>
                            <span class="work-tech-pill">Git / GitHub</span>
                            <span class="work-tech-pill">Linux / Windows</span>
                        </div>
                    </div>

                    <!-- References & Languages Block -->
                    <div class="cv-section-block" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 16px; margin-top: 1rem;">
                        <div>
                            <h3>👥 ${lang === 'tr' ? 'Referanslar' : 'References'}</h3>
                            <div style="padding: 10px 14px; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                                <strong style="color: var(--text-primary); font-size: 0.9rem;">Suat Toksöz</strong>
                                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 2px 0;">Head of Information Technologies Department — Ziraat Katılım Bank</p>
                                <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-accent);">suat.toksoz@ziraatkatilim.com.tr</span>
                            </div>
                        </div>
                        <div>
                            <h3>🌐 ${lang === 'tr' ? 'Diller' : 'Languages'}</h3>
                            <div style="padding: 10px 14px; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); font-size: 0.82rem; line-height: 1.8;">
                                <div>🇹🇷 <strong>Turkish:</strong> C2 (Native)</div>
                                <div>🇬🇧 <strong>English:</strong> B2 (Professional)</div>
                                <div>🇩🇪 <strong>German:</strong> A1 (Elementary)</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close Interactive CV Modal
     */
    function closeCVModal() {
        const modal = document.getElementById('cv-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Accessor functions
     */
    function getBlogPost(id) {
        return blogPosts.find(p => p.id === id) || null;
    }

    function getBlogPosts() {
        return blogPosts;
    }

    return {
        projects,
        blogPosts,
        certificates,
        getBlogPost,
        getBlogPosts,
        getLocalizedText,
        getLocalizedArray,
        formatDate,
        renderProjects,
        renderProjectDetail,
        renderCertificates,
        renderCertificateDetail,
        initCertFilters,
        openCertModal,
        closeCertModal,
        openCVModal,
        closeCVModal,
        renderBlogPosts,
        initProjectFilters,
        initFilters: initProjectFilters,
        initBlogFilters,
        copyCode,
        bindModalEvents,
        initModal: bindModalEvents,
        openProjectModal,
        closeProjectModal
    };
})();
