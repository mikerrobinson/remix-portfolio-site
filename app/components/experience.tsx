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
  return (
    <div className="experience">
      <h3>
        {title && company ? (
          <>
            <span className="title">{title}</span>
            <span> at </span>
            <span className="company-name">{company.name}</span>
          </>
        ) : (
          <span className="title">{title}</span>
        )}
      </h3>
      {startDate && <p className="start-date">{startDate}</p>}
      {endDate && <p className="end-date">{endDate}</p>}
      {location && (
        <p className="location">
          Location: {location.lat}, {location.lon}
        </p>
      )}
      {company?.logo && (
        <img
          className="company-logo"
          src={company.logo.url}
          alt={company.logo.altText}
        />
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
