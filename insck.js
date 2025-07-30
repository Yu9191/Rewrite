const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzMxMDAwMDIxNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDczMTAwMDAyMTUiLCJpYXQiOjE3NTM4OTE4MDMsInVzZXJuYW1lIjoiYmFieXV3YTltIn0.mCgkoY9eSaZgPeF72tmpu1gKH7K0hlavRoeCPd0j5p-QZDRFGQ0Jjhz39GFvOTdNvDtttgI6OXn3s3Uy7LEEeg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
