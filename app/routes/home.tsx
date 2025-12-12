import type { SanityDocument } from "@sanity/client";
import { Link } from "react-router";
import { client } from "~/sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { Route } from "./+types/home";

// تبدیل تصویر Sanity به URL
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Query برای گرفتن همه فیلدهای لازم
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...12] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  category->{title},
  readTime
}`;

export async function loader() {
  return { posts: await client.fetch<SanityDocument[]>(POSTS_QUERY) };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function IndexPage({ loaderData }: { loaderData: LoaderData }) {
  const { posts } = loaderData;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-6">
        {posts.map((post) => (
          <li className="hover:underline border-b pb-4" key={post._id}>
            <Link to={`/${post.slug.current}`}>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                {post.category?.title} • {post.readTime} • {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage)?.width(400).url()}
                  alt={post.title}
                  className="rounded-md mt-2"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
