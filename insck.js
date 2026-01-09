
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTEwMDAwMDA5OCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExMDAwMDAwOTgiLCJpYXQiOjE3Njc5NzUwMTcsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTAwMDAwMDk4In0.-swVZkpidWH4Zgvxq_ePqapt7dIL-0LokyW4VUYXFqWikwvlITe6pDauA8LUkBRadvUt1pgRW38Gl-YCM76BkQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
