const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwNDU0NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDQ1NDQiLCJpYXQiOjE3NTMwNjAxNTcsInVzZXJuYW1lIjoiYmFieXE0MGRmIn0.XKp3HpcLQeXdgCVScf3ET8RaVztJCmfBkg5hoCwjZ7BBozxKwiy-2IzaQwpUg1vmO-iJOlxuDrybXOOlqWmqnA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
