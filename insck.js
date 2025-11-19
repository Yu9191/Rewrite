
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTE5MDAwNTQ4NSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTExOTAwMDU0ODUiLCJpYXQiOjE3NjM1NTQxMTQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMTkwMDA1NDg1In0.4T1WBs7PD1pA2GahU2mM3BtQbSBQ0PLb85mEishFQdWbsV-fPNXqzDcfSd7y3gMFC2KNRrQEw1HtRMdX6iF2AA';

let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
