
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTIyMDAwMDE0OCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyMjAwMDAxNDgiLCJpYXQiOjE3NjkwMTE5MDcsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjIwMDAwMTQ4In0.VxahguIS0grtwPqZQCwnVxTv4HZIAqLNy6AEsBi5Gamw9J-4x0jTTK5008hZ8xZUebE_fZMQBe8ftVW8FJjGMg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
