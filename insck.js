
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTA3MDAwMDEzNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwNzAwMDAxMzQiLCJpYXQiOjE3Njc3MTU4MTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDcwMDAwMTM0In0.TVs_EBx4248-9nB7cMAdgoq0jTFTTVdxLUyOcStmiwcKwdoy56MMLmtZ-zjCqYlQQIal8je6N3jeui30cVRsJA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
