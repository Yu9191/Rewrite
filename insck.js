
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzE2MDAwMDEyNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxNjAwMDAxMjUiLCJpYXQiOjE3NzM1OTEyODIsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTYwMDAwMTI1In0.VCRGYCTK8Nog2vXCdal1_znuc5HyI7dEwbAFs5pD52hgcG1lw0ep-e9AqZR1XEtm6rDRXWTEUFgfeQF4HFI_IQ';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
