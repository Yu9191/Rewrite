
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjEzMDAwMDEyMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIxMzAwMDAxMjMiLCJpYXQiOjE3NzA5MTI2MTQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMTMwMDAwMTIzIn0.BdZvB3xU10vR0MtnwZbuJwb8eY30DZDhwicRLgJ-ySCcT5gYkv8WCkuqoJtpa0lalDyzcmirGN7_OwJbdja0MQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
