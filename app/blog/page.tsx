import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogCard } from "@/components/blog/blog-card"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dicas de gestão para pet shops, cuidados com pets e novidades do Bitzy.",
  openGraph: {
    title: "Blog | Bitzy",
    description:
      "Dicas de gestão para pet shops, cuidados com pets e novidades do Bitzy.",
    type: "website",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen">
      <Header />
      <BlogHeader />

      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              Nenhum post publicado ainda. Volte em breve!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
