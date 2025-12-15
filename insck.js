
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjE2MDAwMDExNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxNjAwMDAxMTYiLCJpYXQiOjE3NjU4MTUwMzQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTYwMDAwMTE2In0.pUUhGUYg83jOlFCnJsHnAQzAM41WnWXMTIR_fus3DclzXlvH7kzeg9i7Vj4Im59M9ai_LkN7YdW2rIItZQWq_A';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
