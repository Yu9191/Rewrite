
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwNDA2MDAwMDEwOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDQwNjAwMDAxMDgiLCJpYXQiOjE3NzU0MDU0NzMsInVzZXJuYW1lIjoidmlzaXRvcl8yNjA0MDYwMDAwMTA4In0.-KBPK1dpj2yMLD05BI60MtEJSXkBtv2f-skh3tl9zc3uvs9S4VyEKwCO2bSD3ahmRXbKqkaOuEijX1mWNmqobw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
