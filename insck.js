
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjAyMDAwMDEwNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwMjAwMDAxMDYiLCJpYXQiOjE3Njk5NjIyMTcsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDIwMDAwMTA2In0.ttHsiWk__sSoSZPRU8peRnxGD4OPaNwQr6rO1enW2q63P0Txc_jGdEpd6bBCYUxpHea59gt-g4BdDSiabV7xsw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
