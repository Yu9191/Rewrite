
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzEwMDAwMDEzNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxMDAwMDAxMzYiLCJpYXQiOjE3NzMwNzI3MDUsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTAwMDAwMTM2In0.x0iNoiStg2pMLMm4EEZQpG79Al_sqkh1li49rwX9Mih8J3zqsyxcHe_eEsMGka06MooBFhMrg9JdrvG7uDArzw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
