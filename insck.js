
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzA0MDAwMDE0MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwNDAwMDAxNDIiLCJpYXQiOjE3NzI1NTQzMzAsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDQwMDAwMTQyIn0.dOlIUlvteksdvcO4ViEP-bYGIH818vEI9If3LRbUL1wrkZsA2efeHBlfR99GFpqReY_AHCl412ZOpbKC55RHJg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
