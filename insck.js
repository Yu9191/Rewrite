const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODI0MDAwMDE1MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgyNDAwMDAxNTIiLCJpYXQiOjE3NTU5NjU0MDMsInVzZXJuYW1lIjoiYmFieWJ0YjdjIn0.IONzh53n1GJMvEA1ndE0_MRb7DXbkiiCtSdM__jHnRXuNO2dcgdgkVPcsPBqMAh6Ldo4f_cFTpITR7_gSrwK0g';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
