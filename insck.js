
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjI0MDAwMDExNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyNDAwMDAxMTUiLCJpYXQiOjE3NjY1MDYyMDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjQwMDAwMTE1In0.JnDbKXx2G_JulsLNqPabBXQtpAFU5W3u3vjDNhPJ1Df86P0--Sj8VA96nK2dXw0pFW0d7OXb8QdtK_Sx3sQ4Sg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
