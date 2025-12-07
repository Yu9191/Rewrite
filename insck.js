
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjA4MDAwMDEyOCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIwODAwMDAxMjgiLCJpYXQiOjE3NjUxMjM4NTUsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMDgwMDAwMTI4In0.Fp2EHrSLbtexcvb-fRUKBo2L7-SYKW5ndOV_01qbL04K9TVVcRt0k-XIoUNGornaeHIctoGTRBlmSizk5ybkxA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
