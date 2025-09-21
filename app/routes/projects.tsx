import type { MetaFunction } from "react-router";

const pageData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mikerobinson.dev#projects]",
  url: "https://mikerobinson.dev",
  name: "Mike Robinson – Project Portfolio",
  isPartOf: {
    "@id": "https://mikerobinson.dev#website",
  },
  about: {
    "@id": "https://mikerobinson.dev#person",
  },
  description: "A portfolio of projects by Mike Robinson",
};

export const meta: MetaFunction = () => {
  return [
    { title: "Mike Robinson – Project Portfolio" },
    {
      name: "description",
      content: "A portfolio of projects by Mike Robinson",
    },
    {
      "script:ld+json": pageData,
    },
  ];
};

// Default component to display the data
export default function ProjectsPage() {
  return (
    <div className="relative prose max-w-none">
      <h1>Projects</h1>
      <p>Coming soon</p>
    </div>
  );
}
