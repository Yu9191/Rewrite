
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzE5MDAwMDA5OSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxOTAwMDAwOTkiLCJpYXQiOjE3NzM4NTAyMDUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTkwMDAwMDk5In0.po7ZWQZHLFEsaPwhMVVAsPCWYWyX5mqwQgFKIBxc2r3iw6PElzj1-t7lFR3Kl0npaPRN7mXLXYcyJ6LWYL-CjQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
