
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzI5MDAwMDA5NyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyOTAwMDAwOTciLCJpYXQiOjE3NzQ3MTQyMDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjkwMDAwMDk3In0.cagc5mfpN8p3X8s1u39GMr9KdTNTBOKhdhrImCmoOasq2D-oeDAsZaQFUPbGAaDPiEre5Xmihx0qd3vWo0x6fA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
