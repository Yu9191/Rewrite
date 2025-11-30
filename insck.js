
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjAxMDAwMDExNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwMTAwMDAxMTQiLCJpYXQiOjE3NjQ1MTkwMDQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDEwMDAwMTE0In0.Nm5niOR5Dqa5LNKOtbt29q1j4COeKzA2bNR9tD6TLW0OkasZXSwJSkU_0ilRUhf6mlAx8fTXWLdN46tAxdR15g';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
