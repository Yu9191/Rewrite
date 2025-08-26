const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODI3MDAwMDE3OSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgyNzAwMDAxNzkiLCJpYXQiOjE3NTYyMjQ2MDMsInVzZXJuYW1lIjoiYmFieWhmaW45In0.FW2lU13LIJqfPCacPwMp_lM8FdjQzzIiuCzZMmjlYb0bkYySav3pC7JvGvLpkLoBxsUnzex1yckQcQHM9Sm2GA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
