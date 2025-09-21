import buildPageMeta from "~/utils/buildPageMeta";

export function meta() {
  return buildPageMeta(
    "Home Page",
    "Welcome to my personal place on the internet."
  );
}

export default function Home() {
  return <h1>Welcome to my website</h1>;
}
