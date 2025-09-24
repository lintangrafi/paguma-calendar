import { db } from './firebase-config.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

export class ProkerModal {
    constructor(modalId, formId) {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init(modalId, formId));
        } else {
            this.init(modalId, formId);
        }
    }

    init(modalId, formId) {
        this.modal = document.getElementById(modalId);
        this.form = document.getElementById(formId);
        
        if (!this.modal || !this.form) {
            console.error(`Modal or form elements not found. Modal: ${modalId}, Form: ${formId}`);
            return;
        }
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.form || !this.modal) return;

        // Prevent form from submitting normally
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(e);
        });

        // Close button handler
        const closeBtn = this.modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }

        // Cancel button handler
        const cancelBtn = this.modal.querySelector('button[type="button"]');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hide());
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(this.form);
            const dateStr = formData.get('date');
            const date = new Date(dateStr + 'T00:00:00');
            const prokerData = {
                title: formData.get('title'),
                date: date,
                dateString: date.toISOString(),
                department: formData.get('department'),
                description: formData.get('description') || '',
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                displayDate: date.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            // Jika mode edit, update dokumen
            if (this.form.getAttribute('data-mode') === 'edit' && this.form.getAttribute('data-id')) {
                const id = this.form.getAttribute('data-id');
                const { updateDoc, doc } = await import('https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js');
                await updateDoc(doc(db, 'events', id), prokerData);
                console.log('Agenda berhasil diupdate:', id);
                this.form.removeAttribute('data-mode');
                this.form.removeAttribute('data-id');
                this.form.querySelector('button[type="submit"]').textContent = 'Simpan';
            } else {
                // Tambah baru
                const { addDoc, collection } = await import('https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js');
                const docRef = await addDoc(collection(db, 'events'), {
                    ...prokerData,
                    createdAt: new Date()
                });
                console.log('Program kerja berhasil ditambahkan dengan ID:', docRef.id);
            }

            this.hide();
            this.form.reset();
            window.dispatchEvent(new CustomEvent('prokerAdded'));
        } catch (error) {
            console.error('Error menyimpan agenda:', error);
            alert('Gagal menyimpan agenda. Silakan coba lagi.');
        }
    }

    show() {
        this.modal.style.display = 'block';
    }

    hide() {
        this.modal.style.display = 'none';
        this.form.reset();
    }
}