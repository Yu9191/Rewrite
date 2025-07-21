const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwNzIxMDAwODc4MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDcyMTAwMDg3ODIiLCJpYXQiOjE3NTMxMDc0MDIsInVzZXJuYW1lIjoiYmFieWpna2syIn0.e_8GCtVTGIYOMLTja4qJXa0lqQDu05zRI-rI4IMaz-GZwans5Lst19AHe0rwXci3iW5o5Db7ajY54qOD8GOeaA';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
