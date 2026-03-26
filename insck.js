
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzI3MDAwMDE3MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyNzAwMDAxNzIiLCJpYXQiOjE3NzQ1NDE4NDEsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjcwMDAwMTcyIn0.9WxAsAX0crgDxnSxT-u1gj9KW0OIhKCaJDODouDB4F4aJtEriaBgCk8CTk-YtrLCG6jrzElmg1CR0zeVx3GAew';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
