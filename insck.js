
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjI2MDAwMDA4MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyNjAwMDAwODIiLCJpYXQiOjE3NjY2NzkwMTQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjYwMDAwMDgyIn0.hIsQyVnN-twuMfYvfxLfoNXIIJv2kDJwb-xojpdonaXjclS-LfxvPhxtVLHP_wRYvyZmtP55f_05dEaF11H2Xw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
