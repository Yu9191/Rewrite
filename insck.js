
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTI4MDAwMDE1NCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyODAwMDAxNTQiLCJpYXQiOjE3Njk1MzAyMTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjgwMDAwMTU0In0.63woQSWnB4fBmpe3Is3NsZSAxUb3fBHQMMr7OrnuoHRtx9ifVi90Jx6q_fhvtbIq-1ChmudRUH2bVTp908Rj8w';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
