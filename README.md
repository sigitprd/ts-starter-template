# 🚀 Node.js Backend Starter Templates (TypeScript)

Kumpulan *starter project* *backend* untuk berbagai kebutuhan REST API, menggunakan **Node.js** dengan **TypeScript** (Express.js & NestJS), tersedia dalam varian dengan dan tanpa autentikasi JWT.

Repositori ini dirancang untuk mempercepat pengembangan *backend* Anda dengan menyediakan fondasi yang kokoh, terstruktur, dan mengikuti praktik terbaik di ekosistem Node.js/TypeScript.

---

## 📁 Daftar Starter Projects

| Folder | Teknologi | Framework | Autentikasi | Deskripsi |
| :------------------------ | :---------- | :-------- | :---------- | :-------------------------------------------------------------------------- |
| `express-ts-lite-starter` | Node.js/TS | Express.js | Tanpa Auth | *Starter* ringan **Express.js** dengan **TypeScript** dan **TypeORM**. |
| `express-ts-jwt-starter` | Node.js/TS | Express.js | JWT | *Starter* **Express.js** dengan **TypeScript**, **TypeORM**, dan autentikasi **JWT**. |
| `nest-ts-lite-starter` | Node.js/TS | NestJS | Tanpa Auth | *Starter* ringan **NestJS** dengan **TypeScript** dan **TypeORM**. |
| `nest-ts-jwt-starter` | Node.js/TS | NestJS | JWT | *Starter* **NestJS** dengan **TypeScript**, **TypeORM**, dan autentikasi **JWT**. |

---

## 🧰 Fitur Umum (Lintas Proyek)

Meskipun setiap *starter* memiliki detail implementasi yang spesifik, sebagian besar berbagi fitur umum:

* Struktur modular dan *clean architecture*.
* Manajemen *dependency* menggunakan `npm` atau `yarn`.
* Konfigurasi menggunakan *environment variables* (`.env`).
* Pengelolaan database dengan **TypeORM** dan migrasi.
* *Type-safety* dengan TypeScript.
* Penggunaan `async/await` untuk penanganan asinkron.
* Integrasi CI/CD dengan GitHub Actions.

---

## ⚙️ Cara Menggunakan (Umum)

Untuk memulai dengan salah satu *starter project*:

1.  **Pilih folder *starter* yang kamu inginkan** dari daftar di atas.
2.  **Masuk ke direktori *starter* tersebut:**
    ```bash
    cd <nama_folder_starter_pilihan_mu>
    ```
3.  **Ikuti instruksi spesifik di `README.md`** di dalam folder *starter* tersebut untuk instalasi, konfigurasi, dan cara menjalankan aplikasi. Setiap *starter* memiliki `README.md`-nya sendiri yang lebih detail.

---

## 🏗️ Struktur Umum Repositori
```bash
.
├── src
│   ├── config
│   │   └── index.ts
│   ├── controllers
│   │   └── UserController.ts
│   ├── database
│   │   ├── migrations
│   │   └── data-source.ts
│   ├── middlewares
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── models
│   │   ├── User.ts
│   │   └── UserDTO.ts
│   ├── repositories
│   │   └── UserRepository.ts
│   ├── routes
│   │   ├── index.ts
│   │   └── userRoutes.ts
│   ├── services
│   │   └── UserService.ts
│   ├── utils
│   │   ├── apiResponse.ts
│   │   ├── bcrypt.ts
│   │   ├── customErrors.ts
│   │   └── logger.ts
│   ├── app.ts
│   └── server.ts
├── README.md
├── package-lock.json
├── package.json
└── tsconfig.json
```

---

## 📌 Teknologi Utama

Repositori ini mencakup *starter* yang menggunakan teknologi berikut:

* **Bahasa Pemrograman:** TypeScript/JavaScript (Node.js)
* **Web Frameworks:** Express.js, NestJS
* **Database:** PostgreSQL (umumnya)
* **ORMs:** TypeORM
* **Autentikasi:** JWT (JSON Web Tokens)
* **Logging:** (Tergantung implementasi di setiap starter, contoh: Winston, Pino)
* **Validasi:** (Tergantung implementasi di setiap starter, contoh: `class-validator` untuk NestJS)
* **Alat Bantu:** `dotenv`, `npm`, `ts-node-dev`, `PM2`
* **CI/CD:** GitHub Actions

---

## 🧱 Cocok Digunakan Untuk

* Memulai proyek *backend* Node.js baru dengan cepat menggunakan Express.js atau NestJS.
* Belajar praktik terbaik *structuring project* di Node.js/TypeScript.
* Membuat REST API dari skala sederhana hingga menengah.
* Membuat *microservice* dengan atau tanpa kebutuhan autentikasi.

---

## Kontribusi

Kami sangat menyambut kontribusi! Jika Anda ingin menambahkan *starter* baru, meningkatkan yang sudah ada, atau memperbaiki *bug*, silakan ikuti panduan kontribusi yang ada di setiap folder *starter* atau buat *pull request* langsung ke repositori ini.

---

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE). (Anda mungkin perlu membuat file `LICENSE` di *root* repositori Anda).
