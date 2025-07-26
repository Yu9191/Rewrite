const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzI3MDAwMDE2MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyNzAwMDAxNjAiLCJpYXQiOjE3NTM1NDYyMDIsInVzZXJuYW1lIjoiYmFieTZpOXZiIn0.Tdkn7XrVxwsvHX1VrZ2ACaiVLLOgcFsnaMt4cXZ9QfqpSc82mrMMXCI1wTyglPPGRzvQTb9UdHgaXw3nu3xC4g';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
