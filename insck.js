const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2Vy';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
