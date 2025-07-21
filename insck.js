const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIyMDAwMDE4MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMjAwMDAxODAiLCJpYXQiOjE3NTMxMTQyMDQsInVzZXJuYW1lIjoiYmFieXpuYTllIn0.KWtBgE00B8vmEAaWF5EYmChOD8N5ov_QblKkr_Ht6kUzmR1t00-dfmRNzh1r5Pl1apWirFGIGhXdMujqNm0WSQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
