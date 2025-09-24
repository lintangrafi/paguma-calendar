export class Agenda {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container element with id '${containerId}' not found`);
            return;
        }
    }

    updateEvents(events) {
        if (!this.container) return;

        // Accept month/year as arguments
        let month = arguments[1] ? arguments[1] - 1 : new Date().getMonth();
        let year = arguments[2] ? arguments[2] : new Date().getFullYear();

        console.log('[Agenda] updateEvents, events:', events);
        this.container.innerHTML = '';
        if (!events || events.length === 0) {
            this.container.innerHTML = '<p>Tidak ada agenda untuk bulan ini</p>';
            return;
        }

        // Sort events by date
        const sortedEvents = [...events].sort((a, b) => {
            const dateA = new Date(a.dateString);
            const dateB = new Date(b.dateString);
            return dateA - dateB;
        });

        // Group events by selected month
        const thisMonthEvents = sortedEvents.filter(event => {
            const eventDate = new Date(event.dateString);
            return eventDate.getMonth() === month && eventDate.getFullYear() === year;
        });

        if (thisMonthEvents.length === 0) {
            this.container.innerHTML = '<p>Tidak ada agenda untuk bulan ini</p>';
            return;
        }

        thisMonthEvents.forEach(event => {
            const eventDate = new Date(event.dateString);
            const eventEl = document.createElement('div');
            eventEl.className = `agenda-item ${event.department.toLowerCase()}-bg`;
            eventEl.style.padding = '18px';
            eventEl.style.margin = '16px 0';
            eventEl.style.borderRadius = '14px';
            eventEl.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
            eventEl.style.display = 'flex';
            eventEl.style.alignItems = 'center';
            eventEl.style.transition = 'box-shadow 0.2s';
            eventEl.onmouseover = () => eventEl.style.boxShadow = '0 8px 24px rgba(52,152,219,0.12)';
            eventEl.onmouseout = () => eventEl.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';

            eventEl.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-width:70px;">
                    <div style="background:#fff; color:#222; border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1.3em; margin-bottom:4px; border:2px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.07);">${eventDate.getDate()}</div>
                    <div style="font-size:0.95em; color:#222; font-weight:600;">${eventDate.toLocaleDateString('id-ID', { month: 'short' })}</div>
                    <div style="font-size:0.8em; color:#666;">${eventDate.getFullYear()}</div>
                </div>
                <div style="flex:1; margin-left:22px;">
                    <div style="font-size:1.15em; font-weight:700; margin-bottom:2px; color:#222; letter-spacing:0.5px;">${event.title}</div>
                    <span style="font-size:0.95em; font-weight:600; color:#fff; background:#4CAF50; display:inline-block; padding:2px 12px; border-radius:8px; margin-bottom:6px; box-shadow:0 1px 4px rgba(76,175,80,0.07);">${event.department}</span>
                    ${event.description ? `<div style="margin-top:8px; font-size:0.98em; color:#222; background:#f7f7f7; padding:10px; border-radius:8px; box-shadow:0 1px 4px rgba(52,152,219,0.07);">${event.description}</div>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:8px; margin-left:16px;">
                    <button class="agenda-edit-btn" style="background:#fff; color:#1976d2; border:1px solid #1976d2; border-radius:6px; padding:4px 10px; font-size:0.95em; cursor:pointer; margin-bottom:4px; transition:background 0.2s;" data-id="${event.id}">Edit</button>
                    <button class="agenda-delete-btn" style="background:#fff; color:#d32f2f; border:1px solid #d32f2f; border-radius:6px; padding:4px 10px; font-size:0.95em; cursor:pointer; transition:background 0.2s;" data-id="${event.id}">Delete</button>
                </div>
            `;
            this.container.appendChild(eventEl);

            // Event handler for edit and delete
            eventEl.querySelector('.agenda-edit-btn').onclick = (e) => {
                if (typeof this.onEdit === 'function') {
                    this.onEdit(event);
                }
            };
            eventEl.querySelector('.agenda-delete-btn').onclick = (e) => {
                if (typeof this.onDelete === 'function') {
                    this.onDelete(event);
                }
            };
        });
    }
}