
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDAxMDAwMDE3MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwMTAwMDAxNzAiLCJpYXQiOjE3NzQ5NzM3NjIsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDEwMDAwMTcwIn0.WpoazLmCeuF3U_2BHC1rh5IwxW0WXuqKB6RQ0JObS_ynQdcjZ4Dx2_ZDcoPIulx9H-HUHQbz64YnUEvMhvIusQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
