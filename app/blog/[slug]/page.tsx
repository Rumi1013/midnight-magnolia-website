import { notFound } from "next/navigation"
import { getBlogPostBySlug, blogPosts } from "../data/blogPosts"
import BlogPostClient from "./BlogPostClient"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Midnight Magnolia",
    }
  }

  return {
    title: `${post.title} | Midnight Magnolia`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}

