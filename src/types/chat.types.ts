import type { Database } from "./db.types";

export type TChatMessagewWithProfile =
  Database["public"]["Tables"]["chat_message"]["Row"] & {
    profile: Database["public"]["Tables"]["profile"]["Row"] | null;
  };
