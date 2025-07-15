# Proyek Boilerplate Express.js TypeScript

[![CI/CD Pipeline](https://github.com/sigitprd/ts-starter/express-actions/workflows/ci.yml/badge.svg)](https://github.com/your_github_username/your_repo_name/actions/workflows/ci.yml)
[![Deploy STAGING](https://github.com/sigitprd/ts-starter/actions/workflows/deploy-staging.yml/badge.svg)](https://github.com/your_github_username/your_repo_name/actions/workflows/deploy-staging.yml)

Ini adalah *boilerplate* dasar untuk memulai proyek API RESTful menggunakan **Express.js** dengan **TypeScript**, dilengkapi dengan **TypeORM** untuk interaksi database **PostgreSQL**. Proyek ini dirancang untuk kemudahan pengembangan, *testing*, dan *deployment*.

---

## Daftar Isi

1.  [Fitur Utama](#fitur-utama)
2.  [Persyaratan](#persyaratan)
3.  [Instalasi](#instalasi)
4.  [Konfigurasi Lingkungan](#konfigurasi-lingkungan)
5.  [Database & Migrasi](#database--migrasi)
6.  [Menjalankan Aplikasi](#menjalankan-aplikasi)
7.  [Struktur Proyek](#struktur-proyek)
8.  [Deployment](#deployment)
9.  [Kontribusi](#kontribusi)
10. [Lisensi](#lisensi)

---

## Fitur Utama

* **Express.js:** Framework web minimalis dan fleksibel untuk Node.js.
* **TypeScript:** Untuk *type-safety* dan skalabilitas kode.
* **TypeORM:** ORM (Object-Relational Mapper) yang kuat untuk interaksi database.
    * **PostgreSQL:** Database relational pilihan.
    * **Migrations:** Pengelolaan skema database yang versi-kontol.
    * **Entities:** Definisi model database (`User` sebagai contoh).
    * **Penamaan Kolom Eksplisit:** Menggunakan properti `name` di `@Column()` untuk mengontrol nama kolom database secara eksplisit (misal: `createdAt` di kode, `createdAt` di DB).
* **`dotenv`:** Untuk pengelolaan *environment variables*.
* **`async/await`:** Penanganan operasi asinkron yang modern dan bersih.
* **Linting (ESLint) & Formatting (Prettier):** Untuk menjaga kualitas dan konsistensi kode (perlu ditambahkan secara manual jika belum ada).
* **.gitignore:** Untuk mengelola file yang tidak perlu di-*commit*.
* **GitHub Actions (CI/CD):**
    * **CI Pipeline:** Otomatisasi *build* dan *test* setiap *push* atau *pull request*.
    * **Staging Deployment:** Otomatisasi *deployment* ke server *staging* via SSH menggunakan NVM dan PM2.

---

## Persyaratan

Pastikan Anda memiliki hal-hal berikut terinstal di sistem Anda:

* **Node.js** (versi 20 atau yang Anda gunakan)
* **npm** (biasanya terinstal bersama Node.js)
* **PostgreSQL** (server database lokal atau akses ke server eksternal)
* **Git**

---

## Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/your_github_username/your_repo_name.git](https://github.com/your_github_username/your_repo_name.git)
    cd your_repo_name
    ```
2.  **Instal dependensi:**
    ```bash
    npm install
    ```

---

## Konfigurasi Lingkungan

Buat file `.env` di *root* proyek Anda berdasarkan `example.env`.

```dotenv
# .env (Contoh isi)

# PORT aplikasi
PORT=3000

# Konfigurasi Database PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name