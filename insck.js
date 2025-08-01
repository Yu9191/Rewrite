const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODAyMDAwMDI5MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwMjAwMDAyOTMiLCJpYXQiOjE3NTQwNjQ5MDMsInVzZXJuYW1lIjoiYmFieTVtYjRtIn0.7q9z013MIv5vsrePx9K1BVF1QdEUoRLpw6RnopXYv9JcL-0tQwm42kIg39ig1Zc6DT_V7MNJgu0MAK3-r5y8fg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
