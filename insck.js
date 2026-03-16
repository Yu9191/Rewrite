
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzE3MDAwMDEwOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxNzAwMDAxMDgiLCJpYXQiOjE3NzM2Nzc0MDYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTcwMDAwMTA4In0.2gNG2RTCNjpyRRqK6DCT-Z45hixWIENCRDcRpsrnKnTaxnLqcXqUKj4tWd2fwsQSprADpRBGRanaZGw-J3Ercw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
