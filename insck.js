
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzIxMDAwMDA4MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyMTAwMDAwODAiLCJpYXQiOjE3NzQwMjMwMDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjEwMDAwMDgwIn0.V1Uk1ZEjwScXWkbmM1M2VY9RSoeT-TnlP11N5KYJRZeC_oEsH044gRPks0v1PG3E0B8jsMEaeEeaXWq6JIPHXw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
