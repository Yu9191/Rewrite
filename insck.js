
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTI3MDAwMDEwOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyNzAwMDAxMDgiLCJpYXQiOjE3NjQxNzM0MTAsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjcwMDAwMTA4In0.rHhGuZF0A_Etw0MCFX4nyCAd6Z4zhd5Vqq5pzaUVR1hAzVer7zYqQjV3MibgAA2lNBIgKZlQB_pgqdvSZjpBgg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
