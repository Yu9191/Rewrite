
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTI3MDAwMDE1NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyNzAwMDAxNTUiLCJpYXQiOjE3Njk0NDM4MzMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjcwMDAwMTU1In0.RGdnhNeyC8ljCaOHLZSdF4NuEflyYUDqMTrKBZspOVNk3FP7MrZUl2vYnagUYvUiRlY70mmAbT3hLDDnq1j17w';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
