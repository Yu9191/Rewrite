const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODA2MDAwNDE5MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwNjAwMDQxOTIiLCJpYXQiOjE3NTQ0NDI5MzcsInVzZXJuYW1lIjoiYmFieW1qd2tyIn0.SkPyuuUHMPbTiVFGQ-6IC6cc7R1A6IqqDkXaxf2AAgUORP3eML6IOKeDvEHtm7yaDl_tgXbyXWFcW8jcmUsOHQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
