import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  // Scripts,
  // ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import appStylesHref from "./app.css?url";
import { GoogleAnalytics } from "./components/google-analytics";
import { JsonLdScript } from "./components/json-ld-script";

export const links: Route.LinksFunction = () => [
  // { rel: "preconnect", href: "https://images.ctfassets.net" },
  // {
  //   rel: "stylesheet",
  //   href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  // },
  { rel: "stylesheet", href: appStylesHref },
];

const personData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mikerrobinson.dev#person",
  name: "Mike Robinson",
  alternateName: "Michael R. Robinson",
  url: "https://mikerobinson.dev",
  email: "mailto:MikeRRobinson@hotmail.com",
  telephone: "+1-413-219-3527",
  image:
    "https://images.ctfassets.net/de578b4i2gcz/5U8wnijMIYHdEPu6wssa1C/026d07fcdaec15215790435b5324b162/photo.JPG",
  // jobTitle: "Senior Engineering Manager",
  // worksFor: {
  //   "@type": "Organization",
  //   name: "Shopify",
  //   url: "https://www.shopify.com",
  // },
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
  sameAs: [
    "https://www.linkedin.com/in/mike-robinson-software/",
    "https://github.com/mikerrobinson",
  ],
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mikerobinson.dev#website",
  url: "https://mikerobinson.dev",
  name: "Mike Robinson – Software Developer",
  description:
    "Personal website and resume of Mike Robinson, technical leader and software developer.",
  publisher: {
    "@id": "https://mikerobinson.dev#person",
  },
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://images.ctfassets.net"></link>
        <JsonLdScript data={personData} />
        <JsonLdScript data={websiteData} />
        <Meta />
        <Links />
        <GoogleAnalytics />
      </head>
      <body>
        {children}
        {/* <ScrollRestoration /> */}
        {/* <Scripts /> */}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
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
