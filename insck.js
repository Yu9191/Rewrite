
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzA1MDAwMDEwMSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwNTAwMDAxMDEiLCJpYXQiOjE3NzI2NDA2OTksInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDUwMDAwMTAxIn0.Kh2uaai6HjVrbMGLrLy4w5AtuqyN42-9yS3xFRZgVzTCta88nYtxThFezUejrOH5et1SycPI46TsGm--KX_vyQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
