const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODEyMDAwMDE5NiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxMjAwMDAxOTYiLCJpYXQiOjE3NTQ5Mjg2MTgsInVzZXJuYW1lIjoiYmFieTJ0NmM5In0.YZijXQexWcHpGqGpHm-HMHiY7YI0na1dsPXZz7oTrxiaRpJf5RMC4nj98kTcgHe2mUdl6LAEnxSymu0cXcv_1Q';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
