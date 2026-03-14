
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjYwMzE1MDAwMDEzNCIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI2MDMxNTAwMDAxMzQiLCJpYXQiOjE3NzM1MDQ5MTAsInVzZXJuYW1lIjoidmlzaXRvcl8yNjAzMTUwMDAwMTM0In0.qirC-EBPeoGfZRPCPtb1gtNQcJVipSgkTUdTG-3Cgomt2QUlllAmpttjaCxQ6QUHrQfustIpM5EAvaMV-SZJFw';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
