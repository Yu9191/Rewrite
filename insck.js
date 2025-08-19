const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODIwMDAwMDE2NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgyMDAwMDAxNjUiLCJpYXQiOjE3NTU2MTk4MDQsInVzZXJuYW1lIjoiYmFieXp0MzVvIn0.4O2zyOq_nYZE939RhGUAwB8qT0LKvOFvkfON4E45chrS656uBv0BXuiyDEyECws6951FNXVvwwiZstHZhhYbiQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
