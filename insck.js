const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODAxMDAwMDI5MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwMTAwMDAyOTMiLCJpYXQiOjE3NTM5Nzg1MDMsInVzZXJuYW1lIjoiYmFieTdyZzNwIn0.0zaLIabDM2Ka4Z215HaiUyjuO1u5ODV8tXVot0EeLBzAKFt9qR3AOcC9QwmARxgMY37ZBQ3EKKQveSG8v2yqgw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
