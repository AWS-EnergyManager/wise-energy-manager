export async function onRequest(context) {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context
  const { pathname } = new URL(request.url)
  
  // target: 'https://portal-apm-system-cluster01.iems-acl.wise-insightapm.com',

  // remove the string "/api_url" at first from the request URL
  const url = new URL('https://portal-apm-system-cluster01.iems-acl.wise-insightapm.com')
  url.pathname = pathname.replace('/portal_url', '')
  // ChangeOrigin
  request.headers.set('Host', url.hostname)

  let response = await fetch(url.toString(), request)
  return response
}