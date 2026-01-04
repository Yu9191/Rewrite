
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTA1MDAwMDE3MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwNTAwMDAxNzAiLCJpYXQiOjE3Njc1NDMxMjMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDUwMDAwMTcwIn0.MtG-fQUWFsWi5KTg8EJdj9GM1A-T6Ydhv2nYwQjwJMjkDo7aMXCybs_EjSgDksfXBxYvUckreZIRvmlLHiAidg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
