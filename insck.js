
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTExMDAwMDEyNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExMTAwMDAxMjQiLCJpYXQiOjE3NjgwNjE1MDAsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTEwMDAwMTI0In0.jAYzkVfwzHJ5s1hXFDNYRgY530C9mLpBmhN1qgSW_RgKzSvOuEcdOLJSNdTs57ANdfC1aujxwG9iTK2bc1YRRQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
