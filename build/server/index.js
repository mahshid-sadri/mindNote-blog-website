import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const client = createClient({
  projectId: "n9inbpje",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false
});
const {
  projectId: projectId$1,
  dataset: dataset$1
} = client.config();
const urlFor$1 = (source) => projectId$1 && dataset$1 ? createImageUrlBuilder({
  projectId: projectId$1,
  dataset: dataset$1
}).image(source) : null;
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...12] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  category->{title},
  readTime
}`;
async function loader$1() {
  return {
    posts: await client.fetch(POSTS_QUERY)
  };
}
const home = UNSAFE_withComponentProps(function IndexPage({
  loaderData
}) {
  const {
    posts
  } = loaderData;
  return /* @__PURE__ */ jsxs("main", {
    className: "container mx-auto min-h-screen max-w-3xl p-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-8",
      children: "Posts"
    }), /* @__PURE__ */ jsx("ul", {
      className: "flex flex-col gap-y-6",
      children: posts.map((post2) => /* @__PURE__ */ jsx("li", {
        className: "hover:underline border-b pb-4",
        children: /* @__PURE__ */ jsxs(Link, {
          to: `/${post2.slug.current}`,
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold",
            children: post2.title
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-sm text-gray-500",
            children: [post2.category?.title, " • ", post2.readTime, " • ", new Date(post2.publishedAt).toLocaleDateString()]
          }), post2.mainImage && /* @__PURE__ */ jsx("img", {
            src: urlFor$1(post2.mainImage)?.width(400).url(),
            alt: post2.title,
            className: "rounded-md mt-2"
          })]
        })
      }, post2._id))
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const {
  projectId,
  dataset
} = client.config();
const urlFor = (source) => projectId && dataset ? createImageUrlBuilder({
  projectId,
  dataset
}).image(source) : null;
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  category->{title},
  readTime,
  body
}`;
async function loader({
  params
}) {
  const post2 = await client.fetch(POST_QUERY, params);
  if (!post2) {
    throw new Response("Post not found", {
      status: 404
    });
  }
  return {
    post: post2
  };
}
const post = UNSAFE_withComponentProps(function Component({
  loaderData
}) {
  const {
    post: post2
  } = loaderData;
  const postImageUrl = post2.mainImage ? urlFor(post2.mainImage)?.width(550).url() : null;
  return /* @__PURE__ */ jsxs("main", {
    className: "container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4",
    children: [/* @__PURE__ */ jsx(Link, {
      to: "/",
      className: "hover:underline text-gray-600",
      children: "← Back to posts"
    }), /* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mt-4",
      children: post2.title
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-sm text-gray-500",
      children: [post2.category?.title, " • ", post2.readTime, " • ", new Date(post2.publishedAt).toLocaleDateString()]
    }), postImageUrl && /* @__PURE__ */ jsx("img", {
      src: postImageUrl,
      alt: post2.title,
      className: "rounded-xl mt-4"
    }), /* @__PURE__ */ jsx("div", {
      className: "prose mt-4",
      children: Array.isArray(post2.body) && /* @__PURE__ */ jsx(PortableText, {
        value: post2.body
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: post,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DSJOXdFk.js", "imports": ["/assets/chunk-WWGJGFF6-CnRWDDMw.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-mh0nnXOx.js", "imports": ["/assets/chunk-WWGJGFF6-CnRWDDMw.js"], "css": ["/assets/root-DIun_y-g.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-foexhxwy.js", "imports": ["/assets/chunk-WWGJGFF6-CnRWDDMw.js", "/assets/compat-DoAXOerC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/post": { "id": "routes/post", "parentId": "root", "path": ":slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/post-CpQJtZKG.js", "imports": ["/assets/chunk-WWGJGFF6-CnRWDDMw.js", "/assets/compat-DoAXOerC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-57ebf09d.js", "version": "57ebf09d", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/post": {
    id: "routes/post",
    parentId: "root",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
