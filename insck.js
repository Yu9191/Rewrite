
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjExMDAwMDExOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIxMTAwMDAxMTgiLCJpYXQiOjE3NzA3Mzk4MTMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMTEwMDAwMTE4In0.43DoSD-eY0h502OIAFpR_I9r0845AXtVpQcpgEqZ0MvbHngE5FqqspCdaaow-UuIiqZh5CSuuDhxLwjOG4Jw6A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
