
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTE5MDAwNTUyNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTExOTAwMDU1MjYiLCJpYXQiOjE3NjM1NTQ2NzAsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMTkwMDA1NTI2In0.b5xz8YN_CummDc5EJchh5lpzyEo5nILUHLe1_GQZA5q0b0pLaxCHkkKdPTVhzjKteetLJWDFHOIC3PPcoTsYkA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
