const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIyMDAxMDAyNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMjAwMTAwMjYiLCJpYXQiOjE3NTMxODk5NzcsInVzZXJuYW1lIjoiYmFieTBlY2R6In0.gT7Sy2PGthqayNTM8dDtze2NL2wRnoJPtAL6q9MSG0MZaer1mGNnavbZqorGqlKHZNzwTu5S0BPlllC7jkmPyA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
