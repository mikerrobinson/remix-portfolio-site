const options = { year: "numeric", month: "short" } as const;
const formatter = new Intl.DateTimeFormat("en-US", options);

export function Experience({
  title,
  company,
  startDate,
  endDate,
  location,
  descriptionHtml,
}: {
  title: string;
  company?: { name: string; logo?: { url: string; altText?: string } };
  startDate?: string;
  endDate?: string;
  location?: { lon: number; lat: number };
  descriptionHtml: string;
}) {
  const formattedStartDate = startDate
    ? formatter.format(Date.parse(`${startDate} 12:00:00 MST`))
    : "";
  const formattedEndDate = endDate
    ? formatter.format(Date.parse(`${endDate} 12:00:00 MST`))
    : "";
  return (
    <div className="experience flex flex-col items-start mb-8">
      {company?.logo && (
        <img
          className="mt-0 mb-0 company-logo h-16 md:h-12 w-auto mr-4"
          src={company.logo.url}
          alt={company.logo.altText}
          loading="lazy"
        />
      )}
      <div className="flex flex-col mb-1">
        <h3 className="mt-0 mb-0">
          <span className="title">{title}</span>
          {company && (
            <span className="company-name hidden">
              &nbsp; at {company.name}
            </span>
          )}
        </h3>
        <span className="dates">
          {formattedStartDate} to {formattedEndDate}
        </span>
      </div>
      {location && (
        <p className="location">
          Location: {location.lat}, {location.lon}
        </p>
      )}
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: descriptionHtml,
        }}
      />
    </div>
  );
}
