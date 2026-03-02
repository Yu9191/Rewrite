
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzAzMDAwMDA5OSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMwMzAwMDAwOTkiLCJpYXQiOjE3NzI0Njc4MjQsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMDMwMDAwMDk5In0._f1_WQ7JAsBwqcdPhC79CjzV5ckxDhI_jh2IHENUUfD2z97crq85dI4S0AohqxrgnsCoepVEnFjqXwad5pkIRA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
