
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjA5MDAwMDEzNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwOTAwMDAxMzciLCJpYXQiOjE3NjUyMTAyNzAsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDkwMDAwMTM3In0.r1s9seqmZuA9vCzx0ftdW6avAXstL4Dqx-vU5mN9SvB3MhXDH3uRzYPkJe5HUsgXsv9etkDvzIooogFN3ibfOw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
