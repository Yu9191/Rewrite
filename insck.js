
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMjE4MDAwMDE0MSIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTIxODAwMDAxNDEiLCJpYXQiOjE3NjU5ODc4NjQsInVzZXJuYW1lIjoidmlzaXRvcl8yNTEyMTgwMDAwMTQxIn0.s69eyEIX46X7MZbXf0Zge4tYApLV2nuBHO_NF5CRSB8GJvaFA1qYu0-niGUvQMtX5FGfqY-2HPDRQ_dlX5vnXw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
