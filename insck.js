const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwMjExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDIxMTYiLCJpYXQiOjE3NTMwNTk0MjUsInVzZXJuYW1lIjoiYmFieTkyOTI5In0.YgHnz-2VJAkIACdJ80N0gzVEekN5w_lR_hNpASXJD3pssRDa9j1x4FkBVZ4MeP7bUAIi1X60bhdWPczuL5r6Lw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
