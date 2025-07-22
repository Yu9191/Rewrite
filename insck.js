const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIzMDAwMDE3MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMzAwMDAxNzMiLCJpYXQiOjE3NTMyMDA2MDMsInVzZXJuYW1lIjoiYmFieWk4c3J5In0.JEFVjMlw68xkeoVOIxG97rF9RJjO63Uu1V7Srl-aZM0SKsD1PXFZt12KbWgcHQc4I-s12-WiEeGOGhdhCrEmCw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
