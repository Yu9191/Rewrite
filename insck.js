
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTAzMDAwMDEwNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwMzAwMDAxMDciLCJpYXQiOjE3NjczNzAyMTAsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDMwMDAwMTA3In0.dFCTkD3yQIc7kEzILV-rD45Xwo0TkOyWTiiSzcL10MDzK_fhI76xQZg359RsIKOaw0WeUuyqa9X6jIYQIOUVtQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
