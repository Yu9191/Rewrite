const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzI1MDAwMDE2NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyNTAwMDAxNjQiLCJpYXQiOjE3NTMzNzM0MDQsInVzZXJuYW1lIjoiYmFieTB5ODBlIn0.cwvY0nuO-vM1yjp5iYMKCQlZjzMmZueZuaRVLS5VXSXZgdqqvMKh_R_LF4ePbpCi7R-itrbDTDT_CQnFaQ00DQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
