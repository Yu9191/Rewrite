
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTI0MDAwMDEwNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyNDAwMDAxMDciLCJpYXQiOjE3NjkxODQ2NTEsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjQwMDAwMTA3In0.Z37XuMQqJkiVw1HUaiESCBb-MMtCi3Fw7pTtSuWEDq3RliSue6ITWm512LMgq4OYS7v8C75c79e0zfGwPT689w';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
