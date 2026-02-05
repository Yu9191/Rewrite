
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjA2MDAwMDExMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwNjAwMDAxMTAiLCJpYXQiOjE3NzAzMDc4MTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDYwMDAwMTEwIn0.-tRnp2wHKelfUZgevnyaabZ2-ptm4e2Txna8sB8i8TPPp1aFQnKa5nbz1nWP1wnFOK3ny-p8UFEI9TpTH6bx_A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
