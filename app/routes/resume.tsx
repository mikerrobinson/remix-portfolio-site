import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "contentful";
import { useLoaderData } from "react-router";

import type { Route } from "./+types/resume";
import type {
  Resume,
  Experience as ExperienceType,
  Education as EducationType,
} from "lib/contentful/generated";

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

export function meta() {
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
export async function loader({ context }: Route.LoaderArgs) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    summaryHtml: documentToHtmlString(resume.fields.summary as any),
    experience: ((resume.fields.experience ?? []) as ExperienceType[]).map(
      (expItem: ExperienceType) => ({
        title: expItem.title,
        company: expItem.company
          ? {
              name: expItem.company.fields.name,
              logo:
                expItem.company.logo &&
                typeof expItem.company.logo.fields.file.url === "string"
                  ? {
                      url: expItem.company.logo.fields.file.url,
                      altText: expItem.company.logo.fields.description,
                    }
                  : undefined,
            }
          : undefined,
        startDate: expItem.fields.startDate,
        endDate: expItem.fields.endDate,
        descriptionHtml: documentToHtmlString(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          expItem.fields.description as any
        ),
      })
    ),
    education: ((resume.fields.education ?? []) as EducationType[]).map(
      (eduItem: EducationType) => ({
        school: eduItem.fields.school,
        major: eduItem.fields.major,
        minor: eduItem.fields.minor,
        societies: eduItem.fields.societies,
        logo:
          eduItem.logo && eduItem.logo.fields.file.url
            ? {
                url: eduItem.logo.fields.file.url,
                altText: eduItem.logo.fields.description,
              }
            : undefined,
      })
    ),
  };
}

export default function ResumePage() {
  const { raw, summaryHtml, experience, education } =
    useLoaderData<typeof loader>();

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
              key={experience.descriptionHtml}
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
