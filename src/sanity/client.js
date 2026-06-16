import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yk2toi4y",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});
