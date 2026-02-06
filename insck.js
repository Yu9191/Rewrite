
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjA3MDAwMDEzMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwNzAwMDAxMzMiLCJpYXQiOjE3NzAzOTQyMjQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDcwMDAwMTMzIn0.AxCjO1ZVAfDU8kaog8iFJGUy5RGjwNIQ7z2B6WAO4IjOTkgz1pu6m30UVItPm73S4rgEW4R37Llf5CMxpmeJgQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
