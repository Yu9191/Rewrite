
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjExMDAwMDE3NyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxMTAwMDAxNzciLCJpYXQiOjE3NjUzODMxOTQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTEwMDAwMTc3In0.Rugsjwl6EB0FfeD2NLYTJCgjxm7uRGUNtrYgfhjDcCjo3IpKQ5nTSdPTPMj42yp8ZwuTIVLlxwfAS4TDFw7EYQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
