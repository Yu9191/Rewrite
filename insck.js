
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjIxMDAwMDExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyMTAwMDAxMTYiLCJpYXQiOjE3NjYyNDcxMzIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjEwMDAwMTE2In0.CV7t2ohaLMVJKxIetGIsNTfwawbzBjpDBI5-Ds5PbKd4SSpPNzpIC4EiimLWCHNMrx7n6_jFqpsmgiQkb3FYkQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
