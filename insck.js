const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwNTQ1MSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDU0NTEiLCJpYXQiOjE3NTMwNjk5NjQsInVzZXJuYW1lIjoiYmFieTl6a3ZqIn0.W1F18dGrYVzpJHOY6DnAjtd-ogWdn7TSOf7N3zMV0BB5XhvMT_V1ouJH_CA6-9PnAT-m8b7NerWLUSuWiXlLnw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
