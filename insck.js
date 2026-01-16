
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTE3MDAwMDE2NiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExNzAwMDAxNjYiLCJpYXQiOjE3Njg1Nzk4MzcsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTcwMDAwMTY2In0.kfvSdFB2q7agmgYisTPBqLZ1m1IqA3lkkQ-8rAua0qH5NtwFd8Q82z7HShuZU-pvBF-1OKxnYP-z9y9OuVy9Qg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
