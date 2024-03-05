import Image from 'next/image'
import { Metadata } from 'next'
import { OstDocument } from 'outstatic'
import { getDocumentSlugs, load } from 'outstatic/server'
import markdownToHtml, { absoluteUrl, cn, formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx-components";
import { allBlogs } from "contentlayer/generated";
import "@/styles/mdx.css"

type Post = {
  tags: { value: string; label: string }[]
} & OstDocument

interface Params {
  params: {
    slug: string
  }
}

export async function generateMetadata(params: Params): Promise<Metadata> {
  const post = await getData(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [
        {
          url: absoluteUrl(post?.coverImage || '/images/og-image.png'),
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: absoluteUrl(post?.coverImage || '/images/og-image.png')
    }
  }
}

export default async function Post(params: Params) {
  const post: any = await getData(params)
  const author: any = post?.author;
  
  return (
    <div>
      <article className="container relative max-w-3xl py-6 lg:py-10">
        <Link
          href="/blog"
          className={cn(
            buttonVariants({variant: "ghost"}),
            "absolute left-[-200px] top-14 hidden xl:inline-flex"
          )}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4"/>
          See all posts
        </Link>
        <div>
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="block text-sm text-muted-foreground"
            >
              Published on {formatDate(post.publishedAt)}
            </time>
          )}
          <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
            {post.title}
          </h1>
          {
            author?.name && (
              <div className="mt-4 flex space-x-4">
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.name}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.name}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.name}
                    </p>
                  </div>
                </Link>
              </div>
            )
          }
        </div>
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={720}
            height={405}
            className="my-8 rounded-md border bg-muted transition-colors"
            priority
          />
        )}
        <Mdx code={post.code} />
        {/*<div*/}
        {/*  className="prose prose-slate dark:prose-invert"*/}
        {/*  dangerouslySetInnerHTML={{__html: post.content}}*/}
        {/*/>*/}
        <hr className="mt-12"/>
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/blog" className={cn(buttonVariants({variant: "ghost"}))}>
            <Icons.chevronLeft className="mr-2 h-4 w-4"/>
            See all posts
          </Link>
        </div>
      </article>
    </div>
  )
}

async function getData({params}: Params) {
  const db = await load()

  const post = await db
    .find<Post>({collection: 'blog', slug: params.slug}, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage',
      'tags'
    ])
    .first()

  const contentLayerPost = allBlogs.find((post) => post.slugAsParams === params.slug)
  post.code = contentLayerPost?.body?.code; 
  console.log('contentLayerPost', allBlogs, contentLayerPost);
  if (!post) {
    notFound()
  }

  const content = await markdownToHtml(post.content)

  return {
    ...post,
    content
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('blog')
  return posts.map((slug) => ({slug}))
}