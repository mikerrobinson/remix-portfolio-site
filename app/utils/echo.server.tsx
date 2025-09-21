/**
 * Parses the incoming Request object and extracts relevant details.
 * @param request The Remix Request object.
 * @param body The parsed request body (if available).
 * @returns A JSON object with the request details.
 */
function parseRequest(request: Request, body?: unknown) {
  const headers = Object.fromEntries(request.headers.entries());
  const url = request.url;
  const method = request.method;
  const searchParams = new URL(url).searchParams.toString();

  return {
    method,
    url,
    headers,
    searchParams,
    body,
  };
}

/**
 * Handles GET requests by echoing the request details.
 * @param request The Remix Request object from the loader.
 * @returns A JSON object echoing the request details.
 */
export async function getEcho(request: Request) {
  return parseRequest(request);
}

/**
 * Handles POST requests by echoing the request details and form data.
 * @param request The Remix Request object from the action.
 * @returns A JSON object echoing the request details and form data.
 */
export async function createEcho(request: Request) {
  const contentType = request.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return parseRequest(request, await request.json());
  } else if (contentType?.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    return parseRequest(request, Object.fromEntries(formData.entries()));
  } else if (contentType?.includes("text/plain")) {
    return parseRequest(request, await request.json());
  }
  return parseRequest(request, "Body content type not handled for parsing.");
}
