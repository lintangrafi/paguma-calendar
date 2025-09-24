export class Calendar {
    setMonthYear(month, year) {
        this.currentDate = new Date(year, month - 1);
        this.render();
    }
    constructor(canvasId, events = []) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init(canvasId, events));
        } else {
            this.init(canvasId, events);
        }
    }

    init(canvasId, events) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas element with id '${canvasId}' not found`);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.events = events || [];
        this.currentDate = new Date();
        this.selectedDate = null;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.render();
    }

    resizeCanvas() {
        if (!this.canvas || !this.ctx) return;
        
        const container = this.canvas.parentElement;
        if (!container) return;

        const width = container.clientWidth - 40;
        const height = Math.min(window.innerHeight * 0.6, width * 0.75);

        this.canvas.width = width;
        this.canvas.height = height;
        this.render();
    }

    updateEvents(events) {
        this.events = events || [];
        console.log('[Calendar] updateEvents, events:', this.events);
        if (this.ctx) {
            this.render();
        }
    }

    render() {  
        if (!this.canvas || !this.ctx) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw calendar grid
    this.drawGrid();

    // Draw month and year
    this.drawHeader();

    // Draw dates
    this.drawDates();

    // Draw events (marker) AFTER dates so marker always visible
    this.drawEvents();
    }

    drawGrid() {
        const { width, height } = this.canvas;
        const headerHeight = height * 0.1;
        const cellWidth = width / 7;
        const cellHeight = (height - headerHeight) / 6;

        // Draw days of week
        const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';

        days.forEach((day, i) => {
            this.ctx.fillText(day, cellWidth * i + cellWidth / 2, headerHeight / 2);
        });

        // Draw grid lines
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;

        // Vertical lines
        for (let i = 0; i <= 7; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(cellWidth * i, headerHeight);
            this.ctx.lineTo(cellWidth * i, height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let i = 0; i <= 6; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, headerHeight + cellHeight * i);
            this.ctx.lineTo(width, headerHeight + cellHeight * i);
            this.ctx.stroke();
        }
    }

    drawHeader() {
        // Header will be handled by HTML element
    }

    drawDates() {
        if (!this.canvas || !this.ctx) return;

        const { width, height } = this.canvas;
        const headerHeight = height * 0.1;
        const cellWidth = width / 7;
        const cellHeight = (height - headerHeight) / 6;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';

        let day = 1;
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const cellIndex = row * 7 + col;
                if (cellIndex < firstDay || day > daysInMonth) continue;

                const x = col * cellWidth + cellWidth / 2;
                const y = headerHeight + row * cellHeight + cellHeight / 2;

                // Highlight hari ini
                const today = new Date();
                if (
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(x, y - 8, cellWidth * 0.38, 0, 2 * Math.PI);
                    this.ctx.fillStyle = 'rgba(52,152,219,0.18)';
                    this.ctx.fill();
                    this.ctx.restore();
                    this.ctx.fillStyle = '#3498db';
                    this.ctx.font = 'bold 1.1em Segoe UI';
                } else {
                    this.ctx.fillStyle = '#2c3e50';
                    this.ctx.font = '1em Segoe UI';
                }
                this.ctx.textAlign = 'center';
                this.ctx.fillText(day.toString(), x, y);
                day++;
            }
        }
    }

    drawEvents() {
        if (!this.canvas || !this.ctx || !this.events) return;

        const { width, height } = this.canvas;
        const headerHeight = height * 0.1;
        const cellWidth = width / 7;
        const cellHeight = (height - headerHeight) / 6;

        console.log('[Calendar] drawEvents, events:', this.events);
        let markerDrawn = false;
        this.events.forEach(event => {
            if (!event || !event.dateString || !event.department) return;
            const date = new Date(event.dateString);
            if (isNaN(date)) return;
            if (date.getMonth() !== this.currentDate.getMonth() || 
                date.getFullYear() !== this.currentDate.getFullYear()) {
                return;
            }

            const day = date.getDate();
            const year = date.getFullYear();
            const month = date.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const cellIndex = day + firstDay - 1;
            const row = Math.floor(cellIndex / 7);
            const col = cellIndex % 7;

            const x = col * cellWidth + cellWidth / 2;
            const y = headerHeight + row * cellHeight + cellHeight / 2 + cellHeight * 0.32;

            console.log(`[Calendar] Marker: day=${day}, cellIndex=${cellIndex}, row=${row}, col=${col}, x=${x}, y=${y}`);

            // Draw event marker (dot)
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(x, y, cellWidth * 0.18, 0, 2 * Math.PI);
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = this.getDepartmentColor(event.department);
            this.ctx.shadowColor = '#222';
            this.ctx.shadowBlur = 8;
            this.ctx.fill();
            this.ctx.restore();
            markerDrawn = true;
        });
        if (!markerDrawn) {
            console.log('[Calendar] drawEvents: No marker drawn');
        }
    }

    getDepartmentColor(department) {
        const colors = {
            'SDM': '#4CAF50',
            'EDUSOSMAS': '#2196F3',
            'KESTRA': '#FFC107',
            'MEDKRAF': '#9C27B0'
        };
        return colors[department] || '#757575';
    }
}