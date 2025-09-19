import type { Route } from "./+types/resume";
import { useLoaderData } from "react-router";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Resume } from "lib/contentful/generated";
import { Education } from "~/components/education";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mike Robinson - Resume" },
    {
      name: "description",
      content:
        "The resume of Mike Robinson, a software developer manager specializing in web and mobile applications.",
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
        {name && <div class="name">{name}</div>}
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
            <div className="experience" key={experience.title}>
              <h3>
                <div>{experience.title}</div>
                <div>{experience.company.name}</div>
              </h3>
              <p>
                {experience.startDate} to {experience.endDate}
              </p>
              <img
                className="max-w-20 h-auto inline-block mr-2 mb-2"
                src={experience.company.logo.url}
                alt={experience.company.logo.altText}
              ></img>
              <p
                dangerouslySetInnerHTML={{
                  __html: experience.descriptionHtml,
                }}
              />
            </div>
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
              societies={education.societies}
              logoUrl={education.logoUrl}
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
