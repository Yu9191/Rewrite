
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDAzMDAwMDA5NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwMzAwMDAwOTQiLCJpYXQiOjE3NzUxNDYyMDEsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDMwMDAwMDk0In0.tbefSR4DvSY20M0W9lilEbRAp0WuUO7hI3CsRktm3-PRXivuNQuM3cvZSza0gSQtUOHk6gTYHprvjyZc5EXGEw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
