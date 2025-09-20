export function Education({
  school,
  major,
  minor,
  logo,
  other,
}: {
  school: string;
  major?: string;
  minor?: string;
  logo?: { url: string; altText?: string };
  other?: string;
}) {
  return (
    <div className="education">
      <h3 className="school">{school}</h3>
      {logo?.url && (
        <img className="logo" src={logo?.url} alt={logo?.altText} />
      )}
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
        {other && (
          <>
            <dt>Additional notes</dt>
            <dd>{other}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
