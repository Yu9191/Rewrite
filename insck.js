
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTI5MDAwMDEzMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyOTAwMDAxMzAiLCJpYXQiOjE3NjQzNDYyMTIsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjkwMDAwMTMwIn0.cB5jFP43y5GgnbzhAvYRjLwQRrPystFn78mIUEXQE1LEl3FV1GRFypY0XrCeFV5WeNkq19P0_YhwN7cdz0O0hQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
