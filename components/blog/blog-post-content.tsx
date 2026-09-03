import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/blog/mdx-components"

export function BlogPostContent({ content }: { content: string }) {
  return (
    <div className="max-w-2xl mx-auto">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  )
}
