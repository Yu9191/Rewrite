
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjI2MDAwMDExNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIyNjAwMDAxMTciLCJpYXQiOjE3NzIwMzU4MDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMjYwMDAwMTE3In0.LhKerIS1jF31-FZRrBS2iHxYaj-kCc4QcGv8EF_2elHY3PexZunE_Hlr3yiOEdU8ofrZ8TBIaCvaSFd4qeHRWw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
