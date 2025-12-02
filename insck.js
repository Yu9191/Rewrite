
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjAzMDAwMDEyNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwMzAwMDAxMjUiLCJpYXQiOjE3NjQ2OTE4MTAsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDMwMDAwMTI1In0.YPURfb9mhmFoDrlws2kPH8HigCoIa8qz6a1spNrvFTSvf6UW-or7w40OvadtArWKB8qZaQy0VLcrQrY_37NqLA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
