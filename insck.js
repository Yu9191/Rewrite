const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwMjExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDIxMTYiLCJpYXQiOjE3NTMwMzkyMTgsInVzZXJuYW1lIjoiYmFieTkyOTI5In0.b8UsUT9jR7JZnWawre__tbqN4qj3ww8Juk_oEQhNEwfNDhnhI_xFdjs6IjJ8oHdgcuE1ca9xv9U1OEk4ZAV4Qw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
