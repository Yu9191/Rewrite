const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODIyMDAwMDE2NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgyMjAwMDAxNjUiLCJpYXQiOjE3NTU3OTI2MTQsInVzZXJuYW1lIjoiYmFieXB2bmViIn0.vkyhXR23d4e0ZDxQXc2uV6vhtKtakZh8XI4imIgzJ4Tb0wWfzuOibY94sfq-nNSiMcyQNxAZiwszegu3qMJv_Q';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
