
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzE4MDAwMDEzMiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxODAwMDAxMzIiLCJpYXQiOjE3NzM3NjQwODMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTgwMDAwMTMyIn0.a9tCof0zRmkhE7OC9umDkFnCSkdnHHbjj9EUAZ9cUg1V0KSTrHqBQ2U0hN-o0Ej3BlIx1iJUB37ptCYVbO2thg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
