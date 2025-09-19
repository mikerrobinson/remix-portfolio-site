export function Education({
  school,
  major,
  minor,
  logoUrl,
  societies,
}: {
  school: string;
  major?: string;
  minor?: string;
  logoUrl?: string;
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
      <img className="logo" src={logoUrl}></img>
    </div>
  );
}
