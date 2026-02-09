
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMjEwMDAwMDExMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDIxMDAwMDAxMTIiLCJpYXQiOjE3NzA2NTM0MTksInVzZXJuYW1lIjoidmlzaXRvcl8yNjAyMTAwMDAwMTEyIn0.56RKbwIFQK8dUPPIAxVuwvs5hgEFQEr4T80e_-MGidwLHVL7nH28-un8rYmaoaTCWIuhy37yrWqv4cExxxUe5A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
