/* 
Prompt3
[rewrite_local]
# 会员
^https?:\/\/circle\.panic\.com\/api\/v1\/app_store\/(process_transaction\/com\.panic\.prompt\.3|subscription_status)\/?$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/prompt3.js
[mitm]
hostname = circle.panic.com
*/

function generateRandomNumericID(length = 18) {
  let result = '';
  result += Math.floor(Math.random() * 9) + 1;
  const characters = '0123456789';
  for (let i = 1; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const statusCode = typeof $task !== "undefined" ? "HTTP/1.1 200 OK" : 200;
const response = { status: statusCode, headers: $response.headers };
if ($request.url.includes("api/v1/app_store")) {
  response.body = JSON.stringify({
    "status" : "ok",
    "original_transaction_date" : "2025-12-02T00:57:42-08:00",
    "expiry_date" : "2099-09-09T00:57:41-08:00",
    "can_start_trial" : true,
    "product_id" : "prompt3.yearly.subscription",
    "signed_original_transaction_id" : "QUFcT2hSIuOYrvVphaDfoH+yenMg8vJQqLNtE+cVU+egOLSF1quCPev7oF0CSB+W\/dxgtWmuf4rYgH9dVQhAXXj72zCg50cxXrSkgswS7zEROUw3D4jrXN+AJWWe1A9qfPuirv4J+Zel0KJPlv4GVHaagVwddTOB0lODgdRvuX8FuzcOe+UiOByKulkRTJroXXl6mhXVyXbHlg4xKTScdSSEuhQeJ3D81BQT7ImfPo5kRvWUEJrS9rEW8V71XUk5zc4A6La9+mgx0yt5G6\/N0facEfrQQCoD8YPaKFEC+cpJ6Sy7X\/FM6xrR1KM+PvnHeebjEMJEvroGNyKGC8zvPK16\/D4\/LlJpkGhoJFAEXA6LqP9OeLZ4mZxt5y01kyySGw8UPlsd4NDtGO\/aMcO5lFqfZfKl0tm0gRN4c3aEC+hgFpePwmCFNbGrI5dP\/v32oi1w25Q\/ln3Fxxbk+8CdktQnNDhsMOkcqQBObCa7eUPE6T4McIe+vZpvfcYQ1FSV2LgzAFUixN9+BMsIVuDnvSTSaPqz7qPLyhzqam2jL\/rGARYPc3OgUHa97zri8T2ToavYgcI2o3UOwV8nwUgchQ62YQW3Hj37+h\/A1ZxJaWheWok1kTe2iMcGmEQfogRIJpcix9wbY9IUbwxwyIG6mHAYr\/dqIouT6hsBKK1J7lk=",
    "original_transaction_id" : generateRandomNumericID() 
  });
}

$done(response);
