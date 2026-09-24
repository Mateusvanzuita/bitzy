import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { estaAutenticado } from "@/lib/admin-auth"
import { pool } from "@/lib/db"
import { SLUGS_QR } from "@/lib/parceiros-qr"
import { entrar, sair } from "./actions"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Métricas QR", robots: { index: false, follow: false } }

const PERIODOS = [
  { id: "7", label: "7 dias", dias: 7 },
  { id: "30", label: "30 dias", dias: 30 },
  { id: "todos", label: "Tudo", dias: null },
] as const

type Linha = { slug: string; acessos: number; ios: number; android: number }

async function buscarMetricas(dias: number | null): Promise<Linha[]> {
  const { rows } = await pool.query(
    `SELECT slug,
            COUNT(*) FILTER (WHERE evento = 'view')::int          AS acessos,
            COUNT(*) FILTER (WHERE evento = 'click_ios')::int     AS ios,
            COUNT(*) FILTER (WHERE evento = 'click_android')::int AS android
       FROM qr_eventos
      WHERE ($1::int IS NULL OR criado_em >= now() - make_interval(days => $1::int))
      GROUP BY slug`,
    [dias],
  )
  const porSlug = new Map<string, Linha>(rows.map((r: Linha) => [r.slug, r]))
  // Inclui pet shops sem nenhum evento ainda.
  return SLUGS_QR.map((slug) => porSlug.get(slug) ?? { slug, acessos: 0, ios: 0, android: 0 }).sort(
    (a, b) => b.acessos - a.acessos,
  )
}

const pct = (cliques: number, acessos: number) => (acessos ? `${((cliques / acessos) * 100).toFixed(1)}%` : "–")

export default async function AdminQrPage({
  searchParams,
}: {
  searchParams: Promise<{ periodo?: string; erro?: string }>
}) {
  const { periodo, erro } = await searchParams

  if (!process.env.ADMIN_PASSWORD) {
    return <main className="p-8">Defina a variável ADMIN_PASSWORD para liberar este painel.</main>
  }

  if (!(await estaAutenticado())) {
    return (
      <main className="min-h-dvh flex items-center justify-center px-4">
        <form action={entrar} className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-6 shadow-lg">
          <h1 className="text-xl font-bold">Métricas dos QR codes</h1>
          <Input name="senha" type="password" placeholder="Senha" autoComplete="current-password" required autoFocus />
          {erro && <p className="text-sm text-destructive">Senha incorreta.</p>}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </main>
    )
  }

  const atual = PERIODOS.find((p) => p.id === periodo) ?? PERIODOS[1]
  let linhas: Linha[] = []
  let falha = false
  try {
    linhas = await buscarMetricas(atual.dias)
  } catch (e) {
    console.error("[admin/qr]", e)
    falha = true
  }

  const total = linhas.reduce(
    (t, l) => ({ acessos: t.acessos + l.acessos, ios: t.ios + l.ios, android: t.android + l.android }),
    { acessos: 0, ios: 0, android: 0 },
  )

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Métricas dos QR codes</h1>
        <form action={sair}>
          <Button type="submit" variant="outline" size="sm">
            Sair
          </Button>
        </form>
      </header>

      <nav className="flex gap-2">
        {PERIODOS.map((p) => (
          <Button key={p.id} asChild size="sm" variant={p.id === atual.id ? "default" : "outline"}>
            <Link href={`/admin/qr?periodo=${p.id}`}>{p.label}</Link>
          </Button>
        ))}
      </nav>

      {falha ? (
        <p className="text-destructive">Não foi possível ler o banco. Confira DATABASE_URL e os logs.</p>
      ) : (
        <>
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Acessos", total.acessos],
              ["Cliques iOS", total.ios],
              ["Cliques Android", total.android],
              ["Conversão", pct(total.ios + total.android, total.acessos)],
            ].map(([rotulo, valor]) => (
              <div key={rotulo} className="rounded-2xl border bg-card p-4">
                <p className="text-sm text-muted-foreground">{rotulo}</p>
                <p className="text-2xl font-bold">{valor}</p>
              </div>
            ))}
          </section>

          <div className="overflow-x-auto rounded-2xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet shop (slug)</TableHead>
                  <TableHead className="text-right">Acessos</TableHead>
                  <TableHead className="text-right">iOS</TableHead>
                  <TableHead className="text-right">Android</TableHead>
                  <TableHead className="text-right">Conversão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {linhas.map((l) => (
                  <TableRow key={l.slug}>
                    <TableCell className="font-medium">{l.slug}</TableCell>
                    <TableCell className="text-right">{l.acessos}</TableCell>
                    <TableCell className="text-right">{l.ios}</TableCell>
                    <TableCell className="text-right">{l.android}</TableCell>
                    <TableCell className="text-right">{pct(l.ios + l.android, l.acessos)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground">
            Acesso = 1 por sessão do navegador. Conversão = cliques nas lojas ÷ acessos.
          </p>
        </>
      )}
    </main>
  )
}