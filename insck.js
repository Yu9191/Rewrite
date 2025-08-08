const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODA5MDAwMDI1MSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwOTAwMDAyNTEiLCJpYXQiOjE3NTQ2Njk0MDMsInVzZXJuYW1lIjoiYmFieWFocGRhIn0.p69TNur_srD6g_tP2CwfnDkOd_XRuWS4G9NeQ2oAOw8f_ly4yoDFnvwGq7mfZnk05vpqaDBZjUF9V7IZ9biNSg';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
