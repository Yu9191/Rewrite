
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTE5MDAwNTUxOSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTExOTAwMDU1MTkiLCJpYXQiOjE3NjM1NTQ2MjQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMTkwMDA1NTE5In0.PDZ3XJl-jkONtjSWlIc7qJ2sYNllvhlfw0dlKZcJgi0JhVZ7cB9qgsJ4wSCRD0MtokhhoZvccs6ztbwQwNmXBg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
