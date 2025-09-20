import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    }
  );
  shellRendered = true;

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");

  // Security headers per best practices
  responseHeaders.set(
    "Content-Security-Policy",
    "\
    default-src 'self'; \
    script-src 'self' 'unsafe-inline' static.cloudflareinsights.com www.googletagmanager.com/gtag/js; \
    connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com; \
    style-src 'self' 'unsafe-line'; \
    img-src 'self' images.ctfassets.net https://www.google-analytics.com https://*.google-analytics.com; \
    "
  );

  responseHeaders.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  responseHeaders.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  responseHeaders.set("X-Frame-Options", "SAMEORIGIN");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
