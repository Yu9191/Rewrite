
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjI3MDAwMDEwMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIyNzAwMDAxMDMiLCJpYXQiOjE3NzIxMjIyNDAsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMjcwMDAwMTAzIn0.xuIgfyqNCDdXi-iNdjA3RC39WnX0_Qr3Lk8dLarFb6l0aDyKF3BNI765Huqb1E7-FTbkQBI4hSlEkLXBmBv8Qg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
