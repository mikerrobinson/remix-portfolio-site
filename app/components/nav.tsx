import { Menu, X, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

import GitHubLogo from "./github-logo";
import LinkedInLogo from "./linkedin-logo";

import Button from "~/components/button";
import { MY_HEADSHOT_URL, MY_NAME } from "~/constants";

export function Nav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    if (open) {
      document.addEventListener<"keydown">("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close when clicking outside menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg flex flex-shrink-0 md:w-56 flex-col md:px-6 md:py-6 md:space-y-6 md:border-r md:right-unset md:h-screen border-gray-200 justify-between md:justify-start px-4 py-3">
      <div className="flex md:flex-col items-center md:text-center space-x-3 md:space-x-0">
        <img
          src={`${MY_HEADSHOT_URL}?w=160&q=90&fm=webp`}
          alt={`${MY_NAME} avatar`}
          className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-gray-300"
          style={{ viewTransitionName: "headshot" }}
        />
        <div className="flex flex-col">
          <h1 className="font-semibold text-xl" style={{ viewTransitionName: "name" }}>
            {MY_NAME}
          </h1>
          <p className="text-sm text-gray-600" style={{ viewTransitionName: "tagline" }}>
            Engineering Leader · Developer
          </p>
        </div>
      </div>

      <button
        ref={buttonRef}
        className="absolute md:hidden p-2 top-4 right-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-controls="mobile-menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        <span className="sr-only">Toggle navigation menu</span>
      </button>

      <nav
        ref={menuRef}
        aria-label="Global navigation"
        className={`h-auto max-h-0 opacity-0 md:max-h-500 md:opacity-100 transition-all duration-300 ease-in-out ${
          open ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col font-medium py-3 border-t border-b border-gray-200">
          <li className="py-3">
            <Link
              to="/"
              prefetch="viewport"
              viewTransition
              onClick={handleLinkClick}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="py-3">
            <Link
              to="/resume"
              prefetch="viewport"
              viewTransition
              onClick={handleLinkClick}
              className="hover:text-blue-600 transition-colors"
            >
              Resume
            </Link>
          </li>
          <li className="py-3">
            <Link
              to="/projects"
              prefetch="viewport"
              viewTransition
              onClick={handleLinkClick}
              className="hover:text-blue-600 transition-colors"
            >
              Projects
            </Link>
          </li>
          <li className="py-3">
            <Link
              to="/privacy"
              prefetch="viewport"
              viewTransition
              onClick={handleLinkClick}
              className="hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>
          </li>
        </ul>
        <div className="py-8 flex md:flex-col items-center md:text-center space-x-3 md:space-y-3 md:space-x-0">
          <Button
            id="download-resume-button"
            href="Michael_Robinson_Resume.pdf"
            icon={<Download className="w-4 h-4" />}
            className="hidden w-full justify-center"
            download
          >
            Download
          </Button>
          <Button
            id="view-linkedin-button"
            href="https://www.linkedin.com/in/mike-robinson-software/"
            className="w-full justify-center"
            variant="secondary"
            icon={<LinkedInLogo className="w-4 h-4" />}
            target="linkedin"
          >
            LinkedIn
          </Button>
          <Button
            id="view-github-button"
            href="https://github.com/mikerrobinson"
            className="w-full justify-center"
            variant="secondary"
            icon={<GitHubLogo className="w-4 h-4" />}
            target="github"
          >
            GitHub
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
