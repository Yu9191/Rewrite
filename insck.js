
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjI5MDAwMDA5MSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyOTAwMDAwOTEiLCJpYXQiOjE3NjY5MzgyMTgsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjkwMDAwMDkxIn0.vHD_lKU_iRBB_MmVtTczTnLU34Lbe9l9jzpklU2KqzFk3L-813r3wlJrEg8R95b60ReOBu6KAkcq809Hth7n9A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
