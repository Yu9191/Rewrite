
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTMxMDAwMDEwMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEzMTAwMDAxMDMiLCJpYXQiOjE3Njk3ODk0MTMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMzEwMDAwMTAzIn0.G-wOK8H2dDfqJSW_ROscchzbylTLeGcMZmIFM4bAS3N6Ljl2_M2DRWBWJGBwwUA8KW3M3Q_xmx5l2b0isF8beA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
