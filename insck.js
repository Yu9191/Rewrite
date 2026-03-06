
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzA3MDAwMDA4OCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwNzAwMDAwODgiLCJpYXQiOjE3NzI4MTM0NDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDcwMDAwMDg4In0.AdDirAtqpXMalBZ10mTLCPbpSIpSFiy_ma3hUjDLJIOT7VEXI0MYiNI8dpxri2wMsa8YyDbVqrj-fKyxIV6nQQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
