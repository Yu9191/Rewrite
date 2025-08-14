const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODE1MDAwMDIwMyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxNTAwMDAyMDMiLCJpYXQiOjE3NTUxODc4MDMsInVzZXJuYW1lIjoiYmFieWh4d2txIn0.NuhUfhijy7AQ1LVmxeLq3M12yLyZ4lwpLShV0pX68ApJ2mmubL-dDfSFxzC7gg4mv7hhhKu0ArPJhetTzf-3RA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
