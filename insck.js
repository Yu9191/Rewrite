
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDA3MDAwMDA5MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwNzAwMDAwOTIiLCJpYXQiOjE3NzU0OTE4MDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDcwMDAwMDkyIn0.et4ezfB6rQILSk_l2gYO78R6pxGGqtNUEPMKFszn5bvrunlZTxJtrFTY-pnrPclf9Lhs5lc3NQ_is8rIwOWNfA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
