
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzE0MDAwMDE1MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxNDAwMDAxNTAiLCJpYXQiOjE3NzM0MTg1MDUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTQwMDAwMTUwIn0.gWs6eDYleixnKOaWllrwAqm69bQjRIKaCXeDeJIemdM_RKZj19noIcv0Cn47nDPqtsxTJwsogm-PqBcLvf1KYQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
