const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTE5MDAwNTQ5OCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTExOTAwMDU0OTgiLCJpYXQiOjE3NjM1NTQzNjEsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMTkwMDA1NDk4In0.yMMcKEehWNGsFVO76PVw29kqo2uFEpeBAkAqqumYZZEpPtNlTNImr3Bn_RUF-0waA9B-yz2-1LiOQXjZ_15Osw';

let headers = $request.headers;

if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}

$done({ headers });
