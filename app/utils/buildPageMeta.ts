import { MY_NAME, WEBSITE_URL } from "~/constants";

export default function buildPageMeta({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}) {
  return [
    { title: `${title} | ${MY_NAME}` },
    {
      name: "description",
      content: description,
    },
    { tagName: "link", rel: "canonical", href: WEBSITE_URL + path },
    index && { name: "robots", content: "index, follow" },
    // open graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: `${title} | ${MY_NAME}` },
    { property: "og:description", content: description },
    { property: "og:url", content: WEBSITE_URL + path },
    { property: "og:site_name", content: "mikerobinson.dev" },
    {
      property: "og:image",
      content:
        "https://images.ctfassets.net/de578b4i2gcz/6gNEPLHaMLjUhWCWq22Fvl/3844cd76239823349fd1a4faadf3a151/mikerobinson-dev-social-share.png",
    },
    // twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `${title} | ${MY_NAME}` },
    { name: "twitter:description", content: description },
    {
      name: "twitter:image",
      content:
        "https://images.ctfassets.net/de578b4i2gcz/6gNEPLHaMLjUhWCWq22Fvl/3844cd76239823349fd1a4faadf3a151/mikerobinson-dev-social-share.png",
    },
    { name: "twitter:site", content: "@mrobinson78" },
    { name: "twitter:creator", content: "@mrobinson78" },
    // structured data
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": WEBSITE_URL + path,
        url: WEBSITE_URL + path,
        name: `${title} | ${MY_NAME}`,
        isPartOf: {
          "@id": WEBSITE_URL + "#website",
        },
        about: {
          "@id": WEBSITE_URL + "#person",
        },
        description: description,
      },
    },
  ];
}
