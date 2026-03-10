
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzExMDAwMDEwMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxMTAwMDAxMDMiLCJpYXQiOjE3NzMxNTkxNTEsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTEwMDAwMTAzIn0.CHGDUkOlDZMrxxgCEBS6fb5fjzDmykD8-EYmvReqbUb2CQsSxxKe0kcZKwMq0PZZI8ODqVa-6ZSWWh5zSAZMbg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
