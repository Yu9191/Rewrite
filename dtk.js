/*
q

[rewrite_local]
^https://admin\.dingtiku\.cn/app/(testinfo/listTestInfo|video/getVideoCourseDetails|testinfo/startTest|video/listVideoCourse|buy/getBuyDetails|user/getUserScore) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/dtk.js
[mitm]
hostname = admin.dingtiku.cn

*/
$done({
    body: $response.body
        .replace(/("number"\s*:\s*)"否"/g, '$1"是"')
        .replace(/("number"\s*:\s*)0/g, '$11')
        .replace(/("isBuy"\s*:\s*)0/g, '$11')
    
      .replace(/("msg"\s*:\s*)"未购买题库"/g, '$1"成功"')
        .replace(/("code"\s*:\s*)"01"/g, '$1"00"')

.replace(/("answerCount"\s*:\s*)0/g, '$1999')
        .replace(/("answerNumber"\s*:\s*)(null|\d+)/g, '$19999')
        .replace(/("currentQuestion"\s*:\s*)(null|\d+)/g, '$19999999')
});
