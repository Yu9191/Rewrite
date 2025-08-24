const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODI1MDAwMDIwOSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgyNTAwMDAyMDkiLCJpYXQiOjE3NTYwNTE4MzYsInVzZXJuYW1lIjoiYmFieTY3YXJ3In0.o5z0P0uh497Ge4MbupcaTrntH0onamf86kC-710F5pRhcm4XFJ4UdIljqWI1K_g0oXn8JAELtaA7Y4kcDizIyw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
