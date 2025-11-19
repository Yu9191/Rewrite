const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTE5MDAwNTQ0NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTExOTAwMDU0NDUiLCJpYXQiOjE3NjM1NTM0MTksInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMTkwMDA1NDQ1In0.VQnTAedH4VwOoKvQrdaMUQltWM0R9SqTMxqTPaYdwMc61nREnqfqt_FGsCwVYbXHAj4kPbmxBNKNCDUPeYnPQA';

let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
