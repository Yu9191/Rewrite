
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjA0MDAwMDEzNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwNDAwMDAxMzYiLCJpYXQiOjE3NzAxMzUwMTgsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDQwMDAwMTM2In0.PALlBphUi0m77XBrqp1CQPOXbKXrrTikBsSIjZ9CY_a-h4eQ5bPTI0MtPdrLAJxkByFrVaxpXoK0jN_qcd3Krw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
