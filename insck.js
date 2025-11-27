
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTI4MDAwMDA5NiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyODAwMDAwOTYiLCJpYXQiOjE3NjQyNTk4NTksInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjgwMDAwMDk2In0.AbIuT-bRjpcfuIeQqprLPjR3iFxbExoivVyumfPuFVUOUogAhbafT5FNBNzz0n4idnwAgPV-_jFTSTKcmikSHg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
