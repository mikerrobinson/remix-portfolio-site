import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "contentful";
import { Resume } from "lib/contentful/generated";
import { useLoaderData } from "react-router";

import type { Route } from "./+types/resume";

import { Education } from "~/components/education";
import { Experience } from "~/components/experience";
import buildPageMeta from "~/utils/buildPageMeta";

export function meta() {
  return buildPageMeta(
    "Resume",
    "Mike Robinson's resume, detailing my portfolio of work and experience as an engineering manager, software developer, and technical leader."
  );
}

// Loader for GET requests
export async function loader({ context }: Route.LoaderArgs) {
  const client = createClient({
    space: context.cloudflare.env.CONTENTFUL_SPACE_ID,
    accessToken: context.cloudflare.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const response = await client.getEntry<Resume>("5f1Vlwi238R0394kN92vya", {
    include: 10,
  });
  const resume = new Resume({
    ...response,
    contentTypeId: response.sys.contentType?.sys.id ?? "resume",
  });

  return {
    raw: resume,
    summaryHtml: documentToHtmlString(resume.summary),
    experience: resume.experience.map((expItem) => ({
      title: expItem.title,
      company: expItem.company && {
        name: expItem.company.name,
        logo: expItem.company.logo && {
          url: expItem.company.logo.fields.file.url,
          altText: expItem.company.logo.fields.description,
        },
      },
      startDate: expItem.startDate,
      endDate: expItem.endDate,
      descriptionHtml: documentToHtmlString(expItem.description),
    })),
    education: resume.education.map((eduItem) => ({
      school: eduItem.school,
      major: eduItem.major,
      minor: eduItem.minor,
      societies: eduItem.societies,
      logo: eduItem.logo && {
        url: eduItem.logo.fields.file.url,
        altText: eduItem.logo.fields.description,
      },
    })),
  };
}

export default function ResumePage() {
  const { raw, summaryHtml, experience, education } =
    useLoaderData<typeof loader>();

  return (
    <div className="relative prose max-w-none">
      {summaryHtml && (
        <section id="summary">
          <h2 className="border-b border-gray-300">Summary</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: summaryHtml,
            }}
          />
        </section>
      )}
      {experience && (
        <section id="experience">
          <h2 className="border-b border-gray-300">Experience</h2>
          {experience?.map((experience) => (
            <Experience
              key={experience.title + experience.company?.name}
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
          <h2 className="border-b border-gray-300">Education</h2>
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
