
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjEwMDAwMDE0MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxMDAwMDAxNDAiLCJpYXQiOjE3NjUyOTY2MTMsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTAwMDAwMTQwIn0.74XRHE7PH6YA-3BwbO9541kF7Yxe7o3FMhKoBWMcGgIYZojdxklUGTQ5dw4-1yNeanDNs1WAdChmYw0rfNr5WQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
