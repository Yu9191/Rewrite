
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTI1MDAwMDExOSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyNTAwMDAxMTkiLCJpYXQiOjE3NjkyNzEwMTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjUwMDAwMTE5In0.le4uq2X4KvGG8ig4i565_5lef010T3eiSM_VfBHQ-m71bhVtSfXdiCwtJbr4AV92gAPc6Uzx9qvM1Rej03TxkQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
