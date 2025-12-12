import { installGlobals } from "@react-router/node";
import { createRequestHandler } from "@react-router/node";

// MUST import from the server build entry (Vite output)
import * as build from "../build/server/entry.server.js";

installGlobals();

export default async function handler(req, res) {
  try {
    const handleRequest = createRequestHandler({
      build,
      mode: process.env.NODE_ENV,
    });

    return handleRequest(req, res);
  } catch (err) {
    console.error("SSR Error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
