async function handleRequest(request) {
  var url = new URL();
  url.protocol = "https"
  url.hostname = "api-bee-system-cluster01.iems-acl.wise-insightapm.com"
  
  // remove the string "/api_url" at first from the request URL
  url.pathname = request.url.replace("/api_url", "")

  // ChangeOrigin
  request.headers.set("Host", url.hostname);
  
  let response = await fetch(url.toString(), request);
  return response;
}