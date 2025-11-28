class TanApp {
    constructor() {
        this.cases = JSON.parse(localStorage.getItem('tanApp_cases')) || [];
        if (this.cases.length === 0) {
            this.loadDemoData();
        }
        this.init();
    }

    loadDemoData() {
        const demoCases = [
            {
                id: '101',
                caseNo: '2025/145',
                court: 'İstanbul 12. Aile Mahkemesi',
                client: 'Ayşe Yılmaz',
                opponent: 'Mehmet Yılmaz',
                type: 'aile',
                status: 'active',
                filingDate: '2025-05-10',
                hearingDate: '2025-12-15T10:00',
                description: 'Çekişmeli boşanma davası, velayet talepli.',
                createdAt: new Date().toISOString()
            },
            {
                id: '102',
                caseNo: '2025/89',
                court: 'Ankara 5. İş Mahkemesi',
                client: 'Ahmet Demir',
                opponent: 'ABC İnşaat Ltd. Şti.',
                type: 'is',
                status: 'active',
                filingDate: '2025-03-12',
                hearingDate: '2025-11-29T14:30',
                description: 'İşe iade ve kıdem tazminatı talebi.',
                createdAt: new Date().toISOString()
            },
            {
                id: '103',
                caseNo: '2024/567',
                court: 'İzmir 3. Asliye Ticaret',
                client: 'Ege Gıda A.Ş.',
                opponent: 'Market Zinciri A.Ş.',
                type: 'ticari',
                status: 'pending',
                filingDate: '2024-11-05',
                hearingDate: '2026-01-10T09:30',
                description: 'Cari hesap alacağı kaynaklı itirazın iptali davası.',
                createdAt: new Date().toISOString()
            },
            {
                id: '104',
                caseNo: '2025/22',
                court: 'İstanbul 8. Sulh Hukuk',
                client: 'Fatma Kaya',
                opponent: 'Kiracı Ali Veli',
                type: 'diger',
                status: 'active',
                filingDate: '2025-01-15',
                hearingDate: '2025-12-05T11:00',
                description: 'Kira tespit davası ve tahliye talebi.',
                createdAt: new Date().toISOString()
            },
            {
                id: '105',
                caseNo: '2025/998',
                court: 'Bakırköy 4. Ağır Ceza',
                client: 'Caner Erkin',
                opponent: 'Kamu Hukuku',
                type: 'ceza',
                status: 'active',
                filingDate: '2025-08-20',
                hearingDate: '2025-12-20T13:30',
                description: 'Taksirle yaralama suçu savunması.',
                createdAt: new Date().toISOString()
            },
            {
                id: '106',
                caseNo: '2023/112',
                court: 'Antalya 2. Tüketici',
                client: 'Zeynep Çelik',
                opponent: 'X Bankası',
                type: 'diger',
                status: 'closed',
                filingDate: '2023-04-10',
                hearingDate: null,
                description: 'Dosya masrafı iadesi. Lehe sonuçlandı.',
                createdAt: new Date().toISOString()
            },
            {
                id: '107',
                caseNo: '2025/44',
                court: 'İstanbul 10. İcra Dairesi',
                client: 'Teknoloji Ltd.',
                opponent: 'Borçlu Şahıs',
                type: 'icra',
                status: 'active',
                filingDate: '2025-09-01',
                hearingDate: null,
                description: 'Fatura alacağına dayalı ilamsız icra takibi.',
                createdAt: new Date().toISOString()
            },
            {
                id: '108',
                caseNo: '2025/333',
                court: 'Bursa 1. Asliye Hukuk',
                client: 'Hasan Öz',
                opponent: 'Sigorta Şirketi',
                type: 'diger',
                status: 'pending',
                filingDate: '2025-06-15',
                hearingDate: '2026-02-14T10:00',
                description: 'Trafik kazası kaynaklı maddi ve manevi tazminat.',
                createdAt: new Date().toISOString()
            },
            {
                id: '109',
                caseNo: '2025/77',
                court: 'İstanbul 4. Vergi Mahkemesi',
                client: 'İthalat A.Ş.',
                opponent: 'Vergi Dairesi',
                type: 'ticari',
                status: 'active',
                filingDate: '2025-02-28',
                hearingDate: '2025-12-12T15:00',
                description: 'Özel usulsüzlük cezası iptali davası.',
                createdAt: new Date().toISOString()
            },
            {
                id: '110',
                caseNo: '2024/888',
                court: 'Kadıköy 2. Asliye Hukuk',
                client: 'Merve Şen',
                opponent: 'Müteahhit Firma',
                type: 'diger',
                status: 'active',
                filingDate: '2024-12-01',
                hearingDate: '2026-01-25T11:30',
                description: 'Tapu iptal ve tescil davası.',
                createdAt: new Date().toISOString()
            }
        ];
        this.cases = demoCases;
        this.saveToStorage();
    }

    init() {
        this.setupNavigation();
        this.setupForm();
        this.setupSearch();
        this.setupEditForm();
        this.setupVoiceAgent();
        this.renderDashboard();
    }

    setupVoiceAgent() {
        const btn = document.getElementById('voice-agent-btn');
        const status = document.getElementById('voice-status');

        if (!('webkitSpeechRecognition' in window)) {
            btn.style.display = 'none';
            console.log('Web Speech API not supported');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'tr-TR';

        btn.addEventListener('click', () => {
            if (btn.classList.contains('listening')) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });

        recognition.onstart = () => {
            btn.classList.add('listening');
            btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Dinliyorum...';
            status.innerText = 'Dinliyorum...';
            status.classList.add('active');
        };

        recognition.onend = () => {
            btn.classList.remove('listening');
            btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Asistana Sor';
            // Don't clear status immediately if processing
        };

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            status.innerText = `"${transcript}"`;

            await this.processVoiceCommand(transcript);
        };
    }

    async processVoiceCommand(query) {
        const status = document.getElementById('voice-status');
        status.innerText = 'Düşünüyorum...';

        try {
            const response = await fetch('/api/agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                    context: this.cases
                })
            });

            const data = await response.json();

            status.innerText = data.response;
            this.speakResponse(data.response);

        } catch (error) {
            console.error('AI Error:', error);
            status.innerText = 'Bir hata oluştu.';
            this.speakResponse('Üzgünüm, bir hata oluştu.');
        }
    }

    speakResponse(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';
        window.speechSynthesis.speak(utterance);
    }

    setupEditForm() {
        const form = document.getElementById('edit-case-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateCase();
        });

        // Close modal on outside click
        document.getElementById('edit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'edit-modal') {
                this.closeModal();
            }
        });
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const viewId = item.getAttribute('data-view');
                this.navigateTo(viewId);
            });
        });
    }

    navigateTo(viewId) {
        // Update Nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-view') === viewId) {
                item.classList.add('active');
            }
        });

        // Update View
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        const activeSection = document.getElementById(`${viewId}-view`);
        if (activeSection) {
            activeSection.classList.remove('hidden');
            activeSection.classList.add('active');
        }

        // Update Title
        const titles = {
            'dashboard': 'Genel Bakış',
            'cases': 'Davalar',
            'new-case': 'Yeni Dava Ekle'
        };
        document.getElementById('page-title').innerText = titles[viewId];

        // Refresh Data if needed
        if (viewId === 'cases') {
            this.renderCasesList();
        } else if (viewId === 'dashboard') {
            this.renderDashboard();
        }
    }

    setupForm() {
        const form = document.getElementById('new-case-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCase();
        });
    }

    saveCase() {
        const newCase = {
            id: Date.now().toString(),
            caseNo: document.getElementById('case-no').value,
            court: document.getElementById('court').value,
            client: document.getElementById('client').value,
            opponent: document.getElementById('opponent').value,
            type: document.getElementById('case-type').value,
            status: document.getElementById('status').value,
            filingDate: document.getElementById('filing-date').value,
            hearingDate: document.getElementById('hearing-date').value,
            description: document.getElementById('description').value,
            createdAt: new Date().toISOString()
        };

        this.cases.unshift(newCase); // Add to beginning
        this.saveToStorage();

        // Reset form and go to list
        document.getElementById('new-case-form').reset();
        this.navigateTo('cases');

        // Optional: Show success message (alert for now)
        // alert('Dava başarıyla kaydedildi.');
    }

    saveToStorage() {
        localStorage.setItem('tanApp_cases', JSON.stringify(this.cases));
    }

    renderDashboard() {
        // Update Stats
        document.getElementById('total-cases-count').innerText = this.cases.length;

        const upcoming = this.cases.filter(c => {
            if (!c.hearingDate) return false;
            const hearing = new Date(c.hearingDate);
            const now = new Date();
            return hearing > now;
        }).length;
        document.getElementById('upcoming-hearings-count').innerText = upcoming;

        const completed = this.cases.filter(c => c.status === 'closed').length;
        document.getElementById('completed-cases-count').innerText = completed;

        // Render Upcoming Hearings
        const hearingsList = document.getElementById('upcoming-hearings-list');
        const upcomingCases = this.cases
            .filter(c => c.hearingDate && new Date(c.hearingDate) > new Date())
            .sort((a, b) => new Date(a.hearingDate) - new Date(b.hearingDate))
            .slice(0, 5);

        if (upcomingCases.length === 0) {
            hearingsList.innerHTML = '<div class="empty-state">Yaklaşan duruşma bulunmuyor.</div>';
        } else {
            hearingsList.innerHTML = upcomingCases.map(c => `
                <div class="activity-item">
                    <div class="activity-date">
                        ${new Date(c.hearingDate).toLocaleDateString('tr-TR')}
                        <br>
                        <small>${new Date(c.hearingDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</small>
                    </div>
                    <div class="activity-details">
                        <h4>${c.caseNo} - ${c.court}</h4>
                        <p>${c.client} vs ${c.opponent}</p>
                    </div>
                    <div class="activity-action">
                        <button class="btn-sm btn-secondary" onclick="app.addToCalendar('${c.id}')">
                            <i class="fa-regular fa-calendar-plus"></i> Takvime Ekle
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    renderCasesList() {
        const tbody = document.getElementById('cases-table-body');
        const searchTerm = document.getElementById('case-search').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;

        const filteredCases = this.cases.filter(c => {
            const matchesSearch =
                c.caseNo.toLowerCase().includes(searchTerm) ||
                c.client.toLowerCase().includes(searchTerm) ||
                c.court.toLowerCase().includes(searchTerm);

            const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        if (filteredCases.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty-state">Kayıtlı dava bulunamadı.</td></tr>';
            return;
        }

        tbody.innerHTML = filteredCases.map(c => `
            <tr class="case-row" onclick="app.openEditModal('${c.id}')">
                <td><strong>${c.caseNo}</strong></td>
                <td>${c.client}</td>
                <td>${c.court}</td>
                <td>${this.formatCaseType(c.type)}</td>
                <td>${c.hearingDate ? new Date(c.hearingDate).toLocaleString('tr-TR') : '-'}</td>
                <td><span class="status-badge status-${c.status}">${this.formatStatus(c.status)}</span></td>
                <td>
                    <button class="btn-sm btn-secondary" onclick="event.stopPropagation(); app.addToCalendar('${c.id}')" title="Takvime Ekle">
                        <i class="fa-regular fa-calendar"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    openEditModal(caseId) {
        const c = this.cases.find(x => x.id === caseId);
        if (!c) return;

        document.getElementById('edit-id').value = c.id;
        document.getElementById('edit-case-no').value = c.caseNo;
        document.getElementById('edit-court').value = c.court;
        document.getElementById('edit-client').value = c.client;
        document.getElementById('edit-opponent').value = c.opponent || '';
        document.getElementById('edit-case-type').value = c.type;
        document.getElementById('edit-status').value = c.status;
        document.getElementById('edit-filing-date').value = c.filingDate || '';
        document.getElementById('edit-hearing-date').value = c.hearingDate || '';
        document.getElementById('edit-description').value = c.description || '';

        document.getElementById('edit-modal').classList.add('active');
    }

    closeModal() {
        document.getElementById('edit-modal').classList.remove('active');
    }

    updateCase() {
        const id = document.getElementById('edit-id').value;
        const index = this.cases.findIndex(x => x.id === id);
        if (index === -1) return;

        this.cases[index] = {
            ...this.cases[index],
            caseNo: document.getElementById('edit-case-no').value,
            court: document.getElementById('edit-court').value,
            client: document.getElementById('edit-client').value,
            opponent: document.getElementById('edit-opponent').value,
            type: document.getElementById('edit-case-type').value,
            status: document.getElementById('edit-status').value,
            filingDate: document.getElementById('edit-filing-date').value,
            hearingDate: document.getElementById('edit-hearing-date').value,
            description: document.getElementById('edit-description').value
        };

        this.saveToStorage();
        this.closeModal();
        this.renderCasesList();
        this.renderDashboard(); // Update stats
    }

    deleteCase() {
        if (!confirm('Bu davayı silmek istediğinize emin misiniz?')) return;

        const id = document.getElementById('edit-id').value;
        this.cases = this.cases.filter(x => x.id !== id);

        this.saveToStorage();
        this.closeModal();
        this.renderCasesList();
        this.renderDashboard();
    }

    setupSearch() {
        document.getElementById('case-search').addEventListener('input', () => this.renderCasesList());
        document.getElementById('status-filter').addEventListener('change', () => this.renderCasesList());
    }

    formatCaseType(type) {
        const types = {
            'ticari': 'Ticari Dava',
            'is': 'İş Davası',
            'aile': 'Aile Hukuku',
            'ceza': 'Ceza Davası',
            'icra': 'İcra Takibi',
            'diger': 'Diğer'
        };
        return types[type] || type;
    }

    formatStatus(status) {
        const statuses = {
            'active': 'Devam Ediyor',
            'pending': 'Beklemede',
            'closed': 'Tamamlandı'
        };
        return statuses[status] || status;
    }

    addToCalendar(caseId) {
        const c = this.cases.find(x => x.id === caseId);
        if (!c || !c.hearingDate) return;

        const startDate = new Date(c.hearingDate);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

        const formatDate = (date) => {
            return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
        };

        const details = `Müvekkil: ${c.client}\nKarşı Taraf: ${c.opponent}\nDava: ${c.caseNo}\nKonu: ${c.description}`;

        const url = new URL('https://calendar.google.com/calendar/render');
        url.searchParams.append('action', 'TEMPLATE');
        url.searchParams.append('text', `Duruşma: ${c.caseNo} - ${c.court}`);
        url.searchParams.append('dates', `${formatDate(startDate)}/${formatDate(endDate)}`);
        url.searchParams.append('details', details);
        url.searchParams.append('location', c.court);

        window.open(url.toString(), '_blank');
    }
}

// Initialize App
const app = new TanApp();
