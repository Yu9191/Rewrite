
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjE3MDAwMDE1MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxNzAwMDAxNTAiLCJpYXQiOjE3NjU5MDE0NDgsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTcwMDAwMTUwIn0.w42ZFLslRaf16YSaYQGjslnqMo83EpUgEg6FoxVeY9NbxtX-Hiw_JoIiOWCT9wWeuKC-_Kotfj0dby_A2VxVQw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
