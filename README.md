
# Karang Taruna Portal v6.8 (Transparent + Firebase + Cloudinary)

## Cara Pakai
1) Deploy folder ini ke Netlify / Vercel / Firebase Hosting.
2) Buka `/js/cloudinary.js` dan isi:
   - `YOUR_CLOUD_NAME`
   - `YOUR_UPLOAD_PRESET`
3) Pastikan Firestore punya dokumen `sistem/branding` seperti:
```
{
  "nama_portal": "Portal Karang Taruna Cilosari Barat",
  "logo": "https://.../logo.png"
}
```
4) Buka `/auth/login.html` untuk login, lalu `/index.html` akan memuat branding real-time.

## Struktur
- `index.html` : dashboard transparan iOS-style
- `auth/login.html` : halaman login
- `js/firebase.js` : konfigurasi Firebase (sudah modular, persistence aktif)
- `js/cloudinary.js` : helper upload media
- `js/app.js` : inisialisasi branding & demo upload logo
- `css/style.css` : tema pure transparan + glass + motion

## Catatan
- Ini skeleton siap deploy. Tambahkan modul lain (kas, kegiatan, forum) mengikuti pola Firestore.
- Untuk write Firestore dari upload, buat fungsi admin (Callable Cloud Functions) atau halaman admin khusus.


## Modul v6.9 (lengkap)
Halaman tersedia di `/pages/`:
- `kas.html` (kas & iuran)
- `kegiatan.html` (agenda)
- `forum.html`
- `academy.html`
- `sertifikat.html`
- `anggota.html`
- `pengaturan.html`
- `umkm.html`
- `laporan.html` (ringkasan)

Masing-masing sudah terhubung ke Firestore (CRUD dasar) dan Cloudinary (untuk foto).


# v7.1 FINAL
- PWA aktif (manifest + service worker + splash)
- Role Guard (per-unit) dengan `js/guard.js` + `js/config.js`
- Firestore Security Rules (`firestore.rules`) untuk isolasi per Karang Taruna
- Auto Report PDF (`js/autoReport.js`) + tombol di `/pages/laporan.html`
- Semua modul tetap: kas, kegiatan, forum, academy, sertifikat, anggota, pengaturan, umkm, laporan

## Deploy
- Netlify/Vercel: drag-drop folder ini
- Firebase Hosting: `firebase deploy` (salin `firestore.rules` ke project Firestore rules)
- Edit `js/cloudinary.js`: isi `YOUR_CLOUD_NAME` & `YOUR_UPLOAD_PRESET`

