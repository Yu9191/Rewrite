const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzMwMDAwMDYyMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDczMDAwMDA2MjIiLCJpYXQiOjE3NTM4MDY5ODEsInVzZXJuYW1lIjoiYmFieXE2cmE0In0._rHYLly2xt0vn-izbSUolIXS_C698-SqMKhTrS7n1oc6CymXfKPt-gbiQpFhELoRRQim-w4OEPD7LFjIHy6Z0w';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
