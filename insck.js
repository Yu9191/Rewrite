const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzI1MDAwMDk0OCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyNTAwMDA5NDgiLCJpYXQiOjE3NTMzNzYwMDEsInVzZXJuYW1lIjoiYmFieXNpYXJoIn0.PRYKMcua-A9XKyNWidce0f_9dsi9kyzT3HMKvPMYVds3qcvv3a5HNnQdd8nSvpSK3QFvHbcbthe9sIrjgxutXw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
