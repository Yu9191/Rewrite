
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTIwMDAwMDE1NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyMDAwMDAxNTUiLCJpYXQiOjE3NjM1Njg2NzUsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjAwMDAwMTU1In0.8SVob81iTb1Xu9bA0l4rKpVTZy_JcSdPrbQPWSsS5t8LcQuxSolvNiSdNxREVwpzKH4Fxilr4XP0wXc8lS9W6A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
