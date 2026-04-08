export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const base = String(config.apiProxyBase || "").replace(/\/+$/, "");
  const upstreamUrl = `${base}/login/`;

  try {
    const upstream = await $fetch.raw(upstreamUrl, {
      method: "POST",
      body,
      headers: {
        cookie: getHeader(event, "cookie") || "",
      },
    });

    // Forward any session cookies set by the backend to the browser.
    const setCookies = upstream.headers.getSetCookie?.() || [];
    for (const cookie of setCookies) {
      appendResponseHeader(event, "set-cookie", cookie);
    }

    setResponseStatus(event, upstream.status, upstream.statusText);
    return upstream._data;
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const data = error?.response?._data;

    const setCookies = error?.response?.headers?.getSetCookie?.() || [];
    for (const cookie of setCookies) {
      appendResponseHeader(event, "set-cookie", cookie);
    }

    setResponseStatus(event, status);
    return data || { message: "Proxy login failed" };
  }
});
