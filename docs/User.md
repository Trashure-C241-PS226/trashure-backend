# USER API Spec

## Register User API

Enpoint : POST /api/users

Headers :

- Content-Type: multipart/form-data

Request Body :

```json
{
  "email": "string",
  "password": "string",
  "fullname": "string",
  "nomor": "string",
  "provinsi": "string",
  "kab/kota": "string",
  "kecamatan": "string",
  "kode_pos": "string"
}
```

Response Body Success :

```json
{
  "message": "User berhasil di buat!",
  "success": true,
  "data": {
    "email": "string",
    "fullname": "string",
    "nomor": "string",
    "provinsi": "string",
    "kab_kota": "string",
    "kecamatan": "string",
    "kode_pos": "string"
  }
}
```

Response Body Error :

```json
{
  "message": "User gagal di buat!",
  "success": false,
  "data": {
    "errors": "Password must be minimum 4 character"
  }
}
```

## Login User API

Enpoint : POST /api/users/login

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
  "message": "User berhasil login!",
  "success": true,
  "data": {
    "token": "string"
  }
}
```

Response Body Error :

```json
{
  "message": "User gagal login!",
  "success": true,
  "data": {
    "token": "Username or Password wrong"
  }
}
```

## Update User API

Enpoint : PATCH /api/users

Headers :

- Authorization : token
- Content-Type: multipart/form-data

Request Body :

```json
{
  "email": "string",
  "password": "string",
  "nama_lengkap": "string",
  "nomor": "string",
  "foto": "string",
  "provinsi": "string",
  "kab/kota": "string",
  "kecamatan": "string",
  "kode_pos": "string"
}
```

Response Body Success :

```json
{
  "message": "Profile berhasil dirubah!",
  "success": true,
  "data": {
    "nama_lengkap": "string",
    "nomor": "string",
    "foto": "string",
    "provinsi": "string",
    "kab/kota": "string",
    "kecamatan": "string",
    "kode_pos": "string"
  }
}
```

Response Body Error :

```json
{
  "message": "Profile gagal dirubah",
  "success": false,
  "data": {
    "errors": "Number must be max in 15 character"
  }
}
```

## Get User By Token API

Enpoint : GET /api/users

Headers :

- Authorization : token

Response Body Success :

```json
{
  "message": "Berhasil mendapatkan User!",
  "success": true,
  "data": {
    "email": "string",
    "nama_lengkap": "string",
    "nomor": "string",
    "foto": "string",
    "provinsi": "string",
    "kab/kota": "string",
    "kecamatan": "string",
    "kode_pos": "string",
    "barang": [
      {
        "pengepul_id": 1,
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
        "pengepul_id": 30,
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
  "message": "Gagal mendapatkan User!",
  "success": false,
  "data": {
    "errors": "Unauthorized"
  }
}
```

## Get All Pengepul API

Enpoint : GET /api/users/pengepuls

Headers :

- Authorization : token

Response Body Success :

```json
{
  "message": "Berhasil mendapatkan pengepul!",
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "string",
      "nama": "string",
      "nomor": "string",
      "foto": "string",
      "provinsi": "string",
      "kab/kota": "string",
      "kecamatan": "string",
      "kode_pos": "string",
      "tipe": "string",
      "deskripsi": "string"
    },
    {
      "id": 2,
      "email": "string",
      "nama": "string",
      "nomor": "string",
      "foto": "string",
      "provinsi": "string",
      "kab/kota": "string",
      "kecamatan": "string",
      "kode_pos": "string",
      "tipe": "string",
      "deskripsi": "string"
    }
  ]
}
```

Response Body Error :

```json
{
  "message": "Gagal mendapatkan pengepul!",
  "success": false,
  "data": {
    "errors": "Unauthorized"
  }
}
```

## Logout User API

Enpoint : DELETE /api/users

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
