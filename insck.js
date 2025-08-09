const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODEwMDAwMDI0NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxMDAwMDAyNDUiLCJpYXQiOjE3NTQ3NTU4MDQsInVzZXJuYW1lIjoiYmFieXNpZnJnIn0.97Z8EcxKR17CxuPPckbKrv48nAS8UOvIc6HS5cE9ka-pnYJUouqzrPhJrAr71pycj1LlANwILzOa6I-7UysJKA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
