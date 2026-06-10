import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const PLANOS: Record<string, string> = {
  mensal: "Mensal — R$99/mês",
  trimestral: "Trimestral — R$79/mês (fechando 3 meses)",
  semestral: "Semestral — R$69/mês (fechando 6 meses)",
  fundador: "Fundador — R$49,99/mês por 6 meses",
}

const CUPONS_FUNDADOR: Record<string, string> = {
  FUNDADOR50A: "Catarino",
  FUNDADOR50B: "Matheus",
  FUNDADOR50C: "Marcio",
  FUNDADOR50D: "Rodrigo",
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      nome, descricao, localizacao, endereco, cidade, estado,
      nomeResponsavel, telefone, whatsapp, instagram, website,
      descontoFavorito,
      plano, cupom,
    } = body

    if (!nome || !nomeResponsavel || !endereco || !cidade || !estado || !plano) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 })
    }

    if (plano === "fundador") {
      const cupomUpper = (cupom || "").toUpperCase().trim()
      if (!CUPONS_FUNDADOR[cupomUpper]) {
        return NextResponse.json({ error: "Cupom inválido para o plano Fundador." }, { status: 400 })
      }
    }

    const cupomUpper = (cupom || "").toUpperCase().trim()
    const indicadoPor = plano === "fundador" ? CUPONS_FUNDADOR[cupomUpper] : null
    const planoLabel = PLANOS[plano] || plano

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
          <h1 style="color:#1a1a1a;margin:8px 0 4px;">Novo Lead - Clube Bitzy</h1>
          <p style="color:#6b7280;margin:0;">Um novo pet shop se cadastrou</p>
        </div>
        <div style="background:white;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            ${row("🏪", "Pet Shop", nome)}
            ${row("📝", "Descrição", descricao)}
            ${row("📍", "Localização", localizacao)}
            ${row("🏠", "Endereço", endereco)}
            ${row("🌆", "Cidade / Estado", `${cidade} — ${estado}`)}
            ${row("👤", "Responsável", nomeResponsavel)}
            ${row("📞", "Telefone", telefone)}
            ${row("💬", "WhatsApp", whatsapp)}
            ${row("📸", "Instagram", instagram ? `@${instagram}` : undefined)}
            ${row("🌐", "Website", website)}
            ${row("🏷️", "Desconto Favorito", descontoFavorito ? `${descontoFavorito}%` : undefined)}
            ${row("📋", "Plano", planoLabel)}
            ${indicadoPor ? row("🎟️", "Cupom", cupomUpper) : ""}
            ${indicadoPor ? row("🤝", "Indicado por", indicadoPor) : ""}
          </table>
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">
          Bitzy · Sistema de Cadastro do Clube
        </p>
      </div>
    `

    await resend.emails.send({
      from: "Clube Bitzy <noreply@bitzy.pet>",
      to: ["catarinody@gmail.com", "mateusvanzuitaed@gmail.com"],
      subject: `🐾 Novo Lead Clube Bitzy - ${nome}`,
      html: emailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Erro ao enviar email:", err)
    return NextResponse.json({ error: "Erro interno ao processar cadastro." }, { status: 500 })
  }
}