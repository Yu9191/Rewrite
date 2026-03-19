
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzIwMDAwMDEyMSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyMDAwMDAxMjEiLCJpYXQiOjE3NzM5MzY3NTEsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjAwMDAwMTIxIn0.dOYg3ZpQ40TpGRC7kMpeoPjxeA3Dt-E9G2YUrVzqfK5l6QyNGANLZwWF_gKwBn4q8aaDErAJTOr7f2iGgDe5gA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
