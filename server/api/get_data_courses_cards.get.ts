export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const base = String(config.apiProxyBase || "").replace(/\/+$/, "");
  const upstreamUrl = `${base}/get_data_courses_cards/`;

  try {
    const upstream = await $fetch.raw(upstreamUrl, {
      method: "GET",
      query,
      headers: {
        cookie: getHeader(event, "cookie") || "",
      },
    });

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
    return data || { message: "Proxy get_data_courses_cards failed" };
  }
});
