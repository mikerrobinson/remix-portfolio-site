import { FileText, FolderGit2, Linkedin } from "lucide-react";
import { Link } from "react-router";

import Button from "~/components/button";
import LinkedInLogo from "~/components/linkedin-logo";
import { MY_HEADSHOT_URL, MY_NAME, LINKEDIN_URL } from "~/constants";
import buildPageMeta from "~/utils/buildPageMeta";

export function meta() {
  return buildPageMeta({
    title: "Home Page",
    description:
      "Technical leader, developer, and entrepreneur specializing in building high-performing, scalable teams and web applications. View my portfolio, projects, and get in touch.",
    path: "/",
  });
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <img
        src={`${MY_HEADSHOT_URL}?w=320&q=90&fm=webp`}
        alt={`${MY_NAME} avatar`}
        className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-gray-300 mb-8"
        style={{ viewTransitionName: "headshot" }}
      />
      <h1
        className="font-semibold text-3xl md:text-4xl mb-2"
        style={{ viewTransitionName: "name" }}
      >
        {MY_NAME}
      </h1>
      <p
        className="text-lg md:text-xl text-gray-600 mb-12"
        style={{ viewTransitionName: "tagline" }}
      >
        Engineering Leader · Developer
      </p>

      <nav className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          href="/resume"
          icon={<FileText className="w-4 h-4" />}
          className="px-6 py-3 text-lg"
          viewTransition
        >
          Resume
        </Button>
        <Button
          href="/projects"
          icon={<FolderGit2 className="w-4 h-4" />}
          className="px-6 py-3 text-lg"
          viewTransition
        >
          Projects
        </Button>
        <Button
          href="https://www.linkedin.com/in/mike-robinson-software/"
          variant="secondary"
          icon={<LinkedInLogo className="w-4 h-4" />}
          target="linkedin"
          className="px-6 py-3 text-lg"
        >
          LinkedIn
        </Button>
      </nav>
    </div>
  );
}
