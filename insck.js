const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODE0MDAwOTgxMSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxNDAwMDk4MTEiLCJpYXQiOjE3NTUxNjYxMzYsInVzZXJuYW1lIjoiYmFieTByY2E1In0.P_uFPPPyDBIcC_Ld2MwIMobWHHndtf-E3Ts6gFUPW9L91_n5JbOdfaw9SBe3c3g5H1jWkmBwTTNjlTUAO0mPng';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
