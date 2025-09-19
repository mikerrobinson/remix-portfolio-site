export function Education({
  school,
  major,
  minor,
  logo,
  societies,
}: {
  school: string;
  major?: string;
  minor?: string;
  logo?: { url: string; altText?: string };
  societies?: string;
}) {
  return (
    <div className="education">
      <h3 className="school">{school}</h3>
      <dl>
        {major && (
          <>
            <dt>Major</dt>
            <dd>{major}</dd>
          </>
        )}
        {minor && (
          <>
            <dt>Minor</dt>
            <dd>{minor}</dd>
          </>
        )}
        {societies && (
          <>
            <dt>Activites and Societies</dt>
            <dd>{societies}</dd>
          </>
        )}
      </dl>
      {logo?.url && (
        <img className="logo" src={logo?.url} alt={logo?.altText} />
      )}
    </div>
  );
}
