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
    // summary and lists can be nullable according to the generated types; cast safely
    summaryHtml: documentToHtmlString(resume.fields.summary as any),
    experience: ((resume.fields.experience ?? []) as any[]).map(
      (expItem: any) => ({
        title: expItem.fields.title,
        company: {
          name: expItem.fields.company.fields.name,
          logo: {
            url: expItem.fields.company.fields.logo?.fields.file?.url,
            altText: expItem.fields.company.fields.logo?.fields.description,
          },
        },
        startDate: expItem.fields.startDate,
        endDate: expItem.fields.endDate,
        descriptionHtml: documentToHtmlString(
          expItem.fields.description as any
        ),
      })
    ),
    education: ((resume.fields.education ?? []) as any[]).map(
      (eduItem: any) => ({
        school: eduItem.fields.school,
        major: eduItem.fields.major,
        minor: eduItem.fields.minor,
        societies: eduItem.fields.societies,
        logo: {
          url: eduItem.fields.logo?.fields.file?.url,
          altText: eduItem.fields.logo?.fields.description,
        },
      })
    ),
  };
}

// Default component to display the data
export default function ResumePage() {
  const { raw, name, headline, summaryHtml, experience, education } =
    useLoaderData<typeof loader>();

  const sections = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
  ];
  return (
    <div className="relative prose max-w-none">
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
    </div>
  );
}
