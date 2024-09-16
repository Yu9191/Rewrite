/*

[rewrite_local]

http://yyy.bosum.com/enterprise/A00294/yqy-course/phone/courseLine/line/getCourseDetailsInfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/bsxm.js

[mitm]
hostname = yyy.bosum.com
*/
$done({
    body: $response.body.replace(/("tryAndSee"\s*:\s*)"N"/g, '$1"Y"')
});
