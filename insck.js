
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTEzMDAwMDA5OSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDExMzAwMDAwOTkiLCJpYXQiOjE3NjgyMzQyMjcsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMTMwMDAwMDk5In0.ljkO-SNuo3MbR3746VrfDvbPP0Skj9Dzx_E2m1kB4U7nVsPKLzn9ENqI4Yhm72iR7ddlDPRR5P7Fi271Q9n_vA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
