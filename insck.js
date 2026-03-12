
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzEzMDAwMDA3MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxMzAwMDAwNzAiLCJpYXQiOjE3NzMzMzE4MDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTMwMDAwMDcwIn0.i-l5pzewyNCl83UW8IyH1-H309EVUf2FKgu5jIRn6-uceGZunknvAqzuz83ffSvgeK2R_fG6hYM_eprlxmIOkg';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
