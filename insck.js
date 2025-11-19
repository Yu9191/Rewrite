
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTE5MDAwNTQ5MSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTExOTAwMDU0OTEiLCJpYXQiOjE3NjM1NTQxNjYsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMTkwMDA1NDkxIn0.gXitVwSYU5Nxo5NWGifPviI_p7x1zg_7AAzp_NRomHT5_IGzCkmDmEaXAKG327a1sYRYhSb0LNPBfS6J2UAvkw';

let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
