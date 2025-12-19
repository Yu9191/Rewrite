
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjIwMDAwMDEzMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyMDAwMDAxMzIiLCJpYXQiOjE3NjYxNjA2MzcsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjAwMDAwMTMyIn0.IUa-OzaNt34yHmHiuIWyxmM16xl2rYspoGIOhn7qBWdqI64P81c_K2ellut9dfNweKhKv1jUpbxJsxKOlCHADw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
