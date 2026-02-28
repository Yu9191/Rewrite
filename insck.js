
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzAxMDAwMDA4NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwMTAwMDAwODQiLCJpYXQiOjE3NzIyOTUwMDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDEwMDAwMDg0In0.AlspWV7kPUaRF64l4jFCj8DYttB_DuQt2swIoGqaK6THZvyMPKJPOnuK4ryXNfNb_E_l8TUrBCw5Dj49-wXu6A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
