import { db } from './firebase-config.js';
import { collection, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { Calendar } from './calendar.js';
import { Agenda } from './agenda.js';
import { ProkerModal } from './modal.js';

class App {
    constructor() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
    this.events = [];
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
    this.activeDepartments = ['SDM', 'EDUSOSMAS', 'KESTRA', 'MEDKRAF'];
        
        this.initComponents();
        this.setupEventListeners();
        this.loadEvents();

        console.log('App initialized');
    }

    initComponents() {
        // Initialize calendar
        this.calendar = new Calendar('calendar-canvas', this.events);
        console.log('Calendar initialized');

        // Initialize agenda
        this.agenda = new Agenda('agendaList');
        console.log('Agenda initialized');

        // Initialize modal
        this.modal = new ProkerModal('prokerModal', 'prokerForm');
        console.log('Modal initialized');

        // Integrate edit and delete handlers
        this.agenda.onEdit = (event) => {
            this.modal.show();
            // Fill modal form with event data
            this.modal.form.elements['title'].value = event.title;
            this.modal.form.elements['date'].value = event.dateString.slice(0,10);
            this.modal.form.elements['department'].value = event.department;
            this.modal.form.elements['description'].value = event.description || '';
            this.modal.editingId = event.id;
            this.modal.form.setAttribute('data-mode', 'edit');
            this.modal.form.setAttribute('data-id', event.id);
            this.modal.form.querySelector('button[type="submit"]').textContent = 'Update';
        };
        this.agenda.onDelete = async (event) => {
            if (confirm('Hapus agenda ini?')) {
                try {
                    const { deleteDoc, doc } = await import('https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js');
                    await deleteDoc(doc(db, 'events', event.id));
                    window.dispatchEvent(new CustomEvent('prokerAdded'));
                } catch (err) {
                    alert('Gagal menghapus agenda.');
                }
            }
        };
    }

    updateFilteredViews() {
        // Filter events by active departments (case-insensitive)
        const filteredEvents = this.events.filter(ev =>
            this.activeDepartments.some(dep => dep.toUpperCase() === (ev.department || '').toUpperCase())
        );
        if (this.calendar) {
            this.calendar.updateEvents(filteredEvents);
        }
        if (this.agenda) {
            this.agenda.updateEvents(filteredEvents, this.currentMonth, this.currentYear);
        }
    }
    
    updateCalendarView() {
        if (this.calendar) {
            this.calendar.setMonthYear(this.currentMonth, this.currentYear);
        }
    }

    setupEventListeners() {
        // Listen for new events added
        window.addEventListener('prokerAdded', () => {
            console.log('Event added, refreshing data...');
            this.loadEvents();
        });

        // Department filter checkboxes
        const deptCheckboxes = document.querySelectorAll('.dept-filter');
        deptCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                this.activeDepartments = Array.from(deptCheckboxes)
                    .filter(c => c.checked)
                    .map(c => {
                        // Convert checkbox values to match department names in database
                        const valueMap = {
                            'sdm': 'SDM',
                            'edusosmas': 'EDUSOSMAS',
                            'kestra': 'KESTRA',
                            'medkraf': 'MEDKRAF'
                        };
                        return valueMap[c.value] || c.value.toUpperCase();
                    });
                this.updateFilteredViews();
            });
        });

        // Navigation buttons
        const prevBtn = document.getElementById('prevMonthBtn');
        const nextBtn = document.getElementById('nextMonthBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentMonth--;
                if (this.currentMonth < 1) {
                    this.currentMonth = 12;
                    this.currentYear--;
                }
                this.updateCalendarView(); // Update calendar view first
                this.loadEvents();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentMonth++;
                if (this.currentMonth > 12) {
                    this.currentMonth = 1;
                    this.currentYear++;
                }
                this.updateCalendarView(); // Update calendar view first
                this.loadEvents();
            });
        }

        // Add Proker button
        const addBtn = document.getElementById('addProkerBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const modal = document.getElementById('prokerModal');
                if (modal) modal.style.display = 'block';
            });
        }
    }

    async loadEvents() {
        try {
            // Update month/year display
            const monthYearHeader = document.getElementById('monthYearHeader');
            if (monthYearHeader) {
                const date = new Date(this.currentYear, this.currentMonth - 1);
                monthYearHeader.textContent = date.toLocaleDateString('id-ID', { 
                    month: 'long', 
                    year: 'numeric' 
                });
            }

            // Set up Firestore query
            const eventsRef = collection(db, 'events');
            const q = query(eventsRef, orderBy('dateString', 'asc'));

            // Listen for real-time updates
            onSnapshot(q, (snapshot) => {
                this.events = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        date: new Date(data.dateString)
                    };
                });

                console.log('Loaded events:', this.events);

                this.updateCalendarView(); // Ensure calendar is set to correct month first
                this.updateFilteredViews();

                // Remove loading message
                const loadingMsg = document.getElementById('loading');
                if (loadingMsg) {
                    loadingMsg.style.display = 'none';
                }
            });
        } catch (error) {
            console.error('Error loading events:', error);
            alert('Gagal memuat data. Silakan muat ulang halaman.');
        }
    }
}

// Initialize app
new App();