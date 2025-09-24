export function showAddEventForm() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Tambah Program Kerja</h2>
            <form id="addEventForm">
                <div class="form-group">
                    <label for="eventName">Nama Program:</label>
                    <input type="text" id="eventName" required>
                </div>
                <div class="form-group">
                    <label for="eventDate">Tanggal:</label>
                    <input type="date" id="eventDate" required>
                </div>
                <div class="form-group">
                    <label for="eventType">Jenis Program:</label>
                    <select id="eventType" required>
                        <option value="SDM">SDM</option>
                        <option value="EDOSOSPMAS">EDOSOSPMAS</option>
                        <option value="KESTRA">KESTRA</option>
                        <option value="MEDKRAF">MEDKRAF</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="eventDescription">Deskripsi:</label>
                    <textarea id="eventDescription" rows="3"></textarea>
                </div>
                <div class="button-group">
                    <button type="submit" class="btn-primary">Simpan</button>
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal').remove()">Batal</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('addEventForm').addEventListener('submit', handleAddEvent);
}

async function handleAddEvent(e) {
    e.preventDefault();
    const form = e.target;
    const date = new Date(form.eventDate.value);
    
    const eventData = {
        name: form.eventName.value,
        date: form.eventDate.value,
        type: form.eventType.value,
        description: form.eventDescription.value,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };

    try {
        await window.addEvent(eventData);
        form.closest('.modal').remove();
        window.refreshCalendar(); // We'll create this function next
    } catch (error) {
        alert('Gagal menambahkan program kerja: ' + error.message);
    }
}