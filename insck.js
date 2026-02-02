
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjAzMDAwMDEwNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwMzAwMDAxMDYiLCJpYXQiOjE3NzAwNDg2MDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDMwMDAwMTA2In0.MB1FDWqjX77Ly7yR4cdIs8j9RA7FwOmVnT8E1AtX6LDjDwHS7ATfqjyDwYkjg17hjoLrlJD_DZ_CyurqCfh4jQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
