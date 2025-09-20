import type { Route } from "./+types/privacy";
import { createClient } from "contentful";
//import type { ContentBlockSkeleton } from "../contentful/types/ContentBlockSkeleton";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { ContentBlock } from "../../lib/contentful/generated/content_block";

const pageData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mikerobinson.dev#privacy-policy",
  url: "https://mikerobinson.dev",
  name: "Mike Robinson – Privacy Policy",
  isPartOf: {
    "@id": "https://mikerobinson.dev#website",
  },
  about: {
    "@id": "https://mikerobinson.dev#person",
  },
  description:
    "Mike Robinson's resume, detailing my portfolio of work and experience as an engineering manager, software developer, and technical leader.",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mike Robinson – Privacy Policy" },
    {
      name: "description",
      content:
        "mikerobinson.dev respects your privacy. View this site's privacy policy to understand how, why and what data is collected.",
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
    heading: entry.fields.heading,
    body: documentToHtmlString(entry.fields.body),
  };
}

export default function Privacy({ loaderData }: Route.ComponentProps) {
  return (
    <section>
      <h1>{loaderData.heading}</h1>
      <div dangerouslySetInnerHTML={{ __html: loaderData.body }} />
    </section>
  );
}
