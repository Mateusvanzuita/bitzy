import { NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { isSlugValido } from "@/lib/parceiros-qr"

export const runtime = "nodejs"

const EVENTOS = ["view", "click_ios", "click_android"]

export async function POST(req: Request) {
  try {
    const { slug, evento } = await req.json()

    // Só aceita slugs cadastrados e eventos conhecidos (evita lixo no banco).
    if (!isSlugValido(slug) || !EVENTOS.includes(evento)) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    await pool.query("INSERT INTO qr_eventos (slug, evento) VALUES ($1, $2)", [slug, evento])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[qr/track]", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
