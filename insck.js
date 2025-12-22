
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjIyMDAwMjU2OCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyMjAwMDI1NjgiLCJpYXQiOjE3NjYzNjI3MzgsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjIwMDAyNTY4In0._rwfyO7ONL3xeP7XV0WIZ6Ib07wofq_DQQEVbahRm6kQCDyIcgLxc5XwlvqfdyMiZp7Rl9jGk8b9pmJH0hHg1Q';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
