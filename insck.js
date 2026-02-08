
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjA5MDAwMDEyOSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwOTAwMDAxMjkiLCJpYXQiOjE3NzA1NjcwODMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDkwMDAwMTI5In0.JzxKrHK_rLlvS1sUfivZfO2hYnCB6zwcMho5zcCFClHGVt86EQ_gzSRd90dfEFC0AP7VxciYlwsNfZO2byLeLQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
