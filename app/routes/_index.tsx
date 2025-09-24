import buildPageMeta from "~/utils/buildPageMeta";

export function meta() {
  return buildPageMeta({
    title: "Home Page",
    description:
      "Technical leader, developer, and entrepreneur specializing in building high-performing, scalable teams and web applications. View my portfolio, projects, and get in touch.",
    path: "/",
  });
}

export default function Home() {
  return (
    <section className="relative prose max-w-none">
      <h2>Welcome!</h2>
      <p>This is my personal space on the internet.</p>
    </section>
  );
}
