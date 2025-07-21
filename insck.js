const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwNTQ0NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDU0NDQiLCJpYXQiOjE3NTMwNjk2MzAsInVzZXJuYW1lIjoiYmFieXYxejFyIn0.uqZifVTQRLzzYhY-3-75sMBplS4YOm21T4alUnxd5exbDn-C0LXAbWO2nSr0Ay38HMA-KykmkFMv0RFs2SStsA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
