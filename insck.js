
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTMwMDAwMDA5NiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEzMDAwMDAwOTYiLCJpYXQiOjE3Njk3MDMwMTQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMzAwMDAwMDk2In0.wGE6CQ_2oTmMHfyUkK6GEbMejV1ZmrMNL1TTRaJcE4JBQnWtbmm8JrG3i2zBbo_ii8Ke8hYDCqpoTMH_G0AH7w';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
