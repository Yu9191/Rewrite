
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMjUxMTIxMDAwMDEzNiIsImxvZ2luX3R5cGUiOjMsImlzcyI6ImgiLCJ1c2VyX2tleSI6IjI1MTEyMTAwMDAxMzYiLCJpYXQiOjE3NjM2NTUwMjMsInVzZXJuYW1lIjoidmlzaXRvcl8yNTExMjEwMDAwMTM2In0.pOiRURmzHfbOSdwPSNHfP21fbCTvKZTRIAY8jXuSEv2-O3ezDHRFMbMrL-bGTHEqIS2eoMN5zlQwxpUwtJfIRA';

let headers = $request.headers;
if ('authorization' in headers || 'Authorization' in headers) {
  const key = headers.authorization ? 'authorization' : 'Authorization';
  headers[key] = token;
}
$done({ headers });
