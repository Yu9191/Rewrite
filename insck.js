
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDAyMDAwMDEwMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwMjAwMDAxMDIiLCJpYXQiOjE3NzUwNTk4MjMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDIwMDAwMTAyIn0.JhNp4lDZhZIslKLyP5vZ_XUZcB6KGlwxi_LK1WnlTgcYVCUpDNsfOgvmYSoSdQiyAjb-Ax9n2nNPZuvtvJqHCA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
