const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODIxMDAwMDIxNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgyMTAwMDAyMTUiLCJpYXQiOjE3NTU3MDYyODcsInVzZXJuYW1lIjoiYmFieTQ2N2V4In0.Y8rW91soVChg8jyh2BQnUr9thmqCvurWQ4UVclMaan1uNAa3KGCrzoIfCB3Bfv4rbotTGN0Pqd6G9RqZOAy-WA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
