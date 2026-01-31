
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjAxMDAwMDEwMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwMTAwMDAxMDMiLCJpYXQiOjE3Njk4NzU4MzYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDEwMDAwMTAzIn0.-rlIUKWsjEsH6eX51_3sJaVL96rMKSVbmLSvIgeWNolca8us2-Lvb1hPKkf48zyP4vPO3Hu9L9p9k33fRqBlZg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
