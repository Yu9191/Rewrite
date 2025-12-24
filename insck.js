
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjI1MDAwMDEwNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIyNTAwMDAxMDUiLCJpYXQiOjE3NjY1OTI2MTIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMjUwMDAwMTA1In0.eOaEQYh1KQ6x1heguy1zU9JdbztE9vFpG1ZkFp2j-2ux1DixqIDQun0N8WhfsssI_iA2kw11mpWdqQXAbAx3rg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
