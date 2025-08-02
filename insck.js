const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODAzMDAwMDIwNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwMzAwMDAyMDQiLCJpYXQiOjE3NTQxNTExOTksInVzZXJuYW1lIjoiYmFieTZtZHZ2In0.v7y_rO5T3so1j_1hR1N-XZ-tNbAse9auPRc6WyLjrMFPTaB0vX492N5WGwXg3fqpd9NUrGDNJJfrY-0gBDCkeA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
