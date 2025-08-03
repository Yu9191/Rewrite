const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODA0MDAwMDI2MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwNDAwMDAyNjMiLCJpYXQiOjE3NTQyMzc2OTcsInVzZXJuYW1lIjoiYmFieXE0b2pnIn0.typy2rU9n5HQG0trSs51ch4mF5UHh9EuflrUu4sack0VxQJfZxS3K9bBnEdA93TaKwd6bFdGKze_beGbmSGdkw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
