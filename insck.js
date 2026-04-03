
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDA0MDAwMDEwMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwNDAwMDAxMDAiLCJpYXQiOjE3NzUyMzI2MDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDQwMDAwMTAwIn0.3sbNn1sV9z7NqYxV_I2ryT_-2hnRHJd3eDD6qu7d7cXkloI7q3H-rCxkBWmOI-rb9wnQSjtZvb2vj3MdVF26Pg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
