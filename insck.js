
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjIyMDAwMDEyNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyMjAwMDAxMjYiLCJpYXQiOjE3NjYzMzM0MDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjIwMDAwMTI2In0.BB6ilwSrkzIjJ0Ll_RxTvdTOVUmB2yS8mugqZXdhoGaeBK6FAYsD_SeTf4VrDKUOtTrhgJxX6rdM2jUdD2XngQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
