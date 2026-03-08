
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzA5MDAwMDExNyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwOTAwMDAxMTciLCJpYXQiOjE3NzI5ODYyNzUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDkwMDAwMTE3In0.4LyzqbFkfM9zmjPEqnoou6OYS7KwhAT7V3inHSL-UmOA3MYwzWbyKelglxARcZgsuzPl1UaPtIosOAJhaGGMwQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
