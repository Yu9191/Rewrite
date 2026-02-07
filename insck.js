
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjA4MDAwMDEwNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwODAwMDAxMDUiLCJpYXQiOjE3NzA0ODA2MTUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDgwMDAwMTA1In0.PYAojiflT8ncyENJkD0Wi_j8P9oBYa6SBtrE-YbmCbBa3hZqc4hS4KxCQm56_crymAzGbN3Z0Q4V1vCq3BOsQA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
