
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDA5MDAwMDExMSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwOTAwMDAxMTEiLCJpYXQiOjE3NzU2NjQ2MDUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDkwMDAwMTExIn0.CyBL0bHOkimw2H4cE9aBg_snFeDDNrE1_gGoyXxXflM19GmD-UyR7kkHtJuHiBT3U0iWXRriVElJu4oVE6q5mA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
