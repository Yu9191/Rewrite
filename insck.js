
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzA2MDAwMDA3OSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwNjAwMDAwNzkiLCJpYXQiOjE3NzI3MjcwMTUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDYwMDAwMDc5In0.PwSjx782wPAHZeXOjElAGQEux1s9q3zIEIBr7x247xLuh4l1klhFkIlVafMeWPGBGFpMLC9Ihq5_UU4J0sX2yQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
