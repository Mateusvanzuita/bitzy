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

// SEGURANÇA: esta rota recebe POST de um formulário público e os valores
// (nome, nomePetshop, whatsapp, email, cidadeEstado, respostas) eram
// inseridos direto na string HTML do e-mail sem escapar. Qualquer pessoa
// pode chamar essa rota diretamente (não só pelo formulário do site) e
// mandar HTML/script no campo "nome", por exemplo — o que pode ser
// renderizado no seu cliente de e-mail. Escapamos tudo que vem do usuário
// antes de montar o HTML.
function escapeHtml(valor: unknown): string {
  if (valor === null || valor === undefined) return ""
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    const isCompleto = tipo === "completo"

    if (isCompleto && (!email || !cidadeEstado)) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 })
    }

    // Validação server-side: o front-end já valida, mas como a rota é
    // pública, alguém pode postar direto pulando o formulário.
    const whatsappDigits = String(whatsapp).replace(/\D/g, "")
    if (whatsappDigits.length < 10) {
      return NextResponse.json({ error: "WhatsApp inválido." }, { status: 400 })
    }

    if (isCompleto && !EMAIL_REGEX.test(String(email))) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 })
    }

    const score = scoreInterno && SCORE_LABEL[scoreInterno] ? scoreInterno : "frio"

    const row = (icon: string, label: string, value?: string) =>
      value
        ? `<tr style="border-bottom:1px solid #f3f4f6;">
             <td style="padding:12px 0;color:#6b7280;font-size:14px;width:40%;">${icon} ${escapeHtml(label)}</td>
             <td style="padding:12px 0;color:#1a1a1a;font-weight:600;">${escapeHtml(value)}</td>
           </tr>`
        : ""

    const respostasFormatadas = respostas ? escapeHtml(JSON.stringify(respostas)) : undefined

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:16px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:48px;">🐾</span>
          <h1 style="color:#1a1a1a;margin:8px 0 4px;">
            ${isCompleto ? "Novo Lead Completo" : "Lead Parcial (abandonou o diagnóstico)"} — Diagnóstico Bitzy
          </h1>
          <p style="color:#6b7280;margin:0;">
            Score: <strong style="color:${SCORE_COLOR[score]};">${SCORE_LABEL[score] ?? escapeHtml(score)}</strong>
          </p>
        </div>
        <div style="background:white;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            ${row("👤", "Nome", escapeHtml(nome))}
            ${row("🏪", "Pet Shop", escapeHtml(nomePetshop))}
            ${row("📱", "WhatsApp", escapeHtml(whatsapp))}
            ${row("📧", "E-mail", email ? escapeHtml(email) : undefined)}
            ${row("🌆", "Cidade / Estado", cidadeEstado ? escapeHtml(cidadeEstado) : undefined)}
            ${row("💰", "Potencial estimado", estimativaMensal ? `R$ ${Number(estimativaMensal).toLocaleString("pt-BR")}/mês` : undefined)}
            ${row("📅", "Potencial anual", estimativaAnual ? `R$ ${Number(estimativaAnual).toLocaleString("pt-BR")}/ano` : undefined)}
            ${row("🆔", "ID do lead", leadId ? escapeHtml(leadId) : undefined)}
            ${row("📋", "Respostas do quiz", respostasFormatadas)}
          </table>
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">
          Bitzy · Funil /diagnostico
        </p>
      </div>
    `

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: "Diagnóstico Bitzy <noreply@bitzy.pet>",
      to: ["contato@bitzy.com.br"],
      subject: `${isCompleto ? "🐾 Lead Diagnóstico" : "⚠️ Lead parcial (abandonou)"} - ${nomePetshop} [${SCORE_LABEL[score] ?? score}]`,
      html: emailHtml,
    })

    if (error) {
      // O SDK do Resend não lança exceção quando o envio é recusado
      // (domínio não verificado, remetente inválido, etc.) — só retorna
      // esse campo. Sem essa checagem, a rota respondia sucesso mesmo
      // quando o e-mail nunca saía.
      console.error("Resend recusou o envio:", error)
      return NextResponse.json({ error: "Falha ao enviar e-mail." }, { status: 502 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("Erro ao enviar lead do diagnóstico:", err)
    return NextResponse.json({ error: "Erro interno ao processar diagnóstico." }, { status: 500 })
  }
}