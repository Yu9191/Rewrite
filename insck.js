const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwMjExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDIxMTYiLCJpYXQiOjE3NTMwNjAxODQsInVzZXJuYW1lIjoiYmFieTkyOTI5In0.CCSLgzSLSF5a9Ve2fiDGiIHYWpRPE2tbWdXhaCG4Zm0r2TiOjCv0_2hH8OeFfKnV60wz1K0DbYnAxqBDmYK4Eg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
