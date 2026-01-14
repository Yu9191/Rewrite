
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTE1MDAwMDE0NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExNTAwMDAxNDUiLCJpYXQiOjE3Njg0MDcwMTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTUwMDAwMTQ1In0.6CoL06RfxDUhyZEd2iWBVh7wmSfeQLSmtsCTKSwUhYRhwEEmuocs1SfJFoxbITX4Xblgjo-a6HW6MjlyiHXkaA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
