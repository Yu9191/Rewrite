
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjE0MDAwMDE5NyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxNDAwMDAxOTciLCJpYXQiOjE3NjU2NDIyMDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTQwMDAwMTk3In0.gVxJ1XhO98YrrUyhd1iDl9JiQzxKhIZWgK0cIBQ0J15NV8iLJrI_VyzqY4LeC37PM8L_DmtVBQpktbg6syqKfg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
