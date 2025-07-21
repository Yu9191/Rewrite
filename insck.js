const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwNTQ0NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDU0NDUiLCJpYXQiOjE3NTMwNjk2OTksInVzZXJuYW1lIjoiYmFieWZpNTV4In0.m1o0Xkj4EFksZlbMoemt53gedIPhounfMLL_24xAutvztLnmwiT3Yf2_TCBSsdagI2SjLhKLrw5R-8Bszo3sxg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
