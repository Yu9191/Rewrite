
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTE0MDAwMDExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExNDAwMDAxMTYiLCJpYXQiOjE3NjgzMjA2MzksInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTQwMDAwMTE2In0.Xj72bbl0by4T2wR14P3Sqg8lPF6S0o4aOHVUqdiBrIZQS-LgUFIxDT0yN6nQdaLd0pw76SOLP_e7dGF87r1IYQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
