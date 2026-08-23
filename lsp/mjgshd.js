
var url = $request.url;
function setQueryString(paramName, paramValue) {
  var urlParts = url.split("?"),
      baseUrl = urlParts[0],
      queryString = urlParts[1];
  var params = {};
  if (queryString) {
    queryString.split("&").forEach(param => {
      var keyValue = param.split("=");
      params[keyValue[0]] = keyValue[1];
    });
  }
  params[paramName] = paramValue;
  var newParams = [];
  for (var key in params) {
    newParams.push(key + "=" + params[key]);
  }
  return baseUrl + "?" + newParams.join("&");
}

url = setQueryString("uid", "1");

url = setQueryString("token", "");
$done({
  "url": url
});
