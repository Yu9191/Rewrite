
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTA4MDAwMDEyNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwODAwMDAxMjYiLCJpYXQiOjE3Njc4MDIyMDYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDgwMDAwMTI2In0.LBuv1pHq5U2SFdESpu9KerooCJLWMiY3epHI0XeaIWQ7FSYWQf-to0v1mRo4MaE4-2CB9eM1Eg4ETfbHqwGPsw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
