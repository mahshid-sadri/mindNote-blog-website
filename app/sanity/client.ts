import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "n9inbpje",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

