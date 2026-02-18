
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjE5MDAwMDE4MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIxOTAwMDAxODAiLCJpYXQiOjE3NzE0MzEzNTEsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMTkwMDAwMTgwIn0.b7eJignBEiLro4nDWzEfhahNfY7_kGdTA6SVrbHIRL5WJZ-NscggI6XX5Y8a7PJfmOsA_1Q2SZ439OmDhIzofw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
