
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzI4MDAwMDEwNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMyODAwMDAxMDciLCJpYXQiOjE3NzQ2Mjc4MjQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMjgwMDAwMTA3In0.Jm6gBQaEqOQ7X1C9-ax54ZIX2oqR1xFC4jJr0UgLYu2_l2skfjnHWPO7bG0FfbFv7elP1hV3vQrmMN1U3Qbc5w';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
