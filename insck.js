
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTEyMDAwMDA5NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExMjAwMDAwOTQiLCJpYXQiOjE3NjgxNDc4NDksInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTIwMDAwMDk0In0.E0sGKuPCS0x69cOBib_GFrSqzAljD-5MKkySmOGELdcAFN7akSG6CSzWPvM6waY5tQAbdjF16bfCQjiMwRfN5Q';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
