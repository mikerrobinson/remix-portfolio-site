function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
}

export default function buildPageMeta(title: string, description: string) {
  return [
    { title: `Mike Robinson - ${title}` },
    {
      name: "description",
      content: description,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `https://mikerobinson.dev#${slugify(title)}`,
        url: `https://mikerobinson.dev#${slugify(title)}`,
        name: `Mike Robinson - ${title}`,
        isPartOf: {
          "@id": "https://mikerobinson.dev#website",
        },
        about: {
          "@id": "https://mikerobinson.dev#person",
        },
        description: description,
      },
    },
  ];
}
