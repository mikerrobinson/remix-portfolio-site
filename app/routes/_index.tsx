import type { Route } from "./+types/_index";
import { Welcome } from "../welcome/welcome";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { ContentBlock } from "lib/contentful/generated";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
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

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Welcome
      message={loaderData.message}
      title={loaderData.heading}
      description={loaderData.body}
    />
  );
}
