# Paguma Calendar - Kalender Program Kerja PAGUMA Lebak

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <br><br>
  <p>Sebuah aplikasi kalender interaktif untuk mengelola dan menampilkan program kerja PAGUMA Lebak secara visual dan efisien</p>
</div>

## 📋 Daftar Isi
- [Deskripsi](#deskripsi)
- [Fitur](#fitur)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Instalasi](#instalasi)
- [Cara Menggunakan](#cara-menggunakan)
- [Struktur Proyek](#struktur-proyek)
- [Screenshots](#screenshots)
- [Peningkatan Terbaru](#peningkatan-terbaru)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Deskripsi

**Paguma Calendar** adalah aplikasi berbasis web yang dirancang khusus untuk mengelola dan menampilkan program kerja (proker) dari PAGUMA Lebak. Aplikasi ini menyediakan antarmuka kalender visual interaktif yang memudahkan koordinasi antar departemen dan pengelolaan agenda organisasi secara efisien.

Aplikasi ini menyatukan antara kalender visual dan daftar agenda dalam satu tampilan responsif, memungkinkan pengguna untuk dengan mudah melihat, menambah, mengedit, dan menghapus program kerja secara real-time.

## 🔧 Fitur

- 🗓️ **Kalender Interaktif** - Tampilan kalender berbasis canvas yang menampilkan tanggal dan event secara visual
- 📝 **Manajemen Agenda** - Tambah, edit, dan hapus agenda program kerja dengan form modal
- 🎨 **Multi-Departemen** - Dukungan untuk 4 departemen: SDM, EDUSOSMAS, KESTRA, dan MEDKRAF dengan warna khusus
- 🎯 **Marker Event Profesional** - Penanda khusus di kalender yang lebih kecil dan elegan untuk menunjukkan tanggal dengan program kerja
- 🔍 **Filter Departemen** - Penyaringan event berdasarkan departemen
- 📱 **Responsif** - Tampilan yang menyesuaikan di berbagai ukuran layar
- 🔄 **Sinkronisasi Real-time** - Data terbaru dengan dukungan Firebase
- 🎨 **Desain Profesional** - Tampilan yang lebih rapih dan profesional dengan font modern dan pewarnaan yang konsisten

## Teknologi yang Digunakan

- **Frontend**: JavaScript (ES6+), HTML5, CSS3
- **Canvas API**: Render tampilan kalender yang menarik
- **Firebase**: Backend sebagai layanan untuk penyimpanan data
- **Modern CSS**: Flexbox, CSS Variables, Animations
- **JavaScript Module**: Arsitektur modular untuk komponen terpisah

## Instalasi

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/lintangrafi/paguma-calendar
   cd paguma-calendar
   ```

2. **Instal dependensi Firebase Functions (jika diperlukan)**
   ```bash
   cd functions
   npm install
   ```

3. **Konfigurasi Firebase**
   - Buat proyek Firebase di [Firebase Console](https://console.firebase.google.com/)
   - Konfigurasi `firebase.json` sesuai dengan proyek Anda
   - Impor rules Firestore dari `firestore.rules`

4. **Jalankan secara lokal**
   ```bash
   firebase serve
   ```

## Cara Menggunakan

1. **Navigasi antar bulan** - Gunakan tombol panah kiri/kanan untuk berpindah bulan
2. **Tambah program kerja** - Klik tombol "Tambah Proker" untuk menambahkan agenda baru
3. **Filter departemen** - Gunakan checkbox untuk menampilkan/menyembunyikan event berdasarkan departemen
4. **Edit atau hapus agenda** - Gunakan tombol edit/hapus di masing-masing item agenda
5. **Lihat event di kalender** - Event ditandai dengan titik berwarna sesuai departemen

## Struktur Proyek

```
paguma-calendar/
├── index.html              # Struktur halaman utama
├── css/
│   ├── style.css          # Gaya utama aplikasi
│   └── modal.css          # Gaya untuk modal
├── js/
│   ├── calendar.js        # Logika tampilan kalender
│   ├── agenda.js          # Logika daftar agenda
│   └── app.js             # Logika utama aplikasi
├── functions/             # Firebase Functions
├── firebase.json          # Konfigurasi Firebase
├── firestore.rules        # Aturan akses Firestore
└── firestore.indexes.json # Indeks Firestore
```

## Screenshots

<div align="center">

| Halaman Kalender | Modal Tambah Agenda |
|:---:|:---:|
| ![Kalender](https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Kalender+Visual) | ![Modal](https://via.placeholder.com/600x400/2196F3/FFFFFF?text=Form+Tambah+Agenda) |

</div>

## Peningkatan Terbaru

### Versi 1.1 - Peningkatan Desain dan Fungsionalitas
- **Desain Marker Ditingkatkan** - Marker event sekarang lebih kecil dan elegan, tidak mengganggu tampilan angka tanggal
- **Desain Grid Ditingkatkan** - Font dan pewarnaan yang lebih profesional dan konsisten
- **Bug Filter Departemen Diperbaiki** - Marker sekarang muncul dan menghilang dengan benar saat filter diaktifkan/dinonaktifkan
- **Perpindahan Bulan Diperbaiki** - Tanggal sekarang menyesuaikan dengan benar saat berpindah bulan
- **Pengalaman Pengguna Ditingkatkan** - Tampilan yang lebih rapih, profesional, dan mudah dibaca

## Kontribusi

Kontribusi sangat dipersilakan! Berikut langkah-langkahnya:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b fitur/AwesomeFeature`)
3. Commit perubahan Anda (`git commit -m 'Tambah: fitur AwesomeFeature'`)
4. Push ke branch (`git push origin fitur/AwesomeFeature`)
5. Buat Pull Request

### Pedoman Kontribusi

- Ikuti gaya pengodean yang konsisten
- Pastikan perubahan tidak merusak fungsionalitas yang sudah ada
- Perbarui dokumentasi jika diperlukan
- Sertakan komentar yang jelas

## 📜 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

<div align="center">
  <sub>Dikembangkan dengan ❤️ untuk PAGUMA Lebak</sub>
</div>
