/* 
  felo翻译



[rewrite_local]
^https?:\/\/(translator|accounts).felo.me\/api\/user.*$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/felo.js

^https?:\/\/translator.felo.me\/api\/translation\/thirdToken url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/felock.js

[mitm]
hostname = translator.felo.me, accounts.felo.me
  
  */
