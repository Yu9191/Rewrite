
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjEyMDAwMDIyMSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxMjAwMDAyMjEiLCJpYXQiOjE3NjU0Njk2NTcsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTIwMDAwMjIxIn0.R3xfXn89MIbjLjO1W1VyFb0E3QbMawZ5LYy5qp7vBmwSA-2l6g9Jr1lRRarIu0ft-dEOLR8eDBS0MQ90RoNbYA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
