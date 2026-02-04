
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjA1MDAwMDEwMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIwNTAwMDAxMDMiLCJpYXQiOjE3NzAyMjE0MTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMDUwMDAwMTAzIn0.EL3_k9W28BPXCBjh809a3hu6mrJ5MaqqX-9pM3Msqv95QhFBciAAHhm1wNMOCf_SrRjBKrBvw7Pq8DZSYfAQAg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
