
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTIxMDAwMDEwOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyMTAwMDAxMDgiLCJpYXQiOjE3Njg5MjU0MTYsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjEwMDAwMTA4In0.AZ4C1wNWk1FfjxJermk3sAzIhpWxOkehuWHFn6BaNQXD3drspnpA9pK67pKJWqFoV2aWV64l1NSnLY9iMzbQvw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
