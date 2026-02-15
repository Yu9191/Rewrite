
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjE2MDAwMDA4NyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIxNjAwMDAwODciLCJpYXQiOjE3NzExNzE4MjQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMTYwMDAwMDg3In0.W4a8GDOqrVt5lI0AmyoHtBJfrByNUnW-L3i0pGOL6PNYaB3ZL1HubvqQODyQKyL7i5t5PyeYlWEbGzWgCxRwPw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
