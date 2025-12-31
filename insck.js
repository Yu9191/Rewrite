
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTAxMDAwMDEwMCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEwMTAwMDAxMDAiLCJpYXQiOjE3NjcxOTc0NDIsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMDEwMDAwMTAwIn0.Eqz0bJwE68dzt9Sw_zdQmKZj_x8d4BrR6BvppItis7Bq0OgI8h5bz2FeMh8_LoMFQQAF1g4gfEi5PH8a20rCQA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
