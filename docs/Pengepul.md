# Pengepul API Spec

## Login Pengepul API

Enpoint : POST /api/pengepuls/login

Headers :

- Content-Type: multipart/form-data

Request Body :

```json
{
	"email": "string",
	"password": "string"
}
```

Response Body Success :

```json
{
	"message": "Pengepul berhasil login!",
	"success": true,
	"data": {
		"token": "string"
	}
}
```

Response Body Error :

```json
{
	"message": "Pengepul gagal login!",
	"success": true,
	"data": {
		"token": "Username or Password wrong"
	}
}
```

## Get Pengepul By Token API

Enpoint : GET /api/pengepuls

Headers :

- Authorization : token

Response Body Success :

```json
{
	"message": "Berhasil mendapatkan Pengepul!",
	"success": true,
	"data": {
		"email": "string",
		"nama": "string",
		"nomor": "string",
		"foto": "string",
		"provinsi": "string",
		"kab/kota": "string",
		"kecamatan": "string",
		"kode_pos": "string",
		"tipe": "string",
		"deskripsi": "string",
		"barang": [
			{
				"user_id": 1,
				"nama": "string",
				"kategori": "string",
				"foto": "string",
				"spesifikasi": "string",
				"harga": "string",
				"lama_pemakaian": "string",
				"memori": "string",
				"tahun_keluaran": "string",
				"status": "string"
			},
			{
				"user_id": 30,
				"nama": "string",
				"kategori": "string",
				"foto": "string",
				"spesifikasi": "string",
				"harga": "string",
				"lama_pemakaian": "string",
				"memori": "string",
				"tahun_keluaran": "string",
				"status": "string"
			}
		]
	}
}
```

Response Body Error :

```json
{
	"message": "Gagal mendapatkan Pengepul!",
	"success": false,
	"data": {
		"errors": "Unauthorized"
	}
}
```

## Logout Pengepul API

Enpoint : DELETE /api/pengepuls

Headers :

- Authorization : token

Response Body Success :

```json
{
	"message": "Berhasil logout!",
	"success": true,
	"data": {}
}
```

Response Body Error :

```json
{
	"message": "Gagal logout!",
	"success": false,
	"data": {
		"errors": "Unauthorized"
	}
}
```
