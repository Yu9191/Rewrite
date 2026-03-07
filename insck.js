
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzA4MDAwMDExMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwODAwMDAxMTMiLCJpYXQiOjE3NzI4OTk4ODcsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDgwMDAwMTEzIn0.xQcP5P0SnW_Yn72YCT79oFbxKVhPfCdO4aV0jNiF07C_NAFsk8YZdNyuAIKSTSuVINecXwKITNTMaeDcRysg5A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
