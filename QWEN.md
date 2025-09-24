Halo Qwen, saya ingin membangun sebuah aplikasi web kalender interaktif dari awal hingga siap di-deploy. Tolong berikan saya semua yang saya butuhkan langkah demi langkah.

**Tugas Utama:** Membuat aplikasi kalender program kerja PAGUMA Lebak dengan fitur CRUD (Create, Read, Update, Delete) yang terhubung ke database Firebase dan siap untuk di-deploy ke Vercel.

Tolong ikuti struktur di bawah ini dengan tepat.

---

### 1. Buat File Aplikasi Utama

Pertama, buatkan saya kode lengkap untuk file `index.html`. File ini harus berisi semua HTML, CSS, dan JavaScript yang diperlukan dalam satu file.

**Spesifikasi untuk `index.html`:**
* **Tampilan:** Gunakan layout dua kolom (kalender di kiri, daftar agenda di kanan) yang responsif. Desainnya harus modern, bersih, dan berwarna sesuai dengan identitas departemen PAGUMA (SDM, EDUSOSMAS, KESTRA, MEDKRAF).
* **Fungsionalitas Kalender:**
    * Kalender digambar menggunakan `<canvas>`.
    * Memiliki tombol navigasi bulan (sebelumnya dan berikutnya).
    * Menampilkan titik berwarna pada tanggal yang memiliki agenda.
* **Fungsionalitas Agenda:**
    * Menampilkan daftar agenda untuk bulan yang dipilih, dikelompokkan berdasarkan departemen.
    * Saat tanggal di kalender diklik, otomatis scroll dan sorot agenda yang sesuai.
* **Fitur CRUD:**
    * Tombol "Tambah Proker" untuk membuka modal/form.
    * Setiap item agenda memiliki tombol ikon pensil (Edit) dan ikon tempat sampah (Hapus) yang selalu terlihat.
* **Integrasi Firebase:**
    * Sertakan Firebase SDK v9 (modular) melalui CDN.
    * Siapkan placeholder yang jelas di dalam kode JavaScript untuk `firebaseConfig`.
    * Semua operasi (membaca, menambah, mengedit, menghapus agenda) harus ditulis untuk berinteraksi dengan Firebase Firestore.
    * Gunakan listener `onSnapshot` agar kalender bersifat real-time.

---

### 2. Berikan Panduan Setup Firebase

Setelah memberikan kode `index.html`, berikan saya panduan langkah demi langkah dalam format Markdown untuk menyiapkan proyek Firebase. Panduan ini harus jelas agar saya bisa mendapatkan `firebaseConfig` yang dibutuhkan.

**Isi Panduan Firebase:**
1.  Cara membuat proyek baru di Firebase.
2.  Cara membuat database Firestore dan memilih "test mode".
3.  Cara mendaftarkan aplikasi web baru untuk mendapatkan `firebaseConfig`.
4.  Tunjukkan dengan jelas di mana `firebaseConfig` tersebut harus saya tempel di dalam kode `index.html`.

---

### 3. Berikan Perintah Git & GitHub

Selanjutnya, berikan saya semua perintah terminal yang saya perlukan untuk mengunggah proyek ini ke GitHub dari dalam terminal VS Code.

**Daftar Perintah Terminal:**
1.  Inisialisasi repositori Git (`git init`).
2.  Menambahkan semua file (`git add`).
3.  Membuat commit pertama (`git commit`).
4.  Menghubungkan ke repositori GitHub remote (`git remote add`). Berikan placeholder untuk URL repo.
5.  Melakukan push ke branch `main` (`git push`).

---

### 4. Berikan Panduan Deployment Vercel

Terakhir, berikan saya panduan singkat untuk men-deploy proyek ini dari repositori GitHub ke Vercel.

**Isi Panduan Vercel:**
1.  Cara mendaftar/login ke Vercel menggunakan akun GitHub.
2.  Cara mengimpor proyek dari repositori GitHub.
3.  Konfirmasi bahwa tidak ada pengaturan build yang perlu diubah dan cukup menekan tombol "Deploy".

Tolong berikan semua jawaban dalam satu respons yang terstruktur sesuai urutan di atas agar saya bisa langsung mengerjakannya. Terima kasih!;OHK