import { type ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { messages } from "../../db/schema";

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const data = await request.json();
  const token = request.headers.get("x-luchy-token");

  if (!data) {
    return json({ ok: false, error: "Missing data" }, { status: 400 });
  }

  if (!token) {
    return json({ ok: false, error: "Missing token" }, { status: 400 });
  }

  await context.db.insert(messages).values({
    data: JSON.stringify({
      token,
      json: data,
    }),
  });

  return {
    ok: true,
  };
};
