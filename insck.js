
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjA0MDAwMDA5NiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwNDAwMDAwOTYiLCJpYXQiOjE3NjQ3NzgyMDMsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDQwMDAwMDk2In0.4VGDPCbNKhcp8xRmgusTQjG6G7MFRl8-1KjONnpZQAqVjuUBN1iJ1IpUwH3j9vhNky2_ycqWC8lDRqXD9xD_Qw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
