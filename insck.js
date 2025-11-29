
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTMwMDAwMDEwMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEzMDAwMDAxMDIiLCJpYXQiOjE3NjQ0MzI2MjIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMzAwMDAwMTAyIn0.83EcW1i0wYuH1ECXlGTzZSHPuhCS3ElN7A4hMuH2FIrmA1n-bSuxDizKi3wYHGyuoskjavxuPu9Q16GqICDjkA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
