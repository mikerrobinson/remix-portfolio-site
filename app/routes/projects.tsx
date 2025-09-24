import type { MetaFunction } from "react-router";

import buildPageMeta from "~/utils/buildPageMeta";

export const meta: MetaFunction = () => {
  return buildPageMeta({
    title: "Project Portfolio",
    description:
      "Explore the web development projects I've undertaken over the years.",
    path: "/projects",
  });
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
