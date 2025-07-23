const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzI0MDAwMDE5MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyNDAwMDAxOTIiLCJpYXQiOjE3NTMyODcwMDEsInVzZXJuYW1lIjoiYmFieTJuOXc5In0.fUi1i3i4kVgc-xsZUngAvZjWzTSoI-K_3Eb8W2_4kiE8Yh6eeMZpzcHfC0O4Bdpv2kfvIzsDMppQaLnAesZ2iQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
