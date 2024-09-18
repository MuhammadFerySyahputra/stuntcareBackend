# Cara Instalasi API Backend

Panduan ini akan membimbing Anda melalui langkah-langkah untuk menginstal dan mengatur proyek ini di Node.js.

## Persyaratan
Sebelum Anda memulai, pastikan Anda telah menginstal hal berikut di mesin Anda:
- Node.js (versi X.X.X atau yang lebih tinggi)
- npm (Node Package Manager)

## Langkah Instalasi
1. Klon repositori proyek ke mesin lokal Anda:
    ```
    git clone https://github.com/Stuntcare/StuntCare.git
    ```

2. Buka direktori proyek:
    ```
    cd project-name
    ```

3. Instal dependensi proyek menggunakan npm:
    ```
    npm install
    ```

4. Konfigurasi proyek:
    - Ubah nama file `.env.example` menjadi `.env` dan perbarui nilai konfigurasi yang diperlukan.

5. Jalankan server pengembangan:
    ```
    npm run start
    ```

7. Buka browser web Anda dan kunjungi `http://localhost:3000` untuk mengakses aplikasi.

## Langkah Tambahan
### Pengaturan Environment

Untuk mengatur environment proyek, ikuti langkah-langkah berikut:

1. Buka file `.env` pada direktori proyek.
2. Ubah nilai konfigurasi yang diperlukan sesuai kebutuhan Anda. Berikut adalah konfigurasi yang umum digunakan:

```
PORT=3000
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_PORT=

JWT_SECRET=
JWT_REFRESH_SECRET=
```
Sesuaikan dengan data untuk mengisi nilai konfigurasi dengan informasi yang sesuai dengan lingkungan pengembangan Anda. 

3. Simpan perubahan pada file `.env`.

Setelah mengatur environment proyek, Anda dapat melanjutkan dengan menjalankan server pengembangan dan mengakses aplikasi melalui browser web.

Untuk informasi lebih lanjut tentang cara menggunakan dan menyesuaikan proyek, silakan lihat dokumentasi proyek.


- Untuk informasi lebih lanjut tentang cara menggunakan dan menyesuaikan proyek, lihat dokumentasi proyek.


## Dokumentasi API
<div align="center">

![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

[`Mpasi API`](https://github.com/Stuntcare/StuntCare/blob/backend/docs/artikel.md) |
[`Artikel API`](https://github.com/Stuntcare/StuntCare/blob/backend/docs/artikel.md) |
[`User API`](https://github.com/Stuntcare/StuntCare/blob/backend/docs/user.md)
</div>
