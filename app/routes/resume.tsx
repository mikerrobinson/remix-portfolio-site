import type { Route } from "./+types/resume";
import { useLoaderData } from "react-router";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Resume } from "lib/contentful/generated";
import { Education } from "~/components/education";
import { Experience } from "~/components/experience";

const pageData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mikerobinson.dev#resume",
  url: "https://mikerobinson.dev",
  name: "Mike Robinson – Resume",
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
    { title: "Mike Robinson – Resume" },
    {
      name: "description",
      content:
        "Mike Robinson's resume, detailing my portfolio of work and experience as an engineering manager, software developer, and technical leader.",
    },
    {
      "script:ld+json": pageData,
    },
  ];
}

// Loader for GET requests
export async function loader({ request, context }: Route.LoaderArgs) {
  const client = createClient({
    space: context.cloudflare.env.CONTENTFUL_SPACE_ID,
    accessToken: context.cloudflare.env.CONTENTFUL_ACCESS_TOKEN, // or process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN for drafts
  });

  const resumes = await client.getEntries<Resume>({
    "sys.id": "5f1Vlwi238R0394kN92vya",
    include: 10, // Specify the depth of linked entries to resolve
  });
  if (resumes.items.length !== 1) {
    throw new Response("Resume not found", { status: 404 });
  }
  const resume = resumes.items[0];
  return {
    raw: resume,
    name: resume.fields.name,
    headline: resume.fields.headline,
    summaryHtml: documentToHtmlString(resume.fields.summary),
    experience: (resume.fields.experience || []).map((experience) => ({
      title: experience.fields.title,
      company: {
        name: experience.fields.company.fields.name,
        logo: {
          url: experience.fields.company.fields.logo?.fields.file?.url,
          altText: experience.fields.company.fields.logo?.fields.description,
        },
      },
      startDate: experience.fields.startDate,
      endDate: experience.fields.endDate,
      descriptionHtml: documentToHtmlString(experience.fields.description),
    })),
    education: (resume.fields.education || []).map((education) => ({
      school: education.fields.school,
      major: education.fields.major,
      minor: education.fields.minor,
      societies: education.fields.societies,
      logo: {
        url: education.fields.logo?.fields.file?.url,
        altText: education.fields.logo?.fields.description,
      },
    })),
  };
}

// Default component to display the data
export default function ResumePage() {
  const { raw, name, headline, summaryHtml, experience, education } =
    useLoaderData<typeof loader>();
  return (
    <>
      <h1>
        {name && <div className="name text-2xl">{name}</div>}
        {headline && <div className="headline">{headline}</div>}
      </h1>
      {summaryHtml && (
        <section id="summary">
          <h2>Summary</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: summaryHtml,
            }}
          />
        </section>
      )}
      {experience && (
        <section id="experience">
          <h2>Experience</h2>
          {experience?.map((experience) => (
            <Experience
              key={experience.title + experience.company.name}
              title={experience.title}
              company={experience.company}
              startDate={experience.startDate}
              endDate={experience.endDate}
              descriptionHtml={experience.descriptionHtml}
            />
          ))}
        </section>
      )}
      {education && (
        <section id="education">
          <h2>Education</h2>
          {education?.map((education) => (
            <Education
              key={education.school}
              school={education.school}
              major={education.major}
              minor={education.minor}
              other={education.societies}
              logo={education.logo}
            />
          ))}
        </section>
      )}
      <details>
        <summary>Raw Loader Data</summary>
        <pre>{JSON.stringify(raw, null, 2)}</pre>
      </details>
    </>
  );
}
