
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjMxMDAwMDEzMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIzMTAwMDAxMzAiLCJpYXQiOjE3NjcxMTEwMTUsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMzEwMDAwMTMwIn0.MVyyeXpwhltKPaYpA-H0GEr-6S0D1S9QDriCc0wnKCA3pDbkqsAmAfBtsecDPK1nrTVKZgCX4fKR-P3Ah2Y81Q';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
