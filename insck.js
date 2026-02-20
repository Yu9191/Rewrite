
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjIxMDAwMDA5NiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIyMTAwMDAwOTYiLCJpYXQiOjE3NzE2MDM4MTUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMjEwMDAwMDk2In0.hequVlhmyoSCHpudvowiK_lA6l6QY57JJpAHUbLlDchUOWfdxXiYJdTr5AoNxR9rII_-cYZGsGbLIz3H99Gy1Q';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
