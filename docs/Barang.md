# Barang API Spec

## Create Barang API

Enpoint : POST /api/users/barang

Headers :

- Authorization : token
- Content-Type: multipart/form-data

Request Body :

```json
{
	"pengepul_id": 1,
	"user_id": 1, // token
	"nama": "string",
	"kategori": "string",
	"foto": "string",
	"spesifikasi": "string",
	"harga": "string",
	"lama_pemakaian": "string",
	"memori": "string",
	"tahun_keluaran": "string",
	"status": "string",
	"minus": {
    [
      "deskripsi" : "string"
    ],
    [
      "deskripsi" : "string"
    ],
  }
}
```

Response Body Success :

```json
{
	"message": "Barang Berhasil di buat!",
	"success": true,
	"data": {
    "pengepul_id": 1,
    "user_id": 1,
    "nama": "string",
    "kategori": "string",
    "foto": "string",
    "spesifikasi": "string",
    "harga": "string",
    "lama_pemakaian": "string",
    "memori": "string",
    "tahun_keluaran": "string",
    "status": "string",
    "minus": {
      [
        "id" : 1,
        "deskripsi" : "string"
      ],
      [
        "id" : 2,
        "deskripsi" : "string"
      ],
    }
  }
}

```

Response Body Error :

```json
{
	"message": "Barang gagal di buat!",
	"success": false,
	"data": {
		"errors": "Name must be required"
	}
}
```

## POST Prediksi Harga API

Enpoint : POST /api/users/barang/predict

Headers :

- Authorization : token
- Content-Type: multipart/form-data

Request Body :

```json
{
	"user_id": 1, // token
	"nama": "string",
	"kategori": "string",
	"foto": "string",
	"spesifikasi": "string",
	"lama_pemakaian": "string",
	"memori": "string",
	"tahun_keluaran": "string",
	"status": "string",
	"minus": {
    [
      "deskripsi" : "string"
    ],
    [
      "deskripsi" : "string"
    ],
  }
}
```

Response Body Success :

```json
{
	"message": "Berhasil Predict Harga!",
	"success": true,
	"data": {
    "user_id": 1,
    "nama": "string",
    "kategori": "string",
    "foto": "string",
    "spesifikasi": "string",
    "harga": "string",
    "lama_pemakaian": "string",
    "memori": "string",
    "tahun_keluaran": "string",
    "status": "string",
    "minus": {
      [
        "id" : 1,
        "deskripsi" : "string"
      ],
      [
        "id" : 2,
        "deskripsi" : "string"
      ],
    }
  }
}

```

Response Body Error :

```json
{
	"message": "Gagal Predict Harga!",
	"success": false,
	"data": {
		"errors": "Terjadi kesalahan dalam melakukan prediksi"
	}
}
```

## Update Status Barang API

Enpoint : PATCH /api/pengepuls/barang/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
	"message": "Barang berhasil dirubah!",
	"success": true,
	"data": {
    "pengepul_id": 1,
    "user_id": 1,
    "nama": "string",
    "kategori": "string",
    "foto": "string",
    "spesifikasi": "string",
    "harga": "string",
    "lama_pemakaian": "string",
    "memori": "string",
    "tahun_keluaran": "string",
    "status": "Sold Out",
    "minus": {
      [
        "id" : 1,
        "deskripsi" : "string"
      ],
      [
        "id" : 2,
        "deskripsi" : "string"
      ],
    }
  }
}

```

Response Body Error :

```json
{
	"message": "Barang Gagal Dirubah!",
	"success": false,
	"data": {
		"errors": "Status must be required"
	}
}
```

## Update Relasi Pengepul Barang API

Enpoint : PATCH /api/pengepuls/barang/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
	"message": "Barang berhasil dirubah!",
	"success": true,
	"data": {
    "pengepul_id": null,
    "user_id": 1,
    "nama": "string",
    "kategori": "string",
    "foto": "string",
    "spesifikasi": "string",
    "harga": "string",
    "lama_pemakaian": "string",
    "memori": "string",
    "tahun_keluaran": "string",
    "status": "Available",
    "minus": {
      [
        "id" : 1,
        "deskripsi" : "string"
      ],
      [
        "id" : 2,
        "deskripsi" : "string"
      ],
    }
  }
}

```

Response Body Error :

```json
{
	"message": "Barang Gagal Dirubah!",
	"success": false,
	"data": {
		"errors": "Status must be required"
	}
}
```