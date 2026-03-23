
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzI0MDAwMDE3NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyNDAwMDAxNzQiLCJpYXQiOjE3NzQyODI1NjUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjQwMDAwMTc0In0.vee34LRbE-61dTbqk7mjAMEhwl1M1I8CpEx53lG67sQOm1B1QGW-jrdMD4t-gEijnddJ1rJqAYfQnZ8gYtF9yg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
