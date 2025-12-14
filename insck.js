
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjE1MDAwMDEyMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxNTAwMDAxMjIiLCJpYXQiOjE3NjU3Mjg2MTIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTUwMDAwMTIyIn0.Z1m4CfeRNdQAdKZ06m3vXRHQ5YrozMy9FqqZNyKuldXajXIY09AkJcHYL1u5I-nguihpYq03wlk4aJlqSls10Q';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
