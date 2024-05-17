export const onRequest = async (context) => {  
  const request = context.request;  
  try {  
    const url = new URL(request.url);  
    const path = url.pathname;  
    if (path.startsWith("/api_url")) {  
      const apiUrl = "https://api-bee-system-cluster01.iems-acl.wise-insightapm.com";  
      const newUrl = new URL(request.url);  
      newUrl.host = new URL(apiUrl).host;
      newUrl.pathname = newUrl.pathname.replace("/api_url", "");
      const modifiedRequest = new Request(newUrl, request);  
      modifiedRequest.headers.set("x-request-ip", request.headers.get("x-real-ip"));  
      return fetch(modifiedRequest);  
    }else if(path.startsWith("/portal_url")){
      const portalUrl = "https://portal-apm-system-cluster01.iems-acl.wise-insightapm.com";  
      const newUrl = new URL(request.url);  
      newUrl.host = new URL(portalUrl).host;
      newUrl.pathname = newUrl.pathname.replace("/portal_url", "");
      const modifiedRequest = new Request(newUrl, request);  
      modifiedRequest.headers.set("x-request-ip", request.headers.get("x-real-ip"));  
      return fetch(modifiedRequest);  
    }
    return await context.next();  
  } catch (e) {  
    return await context.next();  
  }
}