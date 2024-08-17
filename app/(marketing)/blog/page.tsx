import Image from "next/image"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { getDocuments } from 'outstatic/server'

export const metadata = {
  title: "Blog",
}

async function getData() {
  const posts = getDocuments('blog', [
    'title',
    'publishedAt',
    'slug',
    'author',
    'description',
    'coverImage'
  ])
  console.log('posts', posts);
  return posts
}

export default async function BlogPage() {

  const posts = await getData()
  
  // const posts = allPosts
  //   .filter((post) => post.published)
  //   .sort((a, b) => {
  //     return compareDesc(new Date(a.date), new Date(b.date))
  //   })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights and Tips on Document Automation and Data Extraction.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative flex flex-col space-y-2"
            >
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.publishedAt && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </p>
              )}
              <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
