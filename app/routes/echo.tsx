import { Form, useLoaderData, useActionData } from "react-router";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

import { getEcho, createEcho } from "~/utils/echo.server"; // Import server logic

// Loader for GET requests
export async function loader({ request }: LoaderFunctionArgs) {
  if (request.headers.get("x-debug")) {
    return null;
  }
  const echo = await getEcho(request);
  console.log("Echo Loader:\n", echo);
  return echo;
}

// Action for POST requests
export async function action({ request }: ActionFunctionArgs) {
  const echo = await createEcho(request);
  console.log("Echo Action:\n", echo);
  return echo;
}

// Default component to display the data
export default function Echo() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const data = actionData || loaderData;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {data ? (
        <>
          <h1>Request Echo</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      ) : (
        <>
          <h1>HTTP Request Echo Route</h1>
          <p>
            Submit the form below to see the `POST` request data. Visit this
            page directly to see the `GET` request data.
          </p>
          <Form method="post">
            <label>
              Your Name: <input type="text" name="name" />
            </label>
            <button type="submit">Submit via POST</button>
          </Form>
          <hr />{" "}
        </>
      )}
    </div>
  );
}
