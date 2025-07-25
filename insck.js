const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzI2MDAwMDE5MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyNjAwMDAxOTMiLCJpYXQiOjE3NTM0NTk4NDcsInVzZXJuYW1lIjoiYmFieWxvd3A1In0.roPJ49XoRsgnSjO5eiWv7SKfT7eMPSt-g6HPjPBiBqS2S_OmIcnvLOL-oX-8-53M6jnyqZrumpjisI3KkGnRGA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
