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

function StaticTop() {
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

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg p-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src="https://images.ctfassets.net/de578b4i2gcz/5U8wnijMIYHdEPu6wssa1C/026d07fcdaec15215790435b5324b162/photo.JPG" // use your professional headshot here
            alt="Mike Robinson headshot"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <h1 className="font-semibold text-lg">Mike Robinson</h1>
          <p className="text-sm text-gray-600">
            Engineering Leader · Developer
          </p>
        </div>

        <nav className="flex flex-col space-y-4 font-medium">
          <a href="/" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="/resume" className="hover:text-blue-600 transition-colors">
            Resume
          </a>
          <a href="/projects" className="hover:text-blue-600 transition-colors">
            Projects
          </a>
          <a href="/privacy" className="hover:text-blue-600 transition-colors">
            Privacy
          </a>
        </nav>

        <div className="mt-auto flex flex-col space-y-2">
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </aside>

      {/* Mobile header with menu button */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-3">
        <span className="font-semibold">Michael Robinson</span>
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-40 p-6 flex flex-col space-y-6"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src="/images/headshot.jpg"
                alt="Michael Robinson headshot"
                className="w-20 h-20 rounded-full border border-gray-300 object-cover"
              />
              <h1 className="font-semibold text-lg">Michael Robinson</h1>
              <p className="text-sm text-gray-600">
                Engineering Leader · Developer
              </p>
            </div>

            <nav className="flex flex-col space-y-4 font-medium">
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="/resume"
                onClick={() => setMobileOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Resume
              </a>
              <a
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Projects
              </a>
              <a
                href="/privacy"
                onClick={() => setMobileOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Privacy
              </a>
            </nav>

            <div className="mt-auto flex flex-col space-y-2">
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-grow w-full md:ml-64 p-6 md:p-10 mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}

// Local navigation component
function LocalNav({ sections }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop local nav */}
      <aside className="hidden lg:flex lg:flex-col w-56 flex-shrink-0 pr-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <nav className="space-y-3 text-sm font-medium">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile local nav (dropdown) */}
      <div className="lg:hidden mb-4">
        <button
          className="flex items-center justify-between w-full border rounded px-4 py-2 bg-white shadow-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="font-medium">Jump to section</span>
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 border rounded bg-white shadow-sm divide-y"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-50"
                >
                  {section.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// Global layout
function StaticWithSidebar({ sections = [] }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      {/* Global Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center space-x-3">
            <img
              src="/images/avatar.png"
              alt="Michael Robinson avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <span className="font-semibold text-lg md:text-xl">
              Michael Robinson
            </span>
          </div>

          {/* Desktop global nav */}
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

          {/* Mobile global nav button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile global nav drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              key="mobile-global-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-200 shadow-sm overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-3 space-y-3 font-medium">
                <a
                  href="/"
                  onClick={() => setMobileNavOpen(false)}
                  className="hover:text-blue-600"
                >
                  Home
                </a>
                <a
                  href="/resume"
                  onClick={() => setMobileNavOpen(false)}
                  className="hover:text-blue-600"
                >
                  Resume
                </a>
                <a
                  href="/projects"
                  onClick={() => setMobileNavOpen(false)}
                  className="hover:text-blue-600"
                >
                  Projects
                </a>
                <a
                  href="/privacy"
                  onClick={() => setMobileNavOpen(false)}
                  className="hover:text-blue-600"
                >
                  Privacy
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with optional local nav */}
      <div className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 flex flex-row">
        {sections.length > 0 && <LocalNav sections={sections} />}
        <main className="flex-grow prose max-w-none">
          <Outlet />
        </main>
      </div>

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

function SidebarWithLocal({ sections = [], activePage = "" }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scrollspy effect for local sections
  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      {/* Sidebar for medium+ screens */}
      <aside className="hidden md:flex flex-shrink-0 border-r border-gray-200 bg-white shadow-sm z-40 sticky top-0 h-screen">
        <div className="flex flex-col w-56 p-6 space-y-6 overflow-y-auto">
          {/* Profile block */}
          <div className="flex flex-col items-center text-center space-y-3">
            <img
              src="https://images.ctfassets.net/de578b4i2gcz/5Kar98VQsQIRyeXcOB9XdK/f0545d010e8546a095bd3b310c94c9f3/photo.JPG"
              alt="Mike Robinson headshot"
              className="w-20 h-20 rounded-full border border-gray-300 object-cover"
            />
            <h1 className="font-semibold text-lg">Mike Robinson</h1>
            <p className="text-sm text-gray-600">
              Engineering Leader · Developer
            </p>
          </div>

          {/* Global links */}
          <nav className="flex flex-col space-y-4 font-medium">
            <a
              href="/"
              className={`hover:text-blue-600 transition-colors ${
                activePage === "home" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Home
            </a>
            <a
              href="/resume"
              className={`hover:text-blue-600 transition-colors ${
                activePage === "resume" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Resume
            </a>
            <a
              href="/projects"
              className={`hover:text-blue-600 transition-colors ${
                activePage === "projects" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Projects
            </a>
            <a
              href="/privacy"
              className={`hover:text-blue-600 transition-colors ${
                activePage === "privacy" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Privacy
            </a>
          </nav>
        </div>

        {/* Local nav column (if sections exist) */}
        <AnimatePresence>
          {sections.length > 0 && (
            <motion.div
              key="local-nav"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col w-48 p-6 space-y-3 text-sm border-l border-gray-100 sticky top-0 h-screen overflow-y-auto"
            >
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                On this page
              </h2>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`transition-colors hover:text-blue-600 ${
                    activeSection === section.id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* Mobile nav drawer */}
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
            {/* Profile block */}
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src="/images/headshot.jpg"
                alt="Michael Robinson headshot"
                className="w-20 h-20 rounded-full border border-gray-300 object-cover"
              />
              <h1 className="font-semibold text-lg">Michael Robinson</h1>
              <p className="text-sm text-gray-600">
                Engineering Leader · Developer
              </p>
            </div>

            <nav className="flex flex-col space-y-4 font-medium">
              <a
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className={
                  activePage === "home" ? "text-blue-600 font-semibold" : ""
                }
              >
                Home
              </a>
              <a
                href="/resume"
                onClick={() => setMobileNavOpen(false)}
                className={
                  activePage === "resume" ? "text-blue-600 font-semibold" : ""
                }
              >
                Resume
              </a>
              <a
                href="/projects"
                onClick={() => setMobileNavOpen(false)}
                className={
                  activePage === "projects" ? "text-blue-600 font-semibold" : ""
                }
              >
                Projects
              </a>
              <a
                href="/privacy"
                onClick={() => setMobileNavOpen(false)}
                className={
                  activePage === "privacy" ? "text-blue-600 font-semibold" : ""
                }
              >
                Privacy
              </a>
            </nav>

            {sections.length > 0 && (
              <div className="mt-6 border-t pt-4 overflow-y-auto">
                <h2 className="text-sm font-semibold mb-2">On this page</h2>
                <nav className="flex flex-col space-y-3 text-sm">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setMobileNavOpen(false)}
                      className={`transition-colors hover:text-blue-600 ${
                        activeSection === section.id
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
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

export default function App() {
  const { mode } = useLoaderData<typeof loader>();
  if (mode === "sidebar") {
    return <Sidebar />;
  }
  if (mode === "localnav") {
    return (
      <StaticWithSidebar
        sections={[
          { id: "summary", label: "Summary" },
          { id: "experience", label: "Experience" },
          { id: "education", label: "Education" },
        ]}
      />
    );
  }
  if (mode === "sidebar-local") {
    return (
      <SidebarWithLocal
        sections={[
          { id: "summary", label: "Summary" },
          { id: "experience", label: "Experience" },
          { id: "education", label: "Education" },
        ]}
        activePage="resume"
      />
    );
  }
  return <StaticTop />;
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
