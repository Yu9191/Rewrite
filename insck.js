
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjE3MDAwMDA0NiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIxNzAwMDAwNDYiLCJpYXQiOjE3NzEyNTgyMDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMTcwMDAwMDQ2In0.1MxrrMNhxaK4tFDUY_2fm9LeyNTS_1By31sN6PuYLKMPUOsyJzHsWMre3A_1pfGA-Vj5bc9UGIJGj944jF72Og';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
