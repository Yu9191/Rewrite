
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjEzMDAwMDE2MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxMzAwMDAxNjMiLCJpYXQiOjE3NjU1NTU4MTMsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTMwMDAwMTYzIn0.1ZFR4e6WZ9A-6uCW1v4q9CB7ayK_BTHposWofSSauhr-INKeuKSDL0nejXA1zKQJENBrkVDOftR3W_dKKB6RMA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
