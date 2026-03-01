
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzAyMDAwMDA5NyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwMjAwMDAwOTciLCJpYXQiOjE3NzIzODE0MDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDIwMDAwMDk3In0.HCFFTXMxYH_PbWyM2WEUGw_ZvkbjuTMjmso5J6Hw0pI7BF-dfqceOv01R6p-218bBQh_Kmdud-jZrqaOKBvFWA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
