
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDEwMDAwMDEyNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQxMDAwMDAxMjYiLCJpYXQiOjE3NzU3NTEwMjMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MTAwMDAwMTI2In0.kkegsNFs7p_GL1dNjNrkArzSWMnAO-pVcBHuEDayXV51TCoxhnAjC0VsTqHBbRq4sdJetohpjDwluxUy6W4J5A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
