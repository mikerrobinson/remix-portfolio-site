import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { createClient } from "contentful";
import type { PageSkeleton } from "../contentful/types/PageSkeleton";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

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
  const entry = await client.getEntry<PageSkeleton>("1QbK96WmMp8okj7ZFFcLYq");
  return {
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
    title: entry.fields.title ?? "No title",
    description: entry.fields.description
      ? documentToHtmlString(entry.fields.description)
      : "No description",
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Welcome
      message={loaderData.message}
      title={loaderData.title}
      description={loaderData.description}
    />
  );
}
