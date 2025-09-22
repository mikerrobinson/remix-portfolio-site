import type { MetaFunction } from "react-router";

import buildPageMeta from "~/utils/buildPageMeta";

export const meta: MetaFunction = () => {
  return buildPageMeta(
    "Project Portfolio",
    "A portfolio of projects I've undertaken over the years."
  );
};

// Default component to display the data
export default function ProjectsPage() {
  return (
    <div className="relative prose max-w-none">
      <h2>Projects</h2>
      <p>Coming soon</p>
    </div>
  );
}
