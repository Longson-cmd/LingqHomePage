export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const mediaPath = String(getRouterParam(event, "path") || "").replace(/^\/+/, "");

  if (!mediaPath) {
    throw createError({ statusCode: 404, statusMessage: "Media path is required" });
  }

  const base = String(config.apiProxyBase || "").replace(/\/+$/, "");
  const requestUrl = getRequestURL(event);
  const query = requestUrl.search || "";
  const upstreamUrl = `${base}/media/${mediaPath}${query}`;

  const upstream = await fetch(upstreamUrl, {
    method: "GET",
    headers: {
      cookie: getHeader(event, "cookie") || "",
      accept: getHeader(event, "accept") || "*/*",
    },
  });

  if (!upstream.ok) {
    throw createError({
      statusCode: upstream.status,
      statusMessage: upstream.statusText || "Failed to fetch media",
    });
  }

  const headers = new Headers(upstream.headers);
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
});
