import Link from "next/link";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[  
  _type == "post" 
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post) => (
        <div key={post._id}>
          <Link href={`/${post.slug.current}`}>
            <h2>{post.title}</h2>
          </Link>

          <p>
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}