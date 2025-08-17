const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODE4MDAwMDIxNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxODAwMDAyMTQiLCJpYXQiOjE3NTU0NDcwNzQsInVzZXJuYW1lIjoiYmFieWVjbnpiIn0.G2PMbdrVqZ-hlpuJ77EvkzlDZOn_Vx5iE5PJv_C5LqmUjsXULfhQTNeB3O0e6fpHSs7XWuJ7Ye0anoZn5v17zQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
