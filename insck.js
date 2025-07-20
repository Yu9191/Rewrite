const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwMjExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDIxMTYiLCJpYXQiOjE3NTMwMzkwNjUsInVzZXJuYW1lIjoiYmFieTkyOTI5In0.TUcADe5pJBt-mCrYEIxvHzHyBdcLjxvy7zAtT-YSviLy1G3F2eWGALhd-2mevJoHNS7P0g3fDwfp0q_Z60pj7w';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
