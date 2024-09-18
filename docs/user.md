# Dokumentasi API User

## Base Url

## Register User

Endpoint : /users/register

Headers:

- Content-Type: application/json

Method : POST

Request Body :

```json
{
  "username": "baru",
  "email": "baru@example.com",
  "password": "password123",
  "role": "user"
}
```

Response Body Success :

```json
{
  "message": "Berhasil mendaftar",
  "data": {
    "id": 10,
    "username": "baru",
    "email": "baru@example.com",
    "password": "$2b$10$tWuptFNUAGCOLGaM35qgDODf0drpGGjLAF/haeC8HRl.uuvhfnWVi",
    "role": "user",
    "updatedAt": "2024-05-22T01:57:37.439Z",
    "createdAt": "2024-05-22T01:57:37.439Z"
  }
}
```

## Login User

Endpoint : /users/login

Headers:

- Content-Type: application/json

Method : POST

Request Body :

```json
{
  "email": "baru@example.com",
  "password": "password123",
}
```

Response Body Success :

```json
{
  "message": "Berhasil login",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MTYzNDMwOTcsImV4cCI6MTcxNjM0Mzk5N30.kGYREK2R4eX1KaGNOUHdsN314CdWp4GhE6nZrU4E130",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MTYzNDMwOTcsImV4cCI6MTcxNjQyOTQ5N30.2xh1mbSbxYfI30IJLWgVGrUuSxDxD9EizqEQWi7ITiQ",
    "user": {
      "id": 10,
      "username": "baru",
      "email": "baru@example.com",
      "password": "$2b$10$xe/SH4DM4Sh9PJG0DRPoF.gq9IlK4..vAdYHzKad5ZJtcmi7jAGJm",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MTYzNDMwOTcsImV4cCI6MTcxNjQyOTQ5N30.2xh1mbSbxYfI30IJLWgVGrUuSxDxD9EizqEQWi7ITiQ",
      "role": "user",
      "createdAt": "2024-05-20T00:49:12.000Z",
      "updatedAt": "2024-05-22T01:58:17.062Z"
    }
  }
}
```

Response Body Error :

```json
{
  "errors": "Email dan password tidak cocok"
}
```

## Get User

Endpoint : api/users/:id

Headers:

- Authorization: Token

Method : GET

Request Body :

```json
method: 'GET',
headers: {
  "Authorization": "Bearer ${token}"
}
```
Response Body Success :

```json
{
  "message": "Berhasil mendapatkan detail user",
  "data": {
    "id": 10,
    "username": "baru",
    "email": "baru@example.com",
    "password": "$2b$10$tWuptFNUAGCOLGaM35qgDODf0drpGGjLAF/haeC8HRl.uuvhfnWVi",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwicm9sZSI6InVzZXIifSwiaWF0IjoxNzE2MzQzNDQ0LCJleHAiOjE3MTY0Mjk4NDR9.WHQaQdBOgh25kD-eow5H1ig5xh6Sj6csuZJm0rOLctQ",
    "role": "user",
    "createdAt": "2024-05-22T01:57:37.000Z",
    "updatedAt": "2024-05-22T02:04:04.000Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "No token provided || jwt expired"
}
```
## Update User

Endpoint : api/users/:id

Headers:

- Content-Type: application/json
- Authorization: Token

Method : PUT

Request Body :

```json
method: 'PUT',
headers: {
  "Authorization": "Bearer ${token}"
},
body: JSON.stringify({
  "username": "testing"
})

```
Response Body Success :

```json
{
  "message": "Berhasil Mengubah User",
  "data": {
    "id": 10,
    "username": "testing",
    "email": "baru@example.com",
    "password": "$2b$10$tWuptFNUAGCOLGaM35qgDODf0drpGGjLAF/haeC8HRl.uuvhfnWVi",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwicm9sZSI6InVzZXIifSwiaWF0IjoxNzE2MzQzNDQ0LCJleHAiOjE3MTY0Mjk4NDR9.WHQaQdBOgh25kD-eow5H1ig5xh6Sj6csuZJm0rOLctQ",
    "role": "user",
    "createdAt": "2024-05-22T01:57:37.000Z",
    "updatedAt": "2024-05-22T02:08:35.705Z"
  }
}
```

## Delete User

Endpoint : api/users/:id

Headers:

- Authorization: Token

Method : DELETE

Request Body :

```json
method: 'DELETE',
headers: {
  "Authorization": "Bearer ${token}"
},
```
Response Body Success :

```json
{
  "message": "Berhasil Menghapus User"
}
```

## Logout

Endpoint : api/users/:id

Headers:

- Authorization: Token

Method : DELETE

Request Body :

```json
method: 'DELETE',
headers: {
  "Authorization": "Bearer ${token}"
},
```

Response Body Success :

```json
{
  "message": "Berhasil Logout"
}
```