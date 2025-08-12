const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODEzMDAwMDIzNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxMzAwMDAyMzYiLCJpYXQiOjE3NTUwMTUwMDksInVzZXJuYW1lIjoiYmFieW43MmV5In0.nNuqQplN8eZcMqBntYk-Mu0EfM230XgWNdUEDGRA7Nz85rK5oz4PGvPS1h7aXbc_B9mQxAkLSt6rM0bUh5WcaA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
