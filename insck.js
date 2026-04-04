
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDA1MDAwMDEyMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwNTAwMDAxMjIiLCJpYXQiOjE3NzUzMTkwMDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDUwMDAwMTIyIn0.8uOb_1ArGWj9DgbnSxyRJfk8CDk9eVTryafUZnqZs6zYxQhx6fZuGAukqgnJbkJfRFk5B053ErQ8LiYzzMK-yw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
