import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  type LoaderFunctionArgs,
  // ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import appStylesHref from "./app.css?url";
import { GoogleAnalytics } from "./components/google-analytics";
import { JsonLdScript } from "./components/json-ld-script";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./components/nav";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  return {
    mode: url.searchParams.get("mode"),
    activePage: url.pathname === "/" ? "home" : url.pathname.slice(1),
  };
}

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
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      {/* Desktop sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-shrink-0 border-r border-gray-200 bg-white shadow-sm z-40 sticky top-0 h-screen overflow-y-auto">
        <Nav />
      </aside>

      {/* Mobile top nav */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <img
            src="/images/avatar.png"
            alt="Michael Robinson avatar"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <span className="font-semibold">Michael Robinson</span>
        </div>
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile nav drawer reuses Nav component but compact and animated */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-40 p-6 flex flex-col space-y-6"
          >
            <Nav compact onLinkClick={() => setMobileNavOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-grow px-4 md:px-8 py-8 md:ml-0 md:mt-0 mt-14 max-w-4xl mx-auto">
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
