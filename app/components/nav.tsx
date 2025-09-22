import { Link } from "react-router";

import { MY_HEADSHOT_URL, MY_NAME } from "~/constants";

export function Nav() {
  return (
    <div className="w-56 flex flex-col p-6 space-y-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <img
          src={`${MY_HEADSHOT_URL}?w=160&q=90&fm=webp`}
          alt={`${MY_NAME} headshot`}
          className="w-20 h-20 rounded-full border border-gray-300 object-cover"
        />
        <h1 className="font-semibold text-lg">{MY_NAME}</h1>
        <p className="text-sm text-gray-600">Engineering Leader · Developer</p>
      </div>

      <nav className="flex flex-col space-y-4 font-medium">
        <Link
          to="/"
          prefetch="viewport"
          className="hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/resume"
          prefetch="viewport"
          className="hover:text-blue-600 transition-colors"
        >
          Resume
        </Link>
        <Link
          to="/projects"
          prefetch="viewport"
          className="hover:text-blue-600 transition-colors"
        >
          Projects
        </Link>
        <Link
          to="/privacy"
          prefetch="viewport"
          className="hover:text-blue-600 transition-colors"
        >
          Privacy
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
