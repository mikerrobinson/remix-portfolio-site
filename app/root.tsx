import React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  type LoaderFunctionArgs,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import appStylesHref from "./app.css?url";
import { GoogleAnalytics } from "./components/google-analytics";
import { JsonLdScript } from "./components/json-ld-script";
import Nav from "./components/nav";
import {
  MY_EMAIL,
  GITHUB_URL,
  MY_HEADSHOT_URL,
  LINKEDIN_URL,
  MY_NAME,
  MY_PHONE,
  WEBSITE_URL,
  WEBSITE_ID,
  PERSON_ID,
} from "./constants";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

const personData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: MY_NAME,
  alternateName: "Michael R. Robinson",
  url: WEBSITE_URL,
  email: `mailto:${MY_EMAIL}`,
  telephone: `+1-${MY_PHONE}`,
  image: MY_HEADSHOT_URL,
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Carnegie Mellon University",
      sameAs: "https://www.cmu.edu/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Arizona State University, W.P. Carey School of Business",
      sameAs: "https://wpcarey.asu.edu/",
    },
  ],
  sameAs: [LINKEDIN_URL, GITHUB_URL],
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: WEBSITE_URL,
  name: MY_NAME,
  description: `Personal website and resume of ${MY_NAME}, technical leader and software developer.`,
  publisher: {
    "@id": PERSON_ID,
  },
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  return {
    page: url.pathname === "/" ? "home" : url.pathname.slice(1),
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { page } = useLoaderData<typeof loader>();
  return (
    <html lang="en" className={`${page}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://images.ctfassets.net"></link>
        <Links />
        <JsonLdScript data={personData} />
        <JsonLdScript data={websiteData} />
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <Nav />
      <main className="flex-grow px-4 md:ml-62 md:px-8 py-8 md:py-0 md:ml-0 mt-16 md:mt-6 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
