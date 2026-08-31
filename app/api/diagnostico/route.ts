import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Rótulos exibidos no e-mail — mantidos aqui para bater exatamente com os
// values usados em lib/diagnostico.ts.
const SCORE_LABEL: Record<string, string> = {
  quente: "🔥 QUENTE",
  morno: "🌤️ MORNO",
  frio: "❄️ FRIO",
}

const SCORE_COLOR: Record<string, string> = {
  quente: "#dc2626",
  morno: "#d97706",
  frio: "#6b7280",
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      tipo, // "parcial" | "completo"
      leadId,
      nome,
      nomePetshop,
      whatsapp,
      email,
      cidadeEstado,
      estimativaMensal,
      estimativaAnual,
      scoreInterno,
      respostas,
    } = body

    if (!nome || !nomePetshop || !whatsapp) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 })
    }

    if (tipo === "completo" && (!email || !cidadeEstado)) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 })
    }

    const isCompleto = tipo === "completo"
    const score = scoreInterno || "frio"

    const row = (icon: string, label: string, value?: string) =>
      value
        ? `<tr style="border-bottom:1px solid #f3f4f6;">
             <td style="padding:12px 0;color:#6b7280;font-size:14px;width:40%;">${icon} ${label}</td>
             <td style="padding:12px 0;color:#1a1a1a;font-weight:600;">${value}</td>
           </tr>`
        : ""

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:16px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:48px;">🐾</span>
          <h1 style="color:#1a1a1a;margin:8px 0 4px;">
            ${isCompleto ? "Novo Lead Completo" : "Lead Parcial (abandonou o diagnóstico)"} — Diagnóstico Bitzy
          </h1>
          <p style="color:#6b7280;margin:0;">
            Score: <strong style="color:${SCORE_COLOR[score]};">${SCORE_LABEL[score] ?? score}</strong>
          </p>
        </div>
        <div style="background:white;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            ${row("👤", "Nome", nome)}
            ${row("🏪", "Pet Shop", nomePetshop)}
            ${row("📱", "WhatsApp", whatsapp)}
            ${row("📧", "E-mail", email)}
            ${row("🌆", "Cidade / Estado", cidadeEstado)}
            ${row("💰", "Potencial estimado", estimativaMensal ? `R$ ${Number(estimativaMensal).toLocaleString("pt-BR")}/mês` : undefined)}
            ${row("📅", "Potencial anual", estimativaAnual ? `R$ ${Number(estimativaAnual).toLocaleString("pt-BR")}/ano` : undefined)}
            ${row("🆔", "ID do lead", leadId)}
            ${row("📋", "Respostas do quiz", respostas ? JSON.stringify(respostas) : undefined)}
          </table>
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">
          Bitzy · Funil /diagnostico
        </p>
      </div>
    `

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "Diagnóstico Bitzy <noreply@bitzy.pet>",
      to: ["catarinody@gmail.com", "mateusvanzuitaed@gmail.com"],
      subject: `${isCompleto ? "🐾 Lead Diagnóstico" : "⚠️ Lead parcial (abandonou)"} - ${nomePetshop} [${SCORE_LABEL[score] ?? score}]`,
      html: emailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Erro ao enviar lead do diagnóstico:", err)
    return NextResponse.json({ error: "Erro interno ao processar diagnóstico." }, { status: 500 })
  }
}