
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjMwMDAwMDEwOSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIzMDAwMDAxMDkiLCJpYXQiOjE3NjcwMjQ2MTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMzAwMDAwMTA5In0.Zr6-fqj0Vij-dwBkuiOFgVE4csgW-Lod1j6B7dCsaWFJteM-JyPfBmfeNYIMpcCMy0dunXGzu8ABqTuIHNAv9Q';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
