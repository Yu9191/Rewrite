
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzMxMDAwMDExNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMzMTAwMDAxMTUiLCJpYXQiOjE3NzQ4ODcxMjMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMzEwMDAwMTE1In0.oVGdIrUCAqLsnWF3bsyFNeDcTRpVcPHbiA6O1yHmQhPd8pPxdx-jJN3rqmTqyFy8Cx_6UKdxdCkpzWvCpEZncQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
