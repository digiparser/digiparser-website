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
import { getTableOfContents } from '@/lib/toc'
import { DashboardTableOfContents } from '@/components/toc'

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
  
  const toc = await getTableOfContents(post.markdownContent);

  return (
    <div className='flex justify-start container relative py-6 lg:py-10'>
      <div className='w-96 p-4 pt-10 mr-8 sticky top-0 mb-auto hidden lg:block'>
        <Link
          href="/blog"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden xl:inline-flex"
          )}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <div className="hidden text-sm lg:block">
          <div className="px-4 py-10">
            <DashboardTableOfContents toc={toc} />
          </div>
        </div>
      </div>
      <article className="max-w-3xl">
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
                  href={post?.authorLink || ''}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.picture}
                    alt={author.name}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.name}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{post?.authorUsername || ''}
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

  const post: any = await db
    .find<Post>({collection: 'blog', slug: params.slug}, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage',
      'tags',
      'authorUsername',
      'authorLink',
    ])
    .first()

  const contentLayerPost = allBlogs.find((post) => post.slugAsParams === params.slug)
  post.code = contentLayerPost?.body?.code; 

  if (!post) {
    notFound()
  }

  const markdownContent = post.content;

  const content = await markdownToHtml(post.content)

  return {
    ...post,
    content,
    markdownContent,
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('blog')
  return posts.map((slug) => ({slug}))
}