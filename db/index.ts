import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type D1Env = {
  DB?: Parameters<typeof drizzle>[0];
};

export function getDb(env: D1Env) {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}
