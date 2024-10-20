import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx-components";
import "@/styles/mdx.css"
import { getTableOfContents } from '@/lib/toc'
import { DashboardTableOfContents } from '@/components/toc'
import { cn, formatDate, absoluteUrl } from '@/lib/utils'
import {
  getDatabase, getBlocks, getPageFromSlug,
  getPageMarkdown,
} from '@/lib/notion';
import markdownToHtml from '@/lib/utils';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const database = await getDatabase();
  return database?.map((page: any) => {
    const slug = page.properties.Slug?.formula?.string;
    return ({ id: page.id, slug });
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page: any = await getPageFromSlug(params.slug);

  if (!page) {
    return {}
  }

  const title = page.properties.Title?.title[0].plain_text;
  const description = page.properties.Description?.rich_text[0]?.plain_text || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: absoluteUrl(`/notion-blog/${params.slug}`),
      // Add image if available in your Notion page properties
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // Add image if available in your Notion page properties
    }
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page: any = await getPageFromSlug(params.slug);
  const blocks = await getBlocks(page?.id);
  const markdown = await getPageMarkdown(page?.id);
  const content = await markdownToHtml(markdown);
  
  if (!page || !blocks) {
    notFound()
  }

  const toc = await getTableOfContents(markdown);

  console.log('page.properties', page.properties);

  return (
    <div className='flex justify-start container relative py-6 lg:py-10'>
      <div className='w-96 p-4 pt-10 pb-24 mr-8 sticky top-0 mb-auto hidden lg:block max-h-screen overflow-y-auto'>
        <Link
          href="/notion-blog"
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
          {page.properties.PublishedDate?.date && (
            <time
              dateTime={page.properties.PublishedDate.date.start}
              className="block text-sm text-muted-foreground"
            >
              Published on {formatDate(page.properties.PublishedDate.date.start)}
            </time>
          )}
          <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
            {page.properties.Title?.title[0].plain_text}
          </h1>
          <div className="mt-4 flex space-x-4">
            <a className="flex items-center space-x-2 text-sm" href="https://x.com/thepantales">
              <img 
                alt="Pankaj Patidar" 
                loading="lazy" 
                width="42" 
                height="42" 
                decoding="async" 
                data-nimg="1" 
                className="rounded-full bg-white" 
                style={{color: 'transparent'}} 
                src="https://avatars.githubusercontent.com/u/17493609?v=4" 
              />
              <div className="flex-1 text-left leading-tight">
                <p className="font-medium">Pankaj Patidar</p>
                <p className="text-[12px] text-muted-foreground">@thepantales</p>
              </div>
            </a>
          </div>
          {/* Add author information here if available in your Notion page properties */}
        </div>
        {page.properties.Cover?.files[0] && (
          <Image
            src={page.properties.Cover.files[0].file.url}
            alt={page.properties.Title?.title[0].plain_text}
            width={720}
            height={405}
            className="my-8 rounded-md border bg-muted transition-colors"
            priority
          />
        )}
        {/* Add cover image here if available in your Notion page properties */}
        <div
          className="mdx prose prose-slate dark:prose-invert mt-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <hr className="mt-12"/>
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/notion-blog" className={cn(buttonVariants({variant: "ghost"}))}>
            <Icons.chevronLeft className="mr-2 h-4 w-4"/>
            See all posts
          </Link>
        </div>
      </article>
    </div>
  )
}

// export const getStaticPaths = async () => {
//   const database = await getDatabase(databaseId);
//   return {
//     paths: database.map((page) => {
//       const slug = page.properties.Slug?.formula?.string;
//       return ({ params: { id: page.id, slug } });
//     }),
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const { slug } = context.params;
//   const page = await getPage(id);
//   const blocks = await getBlocks(id);

//   return {
//     props: {
//       page,
//       blocks,
//     },
//     revalidate: 1,
//   };
// };
