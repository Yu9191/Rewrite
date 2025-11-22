
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTIzMDAwMDExOSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyMzAwMDAxMTkiLCJpYXQiOjE3NjM4Mjc4MTMsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjMwMDAwMTE5In0.RhVKpS6IhbfCrveHuNgFber2J4w5NFlI1sGMgORL8C7fD3adHcvZh3lPWLXJokRGQw-IZroK9Ul-olwz5S5JeA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
