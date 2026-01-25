
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTI2MDAwMDEzMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyNjAwMDAxMzIiLCJpYXQiOjE3NjkzNTc0MzYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjYwMDAwMTMyIn0.fiugSwhEFQ5DcHZdLb2agZEmfj1DlxM6WesAkjIXJdcNKQxUVJ0mR0c31mfHBG1hA0Bv4uH4GHRv7tXyEWUbfw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
