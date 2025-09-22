import { Menu, X } from "lucide-react";
import { Link } from "react-router";

import { MY_HEADSHOT_URL, MY_NAME } from "~/constants";

// desktop:
// hidden md:flex flex-shrink-0 border-r border-gray-200 bg-white shadow-sm z-40 sticky top-0 h-screen overflow-y-auto
//  w-56 flex flex-col p-6 space-y-6

// mobile:
// md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-3

export function Nav() {
  return (
    // <header className="w-56 flex flex-col p-6 space-y-6">
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg flex flex-shrink-0 md:w-56 flex-col md:px-6 md:py-6 md:space-y-6 md:border-r md:right-unset md:h-screen border-gray-200 md:items-center justify-between md:justify-start px-4 py-3">
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

      {/* <a className="p-2 rounded hover:bg-gray-100" href="#menu">
        <X className="w-6 h-6" />
        <Menu className="w-6 h-6" />
      </a> */}

      <div className="md:hidden absolute right-4 rounded hover:bg-gray-100">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle">
          <div className="menu-icon">
            <span></span>
          </div>
        </label>
      </div>

      <nav
        aria-label="Global navigation"
        className="h-auto max-h-0 overflow-hidden opacity-0 md:max-h-500 md:opacity-100 transition-[max-height] transition-opacity duration-3000 ease-in-out"
      >
        <ul className="flex flex-col space-y-4 font-medium py-8">
          <li>
            <Link
              to="/"
              prefetch="viewport"
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/resume"
              prefetch="viewport"
              className="hover:text-blue-600 transition-colors"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              prefetch="viewport"
              className="hover:text-blue-600 transition-colors"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/privacy"
              prefetch="viewport"
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
