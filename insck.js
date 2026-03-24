
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzI1MDAwMDEyMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyNTAwMDAxMjMiLCJpYXQiOjE3NzQzNjg2NzgsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjUwMDAwMTIzIn0._ghxiC3y4efkfLqoHSPr-37c1_pUhtTgVTl0pmZod7BKCYNIvpWt2oUQJPTvKj5d8ibyvlRkIe09dMtsTStoEw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
