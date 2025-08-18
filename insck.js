const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODE4MDAwODkwNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxODAwMDg5MDYiLCJpYXQiOjE3NTU1MDg5NDUsInVzZXJuYW1lIjoiYmFieTZqZTlxIn0.vWMK0Fa3Z4mkJh8FJvQlk3bmvrJgRVdEZL_hPFWCj002cEGwFGEMoSNxByat7tI5bAEABAX-1w2uRvVb8_vGDw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
