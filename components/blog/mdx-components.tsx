import Link from "next/link"
import Image from "next/image"
import type { MDXComponents } from "mdx/types"

// Estilo tipográfico alinhado ao design system do Bitzy: headings já herdam
// a fonte Fredoka globalmente (definida em app/globals.css), então aqui só
// cuidamos de espaçamento, cor e comportamento de cada elemento.
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-balance" {...props} />
  ),
  h3: (props) => <h3 className="text-xl font-bold mt-8 mb-3" {...props} />,
  p: (props) => (
    <p className="text-base text-foreground/90 leading-relaxed mb-5" {...props} />
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  },
  ul: (props) => <ul className="list-disc pl-6 space-y-2 mb-5 text-foreground/90" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 space-y-2 mb-5 text-foreground/90" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-primary bg-primary/5 rounded-r-2xl px-5 py-4 my-6 text-foreground/80 italic"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  img: ({ src, alt }) => (
    <span className="block relative w-full aspect-video my-8 rounded-3xl overflow-hidden border border-border">
      <Image src={(src as string) || "/placeholder.svg"} alt={alt ?? ""} fill className="object-cover" />
    </span>
  ),
  hr: () => <hr className="my-10 border-border" />,
}
