const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzI4MDAwMDE3MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyODAwMDAxNzMiLCJpYXQiOjE3NTM2MzI2MDIsInVzZXJuYW1lIjoiYmFieTl3Yms0In0.lOLGsoPjs6cW73evmDOQ9FfnsPhu4u5m9SZ_p7o2uRKUnrQtHF8zQUAjTApONqkQGahPEeBfWxR2U4nScm1QJg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
