
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTA0MDAwMDEyNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwNDAwMDAxMjciLCJpYXQiOjE3Njc0NTY2NTMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDQwMDAwMTI3In0.K1Chxk3-XO9RVfCGd4_bItFhqPSOp7r44Ft5CbZ2EXOWiHgHqGf7UylueMGiY-WkBZHO5ao1xrrLyVFsRX4bsQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
