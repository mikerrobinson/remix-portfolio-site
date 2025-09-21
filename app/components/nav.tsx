import { Link } from "react-router";

import { MY_HEADSHOT_URL, MY_NAME } from "~/constants";

export type NavProps = {
  compact?: boolean;
  onLinkClick?: () => void;
  activePage?: string;
  sections?: { id: string; label: string }[];
  activeSection?: string;
};

export function Nav({
  compact,
  onLinkClick,
  activePage = "",
  sections = [],
  activeSection = "",
}: NavProps) {
  return (
    <div
      className={`${compact ? "w-full" : "w-56"} flex flex-col ${compact ? "p-4" : "p-6"} space-y-6`}
    >
      {/* Profile block */}
      <div className="flex flex-col items-center text-center space-y-3">
        <img
          src={`${MY_HEADSHOT_URL}?w=300&q=80&fm=webp`}
          alt={`${MY_NAME} headshot`}
          className="w-20 h-20 rounded-full border border-gray-300 object-cover"
        />
        <h1 className="font-semibold text-lg">{MY_NAME}</h1>
        <p className="text-sm text-gray-600">Engineering Leader · Developer</p>
      </div>

      {/* Global links */}
      <nav className="flex flex-col space-y-4 font-medium">
        <Link
          to="/"
          prefetch="viewport"
          onClick={onLinkClick}
          className={`hover:text-blue-600 transition-colors ${activePage === "home" ? "text-blue-600 font-semibold" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/resume"
          prefetch="viewport"
          onClick={onLinkClick}
          className={`hover:text-blue-600 transition-colors ${activePage === "resume" ? "text-blue-600 font-semibold" : ""}`}
        >
          Resume
        </Link>
        <Link
          to="/projects"
          prefetch="viewport"
          onClick={onLinkClick}
          className={`hover:text-blue-600 transition-colors ${activePage === "projects" ? "text-blue-600 font-semibold" : ""}`}
        >
          Projects
        </Link>
        <Link
          to="/privacy"
          prefetch="viewport"
          onClick={onLinkClick}
          className={`hover:text-blue-600 transition-colors ${activePage === "privacy" ? "text-blue-600 font-semibold" : ""}`}
        >
          Privacy
        </Link>
      </nav>

      {/* Local nav column (if sections exist) */}
      {sections.length > 0 && (
        <div className={`${compact ? "mt-4 border-t pt-4" : ""} text-sm`}>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            On this page
          </h2>
          <nav className="flex flex-col space-y-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={onLinkClick}
                className={`transition-colors hover:text-blue-600 ${activeSection === section.id ? "text-blue-600 font-semibold" : "text-gray-700"}`}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export default Nav;
