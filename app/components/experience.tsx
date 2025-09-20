export function Experience({
  title,
  company,
  startDate,
  endDate,
  location,
  descriptionHtml,
}: {
  title: string;
  company: { name: string; logo: { url: string; altText?: string } };
  startDate: string;
  endDate: string;
  location?: { lon: number; lat: number };
  descriptionHtml: string;
}) {
  return (
    <div className="experience">
      <h3>
        <span className="title">{title}</span>
        <span> at </span>
        <span className="company-name">{company.name}</span>
      </h3>
      <p className="start-date">{startDate}</p>
      <p className="end-date">{endDate}</p>
      {location && (
        <p className="location">
          Location: {location.lat}, {location.lon}
        </p>
      )}
      <img
        className="company-logo"
        src={company.logo.url}
        alt={company.logo.altText}
      ></img>
      <p
        className="description"
        dangerouslySetInnerHTML={{
          __html: descriptionHtml,
        }}
      />
    </div>
  );
}
