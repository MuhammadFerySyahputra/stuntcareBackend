# Dokumentasi API Makanan Pendamping ASI

## Base Url

## Menambahkan Data MPASI

Endpoint : /api/mpasi

Headers:

- Content-Type: application/json

Method : POST

Request Body :

```json
{
  "makanan": "Bubur bayi",
  "porsi": 2,
  "bahan": {
    "kentang": "50gr",
    "telur": "1 butir",
    "kaldu sapi": "50 ml"
  },
  "cara_masak": [
    "Kupas dan potong kentang menjadi potongan kecil-kecil.",
    "Rebus kentang hingga empuk, lalu tiriskan.",
    "Kocok telur dan tambahkan ke dalam kentang yang telah dihaluskan.",
    "Panaskan kaldu sapi dan tambahkan ke dalam campuran kentang dan telur. Aduk hingga merata.",
    "Masak campuran tersebut dengan api kecil hingga mengental dan menjadi bubur yang lembut.",
    "Angkat dan biarkan dingin sebelum disajikan kepada bayi."
  ],
  "kategori": "6-8 bulan",
  "gambar": "https://link.gambar.com",
  "kalori": 100,
  "protein": 6,
  "lemak": 3.5,
  "karbohidrat": 7.8
}
```

Response Body Success :

```json
{
  "message": "Sukses menambahkan data Makanan",
  "data": {
    "id": 1,
    "makanan": "Bubur bayi",
    "porsi": 2,
    "bahan": {
      "kentang": "50gr",
      "telur": "1 butir",
      "kaldu sapi": "50 ml"
    },
    "cara_masak": [
      "Kupas dan potong kentang menjadi potongan kecil-kecil.",
      "Rebus kentang hingga empuk, lalu tiriskan.",
      "Kocok telur dan tambahkan ke dalam kentang yang telah dihaluskan.",
      "Panaskan kaldu sapi dan tambahkan ke dalam campuran kentang dan telur. Aduk hingga merata.",
      "Masak campuran tersebut dengan api kecil hingga mengental dan menjadi bubur yang lembut.",
      "Angkat dan biarkan dingin sebelum disajikan kepada bayi."
    ],
    "kategori": "6-8 bulan",
    "gambar": "https://link.gambar.com",
    "kalori": 100,
    "protein": 6,
    "lemak": 3.5,
    "karbohidrat": 7.8,
    "createdAt": "2024-05-15 10:51:47",
    "updatedAt": "2024-05-15 10:51:47"
  }
}
```

Response Body Error :

```json
{
  "errors": "Gagal menambahkan data Makanan"
}
```

## Mengambil Semua data MPASI

Endpoint : /api/mpasi

Method : GET

Response Body Success :

```json
{
  "message": "Sukses mendapatkan data Makanan",
  "data": [
    {
      "id": 1,
      "makanan": "Bubur bayi",
      "kategori": "6-8 bulan",
      "gambar": "https://link.gambar.com"
    },
    {
      "id": 2,
      "makanan": "alpukat",
      "kategori": "9-11 bulan",
      "gambar": "https://link.gambar.com"
    }
  ],
  "total": 2,
  "page": 1,
  "pages": 1
}
```

Response Body Error :

```json
{
  "errors": "Gagal mendapatkan data Makanan"
}
```

## Mengambil Detail data MPASI

Endpoint : /api/mpasi/:id

Method : GET

Response Body Success :

```json
{
  "message": "Sukses mendapatkan detail Makanan",
  "data": {
    "id": 1,
    "makanan": "Bubur bayi",
    "porsi": 2,
    "bahan": {
      "kentang": "50gr",
      "telur": "1 butir",
      "kaldu sapi": "50 ml"
    },
    "cara_masak": [
      "Kupas dan potong kentang menjadi potongan kecil-kecil.",
      "Rebus kentang hingga empuk, lalu tiriskan.",
      "Kocok telur dan tambahkan ke dalam kentang yang telah dihaluskan.",
      "Panaskan kaldu sapi dan tambahkan ke dalam campuran kentang dan telur. Aduk hingga merata.",
      "Masak campuran tersebut dengan api kecil hingga mengental dan menjadi bubur yang lembut.",
      "Angkat dan biarkan dingin sebelum disajikan kepada bayi."
    ],
    "kategori": "6-8 bulan",
    "gambar": "https://link.gambar.com",
    "kalori": 100,
    "protein": 6,
    "lemak": 3.5,
    "karbohidrat": 7.8,
    "createdAt": "2024-05-15 10:51:47",
    "updatedAt": "2024-05-15 10:51:47"
  }
}
```

Response Body Error :

```json
{
  "errors": "Gagal mendapatkan detail Makanan"
}
```

## Mengambil Mpasi Berdasarkan Kategori

Endpoint : /api/mpasi?kategori=6-8 Bulan

Method : GET

Response Body Success :

```json
{
  "message": "Sukses mendapatkan data Makanan",
  "data": [
    {
      "id": 1,
      "makanan": "Bubur bayi",
      "kategori": "6-8 bulan",
      "gambar": "https://link.gambar.com"
    },
    {
      "id": 1,
      "makanan": "Bubur anak",
      "kategori": "6-8 bulan",
      "gambar": "https://link.gambar.com"
    }
  ]
}
```

## Pencarian Mpasi

Endpoint : /api/mpasi?q=Bubur bayi

Method : GET

Response Body Success :

```json
{
  "message": "Sukses mendapatkan data Makanan",
  "data": [
    {
      "id": 1,
      "makanan": "Bubur bayi",
      "kategori": "6-8 bulan",
      "gambar": "https://link.gambar.com"
    }
  ]
}
```

## Mengubah Data MPASI

Endpoint : /api/mpasi/:id

Method : PUT

Headers:

- Content-Type: application/json

Request Body :

```json
{
  "makanan": "Bubur",
  "porsi": 2,
  "bahan": {
    "kentang": "50gr",
    "telur": "1 butir",
    "kaldu sapi": "50 ml"
  },
  "cara_masak": [
    "Kupas dan potong kentang menjadi potongan kecil-kecil.",
    "Rebus kentang hingga empuk, lalu tiriskan.",
    "Kocok telur dan tambahkan ke dalam kentang yang telah dihaluskan.",
    "Panaskan kaldu sapi dan tambahkan ke dalam campuran kentang dan telur. Aduk hingga merata.",
    "Masak campuran tersebut dengan api kecil hingga mengental dan menjadi bubur yang lembut.",
    "Angkat dan biarkan dingin sebelum disajikan kepada bayi."
  ],
  "kategori": "6-8 bulan",
  "gambar": "https://link.gambar.com",
  "kalori": 100,
  "protein": 6,
  "lemak": 3.5,
  "karbohidrat": 7.8
}
```

Response Body Success :

```json
{
  "message": "Sukses mengubah data Makanan",
  "data": {
    "id": 1,
    "makanan": "Bubur",
    "porsi": 2,
    "bahan": {
      "kentang": "50gr",
      "telur": "1 butir",
      "kaldu sapi": "50 ml"
    },
    "cara_masak": [
      "Kupas dan potong kentang menjadi potongan kecil-kecil.",
      "Rebus kentang hingga empuk, lalu tiriskan.",
      "Kocok telur dan tambahkan ke dalam kentang yang telah dihaluskan.",
      "Panaskan kaldu sapi dan tambahkan ke dalam campuran kentang dan telur. Aduk hingga merata.",
      "Masak campuran tersebut dengan api kecil hingga mengental dan menjadi bubur yang lembut.",
      "Angkat dan biarkan dingin sebelum disajikan kepada bayi."
    ],
    "kategori": "6-8 bulan",
    "gambar": "https://link.gambar.com",
    "kalori": 100,
    "protein": 6,
    "lemak": 3.5,
    "karbohidrat": 7.8,
    "createdAt": "2024-05-15 10:51:47",
    "updatedAt": "2024-05-15 11:48:39"
  }
}
```

Response Body Error :

```json
{
  "errors": "Gagal mengubah data Makanan"
}
```

## Menghapus Data MPASI

Endpoint : /api/mpasi/:id

Method : DELETE

Response Body Success :

```json
{
  "data": "Berhasil menghapus data makanan"
}
```

Response Body Error :

```json
{
  "errors": "Gagal menghapus data makanan"
}
```

# Menambahkan Komentar Mpasi

Endpoint: /api/komentar/mpasi

Method: POST

Headers:

- Content-Type: application/json

Request Body:

```json
{
  "nama": "John Doe",
  "komentar": "Komentar mengenai mpasi ini.",
  "mpasiId": 1,
}
```

Response Body Success:

```json
{
  "message": "Sukses menambahkan komentar",
  "data": {
    "id": 1,
    "nama": "John Doe",
    "komentar": "Komentar mengenai mpasi ini.",
    "mpasiId": 1,
    "createdAt": "2024-06-13T10:00:00Z",
    "updatedAt": "2024-06-13T10:00:00Z"
  }
}
```

## Mengambil Komentar Mpasi Berdasarkan ID Mpasi

Endpoint: /api/komentar/mpasi/:mpasiId

Method: GET

- mpasiId: ID mpasi untuk mengambil komentar-komentar terkait.

Response Body Success:

```json
{
  "message": "Sukses mendapatkan komentar",
  "data": [
    {
      "id": 1,
      "nama": "John Doe",
      "komentar": "Komentar mengenai mpasi ini.",
      "mpasiId": 1,
      "createdAt": "2024-06-13T10:00:00Z",
      "updatedAt": "2024-06-13T10:00:00Z"
    },
    {
      "id": 2,
      "nama": "Jane Smith",
      "komentar": "Saya setuju dengan mpasi ini.",
      "mpasiId": 1,
      "createdAt": "2024-06-14T11:00:00Z",
      "updatedAt": "2024-06-14T11:00:00Z"
    }
  ]
}
```

## Menghapus Komentar Mpasi Berdasarkan ID Mpasi

Endpoint: /api/komentar/mpasi/:mpasiId

Method: DELETE

- mpasiId: ID mpasi

Response Body Success:

```json
{
  "message": "Berhasil menghapus komentar",
}
```