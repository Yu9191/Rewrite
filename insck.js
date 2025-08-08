const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUwODA4MDAwODA1MiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MDgwODAwMDgwNTIiLCJpYXQiOjE3NTQ2NDAxNDUsInVzZXJuYW1lIjoiYmFieXFxenB6In0.QZtAFJImQfo0rtRIpbX60stJQxCWn-PMO6k8-a85hTnzFrbsP36je0TwKFBtbLHALzaewmq7QPS2nRSpyPD1UQ';
let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
