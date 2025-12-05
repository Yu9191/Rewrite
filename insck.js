
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjA2MDAwMDExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwNjAwMDAxMTYiLCJpYXQiOjE3NjQ5NTEwMTIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDYwMDAwMTE2In0.9yiAUj0TLWckMvcy0XB-9gp2ImjD1fMdeFRJ_H3RR8XLScCMzNDXCzF1b5rgxxr0I2q_V0WVOkmUu9fBtTORdQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
