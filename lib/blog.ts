import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  coverImage?: string
  author: string
  tags: string[]
  readingTime: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

// Estimativa simples de tempo de leitura, sem depender de pacote externo.
function calcularTempoLeitura(texto: string): string {
  const PALAVRAS_POR_MINUTO = 200
  const palavras = texto.trim().split(/\s+/).length
  const minutos = Math.max(1, Math.round(palavras / PALAVRAS_POR_MINUTO))
  return `${minutos} min de leitura`
}

function listarArquivosMdx(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((arquivo) => arquivo.endsWith(".mdx"))
}

/**
 * Retorna os metadados (frontmatter) de todos os posts, ordenados do mais
 * recente para o mais antigo. Usado na página de listagem (/blog).
 */
export function getAllPosts(): BlogPostMeta[] {
  const arquivos = listarArquivosMdx()

  const posts = arquivos.map((arquivo) => {
    const slug = arquivo.replace(/\.mdx$/, "")
    const caminhoCompleto = path.join(BLOG_DIR, arquivo)
    const arquivoBruto = fs.readFileSync(caminhoCompleto, "utf8")
    const { data, content } = matter(arquivoBruto)

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      coverImage: data.coverImage,
      author: data.author ?? "Equipe Bitzy",
      tags: data.tags ?? [],
      readingTime: calcularTempoLeitura(content),
    } satisfies BlogPostMeta
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** Usado em generateStaticParams para pré-renderizar todos os posts. */
export function getAllSlugs(): string[] {
  return listarArquivosMdx().map((arquivo) => arquivo.replace(/\.mdx$/, ""))
}

/**
 * Retorna um post completo (metadados + conteúdo em markdown, ainda não
 * compilado). Quem compila o MDX é o MDXRemote na página, não esta função.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const caminhoCompleto = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(caminhoCompleto)) return null

  const arquivoBruto = fs.readFileSync(caminhoCompleto, "utf8")
  const { data, content } = matter(arquivoBruto)

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    coverImage: data.coverImage,
    author: data.author ?? "Equipe Bitzy",
    tags: data.tags ?? [],
    readingTime: calcularTempoLeitura(content),
    content,
  }
}
