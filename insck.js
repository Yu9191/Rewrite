
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTE4MDAwMDExNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExODAwMDAxMTQiLCJpYXQiOjE3Njg2NjYyMDYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTgwMDAwMTE0In0.UjK56sRSvgGdRIZzq_x60-vBB1nBdTNphjvAKg11EQfMQSTyiyX04O_prILKUh87ZHoHa4swAhwCfYMQiwfylA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
