
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTI2MDAwMDEyMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyNjAwMDAxMjIiLCJpYXQiOjE3NjQwODcwMDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjYwMDAwMTIyIn0.cTuN8LRBfsbjPLoBqgE7y0VYVlH0RiaNknyr1XkJXxmoo2QH7BVt1GYoZMMzdl6qDKvC285U7_FCBP8Vc1m-Tw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
