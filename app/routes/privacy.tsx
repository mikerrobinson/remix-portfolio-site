import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "contentful";

import type { Route } from "./+types/privacy";
import type { ContentBlock } from "../../lib/contentful/generated/content_block";

import buildPageMeta from "~/utils/buildPageMeta";

export function meta() {
  return buildPageMeta(
    "Privacy Policy",
    "mikerobinson.dev respects your privacy. View this site's privacy policy to understand how, why and what data is collected."
  );
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
    <section className="relative prose max-w-none">
      <h1>{loaderData.heading}</h1>
      <div dangerouslySetInnerHTML={{ __html: loaderData.body }} />
    </section>
  );
}
