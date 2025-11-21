
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTIyMDAwMDEzNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyMjAwMDAxMzQiLCJpYXQiOjE3NjM3NDE0MDIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjIwMDAwMTM0In0.PpEDlDVvQVQcYbM1gBFYWZa5AHF91e8i1Rc1JAnabm7lz2hJC8SQsYMmq8Jwjq9BchPDXzFSsvTPC-GlMofbaQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
