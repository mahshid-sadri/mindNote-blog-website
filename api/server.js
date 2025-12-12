import { installGlobals } from "@react-router/node";
import { createRequestHandler } from "@react-router/node";
import * as build from "../build/server/index.js";

// Polyfills for Fetch/Request/Response etc. in the Node runtime
installGlobals();

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

