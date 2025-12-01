
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjAyMDAwMDA5OCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwMjAwMDAwOTgiLCJpYXQiOjE3NjQ2MDU0MzMsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDIwMDAwMDk4In0.2Pc9lRyh9okD7_5zgase2vGthBmm82mYzTKEmARSHZ0R2T4S6iBzYQ4SBKaj7iC6QevcL5TPP2odtuouFGtPuQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
