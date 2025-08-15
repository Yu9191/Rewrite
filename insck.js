const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODE2MDAwMDIxNSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxNjAwMDAyMTUiLCJpYXQiOjE3NTUyNzQyMDQsInVzZXJuYW1lIjoiYmFieTFxajcyIn0.raVe3EK0VSAL6zyLe83yvalJp6LKH957xcgEbbYoiummdjgu2mJaJXRYQSDoJz4iVaLbwXx7hKhnksvJRS_Vyw';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
