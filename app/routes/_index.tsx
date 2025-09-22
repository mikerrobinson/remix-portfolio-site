import buildPageMeta from "~/utils/buildPageMeta";

export function meta() {
  return buildPageMeta(
    "Home Page",
    "Welcome to my personal place on the internet."
  );
}

export default function Home() {
  return (
    <section className="relative prose max-w-none">
      <h2>Welcome!</h2>
      <p>This is my personal space on the internet.</p>
    </section>
  );
}
