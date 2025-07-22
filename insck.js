const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIyMDAxMDg2MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMjAwMTA4NjMiLCJpYXQiOjE3NTMxOTQ4MzgsInVzZXJuYW1lIjoiYmFieW5hbXVnIn0.bYTg1F1jQkZ2WSI7Pd1koEsV1VsEAmIwUMaYDXlHGP2WD9F-Vf_uwmyxVo9n6X5YdEffb36LQ0yiqtYHW07vKQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
