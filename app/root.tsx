import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  // ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import appStylesHref from "./app.css?url";
import { GoogleAnalytics } from "./components/google-analytics";
import { JsonLdScript } from "./components/json-ld-script";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          {/* Left: Logo + Name */}
          <div className="flex items-center space-x-3">
            <img
              src="https://images.ctfassets.net/de578b4i2gcz/40rIUphI1duS6bDBIpOQW1/c576d5678173b5ed556a9bc8208a3860/avatar.png"
              alt="Mike Robinson avatar"
              className="w-auto h-20"
            />
            <span className="font-semibold text-lg md:text-xl">
              Mike Robinson
            </span>
          </div>

          {/* Right: Navigation */}
          <nav className="hidden md:flex space-x-6 font-medium">
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="/resume" className="hover:text-blue-600 transition-colors">
              Resume
            </a>
            <a
              href="/projects"
              className="hover:text-blue-600 transition-colors"
            >
              Projects
            </a>
            <a
              href="/privacy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-200 shadow-sm overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-3 space-y-3 font-medium">
                <a
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/resume"
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Resume
                </a>
                <a
                  href="/projects"
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Privacy
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} Michael Robinson
          </p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
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
