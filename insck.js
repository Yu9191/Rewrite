
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTA5MDAwMDEzMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwOTAwMDAxMzAiLCJpYXQiOjE3Njc4ODg2MTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDkwMDAwMTMwIn0.EEm2ODnZvgbMT6gQtELPM-Z6e4Zu_qUePTMjgaOlo09CAl_bkOtD4HZniHUTh57kwST0mVr3mmv8nP8p7G4puQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
