
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjE1MDAwMDEwNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIxNTAwMDAxMDciLCJpYXQiOjE3NzEwODU0MDEsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMTUwMDAwMTA3In0.jFTy0f4-ptW-tOwn9Kw14NbG4hepcnsAn0B6IV9lNorbqqVS2PqbV0lrwoR4aSp9YyJv4uiibAtB_Y2b82F_eg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
