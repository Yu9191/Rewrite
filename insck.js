const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwNDU1MCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDQ1NTAiLCJpYXQiOjE3NTMwNjAyMDgsInVzZXJuYW1lIjoiYmFieXo5aHFiIn0.BTdzOlvxH_-DJlf6DbRSaXkkEQ7V6osp1Yw-8dMESbn65yP8ppuvjtXaljac5Oy_pkQiG2B03mbqJeg8BIMirw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
