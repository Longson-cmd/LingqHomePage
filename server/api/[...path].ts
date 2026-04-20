// Catch-all API proxy route: handles requests such as /api/login or /api/media/file.png.
export default defineEventHandler(async (event) => {
  // Load runtime config so we can read apiProxyBase.
  const config = useRuntimeConfig();
  // Read incoming HTTP method (GET, POST, PUT, DELETE, etc.).
  const method = getMethod(event);
  // Read query params from the incoming request URL.
  const query = getQuery(event);
  // Get everything after /api/ from [...path] and remove leading slashes.
  // Example: /api/login -> "login"
  const rawPath = String(getRouterParam(event, "path") || "").replace(/^\/+/, "");

  // If user requested only /api or /api/, there is no path to forward.
  if (!rawPath) {
    // Return 404 because there is no upstream endpoint target.
    throw createError({ statusCode: 404, statusMessage: "Not Found" });
  }

  // Read backend base URL from config and remove trailing slash.
  const base = String(config.apiProxyBase || "").replace(/\/+$/, "");
  // Build full backend URL and ensure trailing slash once.
  // Example: base=http://backend.local, rawPath=login -> http://backend.local/login/
  const upstreamUrl = `${base}/${rawPath}${rawPath.endsWith("/") ? "" : "/"}`;

  // Collect only allowed headers to forward to backend.
  const headers: Record<string, string> = {};
  // Read browser cookie header.
  const cookie = getHeader(event, "cookie");
  // Read browser authorization header.
  const authorization = getHeader(event, "authorization");
  // Read browser content-type header.
  const contentType = getHeader(event, "content-type");
  // Read browser accept header.
  const accept = getHeader(event, "accept");
  // Read browser CSRF token header.
  const csrfToken = getHeader(event, "x-csrftoken");

  // Forward cookie if present.
  if (cookie) headers.cookie = cookie;
  // Forward authorization if present.
  if (authorization) headers.authorization = authorization;
  // Forward content-type if present.
  if (contentType) headers["content-type"] = contentType;
  // Forward accept if present.
  if (accept) headers.accept = accept;
  // Forward CSRF token if present.
  if (csrfToken) headers["x-csrftoken"] = csrfToken;

  // GET/HEAD normally do not send body; others can have body.
  const hasBody = !["GET", "HEAD"].includes(method.toUpperCase());
  // Read body only when method supports body.
  const body = hasBody ? await readBody(event) : undefined;

  // Proxy request to backend.
  try {
    // Use raw fetch so we can access status, headers, and data together.
    const upstream = await $fetch.raw(upstreamUrl, {
      // Keep original method.
      method,
      // Forward query params.
      query,
      // Forward selected headers.
      headers,
      // Forward request body (if any).
      body,
    });

    // Read Set-Cookie headers from backend response.
    const setCookies = upstream.headers.getSetCookie?.() || [];
    // Return backend cookies to browser.
    for (const value of setCookies) {
      // Append each cookie line to response.
      appendResponseHeader(event, "set-cookie", value);
    }

    // Mirror backend HTTP status.
    setResponseStatus(event, upstream.status, upstream.statusText);
    // Return backend response data to frontend.
    return upstream._data;
  // Handle backend/proxy failure.
  } catch (error: any) {
    // Use backend status if available; fallback to 500.
    const status = error?.response?.status || 500;
    // Read backend error payload if available.
    const data = error?.response?._data;
    // Read Set-Cookie headers even on error response.
    const setCookies = error?.response?.headers?.getSetCookie?.() || [];

    // Forward error-response cookies to browser.
    for (const value of setCookies) {
      // Append each cookie line to response.
      appendResponseHeader(event, "set-cookie", value);
    }

    // Set final response status.
    setResponseStatus(event, status);
    // Return backend error body, or fallback message if no body.
    return data || { message: `Proxy failed for ${rawPath}` };
  }
});
