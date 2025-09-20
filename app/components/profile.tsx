export function Profile({
  name,
  taglineHtml,
  photo,
  links,
}: {
  name: string;
  taglineHtml: string;
  photo: { url: string; altText: string };
  links: Array<{ label: string; url: string }>;
}) {
  return (
    <div className="profile">
      <h1 className="name">{name}</h1>
      <p
        className="tagline"
        dangerouslySetInnerHTML={{
          __html: taglineHtml,
        }}
      />
      <img className="logo" src={photo.url} alt={photo.altText} />
      <ul className="links">
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
