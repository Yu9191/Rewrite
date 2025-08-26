const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODI2MDAwODk5MSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgyNjAwMDg5OTEiLCJpYXQiOjE3NTYyMTY4NDUsInVzZXJuYW1lIjoiYmFieXpybXJnIn0.x5LqFcExZJagCMxYxqV8JzW5AR4IP-KclSHkwnSk2oMgwW_7eF1-DfmK7p-8BBegmiaku0KGPcUun5o2eGesKA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
