import Image from "next/image"
import Link from 'next/link';
import { getDatabase } from '@/lib/notion';
import Text from '@/components/text';
import { formatDate } from "@/lib/utils";

export const databaseId = process.env?.NOTION_DATABASE_ID ?? 'NOTION_DATABASE_ID';

async function getPosts() {
  const database = await getDatabase();
  return database;
}

export default async function Page() {
  const posts = await getPosts();
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Next.js blog powered by Notion API
          </h1>
          <p className="text-xl text-muted-foreground">
            This is an example of a Next.js blog with data fetched with Notion's API. The data comes from{' '}
            <a href={`https://www.notion.so/${databaseId}`} className="underline">this table</a>.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post: any, index: number) => {
            const slug = post.properties?.Slug?.rich_text[0]?.plain_text;
            const title = post.properties?.Title?.title[0]?.plain_text;
            const description = post.properties?.Description?.rich_text[0]?.plain_text;
            const publishedAt = post.properties?.PublishedDate?.date?.start;
            const coverImage = post.properties?.Cover?.files[0]?.file?.url || post.cover?.external?.url;

            return (
              <article
                key={post.id}
                className="group relative flex flex-col space-y-2"
              >
                {coverImage && (
                  <Image
                    src={coverImage}
                    alt={title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted transition-colors"
                    priority={index <= 1}
                  />
                )}
                <h2 className="text-2xl font-extrabold">{title}</h2>
                {description && (
                  <p className="text-muted-foreground">{description}</p>
                )}
                {publishedAt && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(publishedAt)}
                  </p>
                )}
                <Link href={`/notion-blog/${slug}`} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
