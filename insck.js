
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjA3MDAwMDExMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwNzAwMDAxMTAiLCJpYXQiOjE3NjUwMzc1MTIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDcwMDAwMTEwIn0.p_PaVYYhA0eCRvNZa63IDXtiMLkFkjn0rv6lcrmD2sCmjar5YSiEg4RgWdXwl36AZtRXbHN5JNDhQRy6x1Vfag';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
