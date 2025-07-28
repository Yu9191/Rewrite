const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzI5MDAwMDY2NyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyOTAwMDA2NjciLCJpYXQiOjE3NTM3MTkyMTQsInVzZXJuYW1lIjoiYmFieWw4cnNxIn0.wZioRrItyTwRrP2ipov02Ymdr13LXpeZDpbbqTgQdrclSGc1KSVDBKDzxaPvCRwZk8h4czMZ2TnNdFBUXx-uUg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
