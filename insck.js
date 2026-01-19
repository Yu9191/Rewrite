
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMTIwMDAwMDExNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDEyMDAwMDAxMTUiLCJpYXQiOjE3Njg4MzkwMTksInVzZXJuYW1lIjoidmlzaXRvcl8yNjAxMjAwMDAwMTE1In0._pQd6Lu3_-aN0itM7dSPrjG5SlYSdESFqP0yQEibikJjgFcPtL5R1Ee7-U4LjtiEfSNMyV-6orQZ5LfY9WuELw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
