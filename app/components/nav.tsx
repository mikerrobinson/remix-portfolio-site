import { Menu, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

import { MY_HEADSHOT_URL, MY_NAME } from "~/constants";

// desktop:
// hidden md:flex flex-shrink-0 border-r border-gray-200 bg-white shadow-sm z-40 sticky top-0 h-screen overflow-y-auto
//  w-56 flex flex-col p-6 space-y-6

// mobile:
// md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-3

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
    // <header className="w-56 flex flex-col p-6 space-y-6">
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg flex flex-shrink-0 md:w-56 flex-col md:px-6 md:py-6 md:space-y-6 md:border-r md:right-unset md:h-screen border-gray-200 justify-between md:justify-start px-4 py-3">
      {/* <div className="flex flex-col items-center text-center space-y-3">
        <img
          src={`${MY_HEADSHOT_URL}?w=160&q=90&fm=webp`}
          alt={`${MY_NAME} headshot`}
          className="w-20 h-20 rounded-full border border-gray-300 object-cover"
        />
        <h1 className="font-semibold text-lg">{MY_NAME}</h1>
        <p className="text-sm text-gray-600">Engineering Leader · Developer</p>
      </div> */}

      <div className="flex md:flex-col items-center md:text-center space-x-3 md:space-y-3 md:space-x-0">
        <img
          src={`${MY_HEADSHOT_URL}?w=160&q=90&fm=webp`}
          alt={`${MY_NAME} avatar`}
          className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-gray-300"
        />
        <div className="flex flex-col">
          <h1 className="font-semibold text-xl">{MY_NAME}</h1>
          <p className="text-sm text-gray-600">
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
        className={`h-auto max-h-0 overflow-hidden opacity-0 md:max-h-500 md:opacity-100 border-t border-gray-200 transition-all duration-300 ease-in-out ${
          open ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col font-medium py-8">
          <li className="py-3">
            <Link
              to="/"
              prefetch="viewport"
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
              onClick={handleLinkClick}
              className="hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
