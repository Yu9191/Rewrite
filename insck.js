
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDA4MDAwMDExOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwODAwMDAxMTgiLCJpYXQiOjE3NzU1NzgyNTksInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDgwMDAwMTE4In0.Js_ylV4zuGuA5SsbyppiFrk_m4qQX276dtluRM6U-QcVVpuH6K1lJgLxian4cK_2mE4ijN8naDEa9gSitlvdLQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
