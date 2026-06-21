const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistem Peminjaman Lapangan - Capstone Neo Telemetri',
      version: '1.0.0',
      description: 'Dokumentasi RESTful API fungsional untuk sistem peminjaman fasilitas publik (lapangan olahraga).',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server (Localhost)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // 🔥 SEMUA RINCIAN ENDPOINT KITA DAFTARKAN LANGSUNG DISINI (100% AMAN & ANTI-GAGAL)
    paths: {
      "/api/auth/register": {
        "post": {
          "summary": "Registrasi user baru",
          "tags": ["Autentikasi"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nama": { "type": "string", "example": "Zahra" },
                    "email": { "type": "string", "example": "zahra@example.com" },
                    "password": { "type": "string", "example": "password123" },
                    "no_hp": { "type": "string", "example": "081234567890" }
                  }
                }
              }
            }
          },
          "responses": {
            "201": { "description": "Berhasil didaftarkan" }
          }
        }
      },
      "/api/auth/login": {
        "post": {
          "summary": "Login user",
          "tags": ["Autentikasi"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": { "type": "string", "example": "zahra@example.com" },
                    "password": { "type": "string", "example": "password123" }
                  }
                }
              }
            }
          },
          "responses": {
            "200": { "description": "Login berhasil" }
          }
        }
      },
      "/api/lapangan": {
        "get": {
          "summary": "Ambil semua daftar lapangan",
          "tags": ["Lapangan"],
          "responses": {
            "200": { "description": "Berhasil mengambil data" }
          }
        },
        "post": {
          "summary": "Tambah lapangan baru",
          "tags": ["Lapangan"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nama_lapangan": { "type": "string", "example": "Futsal Vinyl Arena" },
                    "jenis_lapangan": { "type": "string", "example": "Futsal" },
                    "harga_perjam": { "type": "integer", "example": 150000 }
                  }
                }
              }
            }
          },
          "responses": {
            "201": { "description": "Lapangan berhasil dibuat" }
          }
        }
      },
      "/api/jadwal": {
        "post": {
          "summary": "Tambah slot jadwal baru",
          "tags": ["Jadwal"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id_lapangan": { "type": "string", "example": "AL01" },
                    "tanggal": { "type": "string", "example": "2026-07-01" },
                    "jam_mulai": { "type": "string", "example": "08:00" },
                    "jam_selesai": { "type": "string", "example": "09:00" }
                  }
                }
              }
            }
          },
          "responses": {
            "201": { "description": "Jadwal berhasil dibuat" }
          }
        }
      },
      "/api/jadwal/lapangan/{id_lapangan}": {
        "get": {
          "summary": "Cari jadwal per lapangan",
          "tags": ["Jadwal"],
          "parameters": [
            {
              "in": "path",
              "name": "id_lapangan",
              "required": true,
              "schema": { "type": "string", "example": "AL01" }
            }
          ],
          "responses": {
            "200": { "description": "Berhasil mendapatkan data" }
          }
        }
      },
      "/api/booking": {
        "post": {
          "summary": "Buat booking baru",
          "tags": ["Booking"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id_user": { "type": "string", "example": "U01" },
                    "id_jadwal": { "type": "string", "example": "JD01" }
                  }
                }
              }
            }
          },
          "responses": {
            "201": { "description": "Booking sukses" }
          }
        }
      },
      "/api/pembayaran/riwayat/{id_user}": {
        "get": {
          "summary": "Ambil riwayat transaksi user",
          "tags": ["Pembayaran"],
          "parameters": [
            {
              "in": "path",
              "name": "id_user",
              "required": true,
              "schema": { "type": "string", "example": "U01" }
            }
          ],
          "responses": {
            "200": { "description": "Berhasil" }
          }
        }
      },
      "/api/pembayaran/konfirmasi": {
        "post": {
          "summary": "Konfirmasi pembayaran booking",
          "tags": ["Pembayaran"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id_pinjam": { "type": "string", "example": "PM01" }
                  }
                }
              }
            }
          },
          "responses": {
            "200": { "description": "Pembayaran lunas" }
          }
        }
      }
    }
  },
  apis: []
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;