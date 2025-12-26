
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjI3MDAwMDA5NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyNzAwMDAwOTUiLCJpYXQiOjE3NjY3NjU0MjUsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjcwMDAwMDk1In0.HZwF7_Z6XqVDm7ODddakEwhhmxh1myMbvWASLTOKP6_oEb7HM8rGbgu7pwt2j2xFofsmi7ImOCqi_-92Tw6UyQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
