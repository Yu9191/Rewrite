
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTA2MDAwMDE2MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwNjAwMDAxNjMiLCJpYXQiOjE3Njc2Mjk3MDIsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDYwMDAwMTYzIn0.xte7pFenSTFzm7fkBa6n44cRVrgLSsAHaR5wILuBtltV4fSHfAELzk_AT8nCaeRG574uhixFRp7MOBO47MHRgw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
