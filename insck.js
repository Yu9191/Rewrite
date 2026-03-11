
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzEyMDAwMDA5MyIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxMjAwMDAwOTMiLCJpYXQiOjE3NzMyNDU1NTgsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTIwMDAwMDkzIn0._p77FnNbTyp7115W_ueg-TZAi9s_EpcZte4MQTB433J8ezjASHjWsu-kf9N_6SNFZelQsRZZUS5xIxBWkoSC9w';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
