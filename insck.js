
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTE2MDAwMDE0MSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExNjAwMDAxNDEiLCJpYXQiOjE3Njg0OTM0MDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTYwMDAwMTQxIn0.R7WWa15No7__Q48SR7L-wSHM15dEMS2gD4GzbJFV4gZr3MSOYEyjEksK2aLv2p55CP6wtvSd9YnYFzBdt_VMyw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
