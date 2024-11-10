import { ActionFunctionArgs, data, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data(
      { message: "Method not allowed" },
      { status: 405, statusText: "Method Not Allowed" },
    );
  }

  const session = await getSession(request.headers.get("Cookie"));

  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const result = await fetch(
    `${process.env.PAYLOAD_CMS_BASE_URL}/api/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password }),
    },
  );

  if (!result.ok) {
    const errorDetails = await result.json();

    return data(
      {
        errorMessage: errorDetails.errors
          .map((e: { message: string }) => e.message)
          .join("; ") as string,
        values: { email },
      },
      {
        status: 401,
        statusText: "Unauthorized",
      },
    );
  }

  session.set("userId", (await result.json()).user.id);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Route() {
  // This seems to return incorrect types
  // const actionData = useActionData<typeof action}>();

  const actionData = useActionData<{
    errorMessage: string;
    values: { email: string };
  }>();
  return (
    <Form method="POST" className="flex flex-col gap-4">
      {actionData && <p>{actionData.errorMessage}</p>}
      <input
        placeholder="Email"
        type="email"
        name="email"
        defaultValue={actionData?.values.email}
      />
      <input placeholder="Password" type="password" name="password" />
      <button type="submit">Submit</button>
    </Form>
  );
}
