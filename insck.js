const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODE3MDAwMDE5MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxNzAwMDAxOTMiLCJpYXQiOjE3NTUzNjA2MDIsInVzZXJuYW1lIjoiYmFieXdxY3FrIn0.Xn5VTYpFECSGqDVIccWIDLv2ra4ZC6-2VaWRDc-HpWZWIAHjoReG0RI1wHo-NV26y4E824PkenoOGkQJf2Tjxg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
