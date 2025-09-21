import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "contentful";

import type { Route } from "./+types/_index";
import type { ContentBlock } from "lib/contentful/generated";

const pageData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mikerobinson.dev#homepage",
  url: "https://mikerobinson.dev",
  name: "Mike Robinson – Portfolio & Resume",
  isPartOf: {
    "@id": "https://mikerobinson.dev#website",
  },
  about: {
    "@id": "https://mikerobinson.dev#person",
  },
  description:
    "Welcome to the personal website of Mike Robinson – engineering manager, software developer, and technical leader.",
};

export function meta() {
  return [
    { title: "Mike Robinson – Home Page" },
    {
      name: "description",
      content:
        "Welcome to my little corner on the internet.  This site features some basic information about me, my resume, and links various projects and work.",
    },
    {
      "script:ld+json": pageData,
    },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const client = createClient({
    space: context.cloudflare.env.CONTENTFUL_SPACE_ID,
    accessToken: context.cloudflare.env.CONTENTFUL_ACCESS_TOKEN, // or process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN for drafts
  });
  const entry = await client.getEntry<ContentBlock>("d2PqGLeIaxJ5tzVERTml6");
  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
    heading: entry.fields.heading,
    body: documentToHtmlString(entry.fields.body),
  };
}

export default function Home() {
  return <h1>Welcome to my website</h1>;
}
