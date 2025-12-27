
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjI4MDAwMDEwOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyODAwMDAxMDgiLCJpYXQiOjE3NjY4NTE4NDcsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjgwMDAwMTA4In0.8MRlBiGCRi8HdeXjtxfqGwGW4I0330VMSyc4cx1bjlaYB3GkzKzBbJ1WPJ4JPECzy0538tB19pAwicfmR0lxIQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
