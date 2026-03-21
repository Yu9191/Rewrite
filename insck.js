
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzIyMDAwMDEwMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyMjAwMDAxMDAiLCJpYXQiOjE3NzQxMDk1MDIsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjIwMDAwMTAwIn0.o_V4kJe6Auayb_N6E8R4ejbb_9MSdnOqKaIv6Snb25w0iXprzKVk1wJHUNFc849ACKYFjLguwFVaVqRcyRvXOg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
