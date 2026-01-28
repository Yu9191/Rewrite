
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTI5MDAwMDEwOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyOTAwMDAxMDgiLCJpYXQiOjE3Njk2MTY2MjcsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjkwMDAwMTA4In0.ccdCiJTyIIGMOf5F0_1r-dEW3c2kOpssf8vyLpwYizPHyt9-AkysLrgULHjjpr8_NzfGQEgTriEUwwl4cJgMKg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
