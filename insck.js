const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODExMDAwMDIxOSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgxMTAwMDAyMTkiLCJpYXQiOjE3NTQ4NDIyMDIsInVzZXJuYW1lIjoiYmFieTNpaDFvIn0.7o7k23fuPPOYF26P71mWgkEGn6VVnhqzT241a5GKdcYYcyFTOov8ROciB9YrPVH2UtK5Bs-Q-C-pEGRG807ZeQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
