
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTIzMDAwMDE3MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyMzAwMDAxNzAiLCJpYXQiOjE3NjkwOTgyNDIsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjMwMDAwMTcwIn0.Z893qJQvXnmmEc0p8HVesZZbgjoeA5yaVXBB4aHN_gaJ_zQSa3j7njmzrCa0dvMmPuuUyYm0sWUm3jVsNi-3xw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
