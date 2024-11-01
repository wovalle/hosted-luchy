import type { AppLoadContext } from "@remix-run/cloudflare";
import { type NeonDatabase, drizzle } from "drizzle-orm/neon-serverless";

import { Pool } from "@neondatabase/serverless";
import type { PlatformProxy } from "wrangler";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: NeonDatabase;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const client = new Pool({
    connectionString: context.cloudflare.env.DATABASE_URL,
  });

  const db = drizzle(client);

  return {
    ...context,
    db,
  };
};
