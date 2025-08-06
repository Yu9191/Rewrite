const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODA3MDAwMDE5OSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwNzAwMDAxOTkiLCJpYXQiOjE3NTQ0OTY2MDQsInVzZXJuYW1lIjoiYmFieTVjOWpsIn0.3UrEdvoHtHBolWZIkBwmlYPZ2btcNJWAQ-FD3GbkWGoYInoZfT5SS-jxOltxITl2ZCcH1XqfRQe5BAaXSlCLrQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
