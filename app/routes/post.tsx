import { Link, type LoaderFunctionArgs } from "react-router";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "~/sanity/client";

// تبدیل تصویر Sanity به URL
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

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

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await client.fetch<SanityDocument | null>(POST_QUERY, params);
  
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }
  
  return { post };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Component({ loaderData }: { loaderData: LoaderData }) {
  const { post } = loaderData;
  const postImageUrl = post.mainImage ? urlFor(post.mainImage)?.width(550).url() : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link to="/" className="hover:underline text-gray-600">
        ← Back to posts
      </Link>

      <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
      <p className="text-sm text-gray-500">
        {post.category?.title} • {post.readTime} • {new Date(post.publishedAt).toLocaleDateString()}
      </p>

      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="rounded-xl mt-4"
        />
      )}

      <div className="prose mt-4">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
