import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { PERGUNTAS, type EtapaId, type RespostasDiagnostico } from "@/lib/diagnostico"

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

// Nomes amigáveis para as chaves do objeto `respostas` no e-mail.
// Se um campo novo for adicionado ao quiz e faltar aqui, cai no fallback
// (a própria chave), então nunca quebra.
const RESPOSTA_LABEL: Record<string, string> = {
  faturamento: "Faturamento mensal",
  faturamentoCustom: "Faturamento (valor digitado)",
  tamanho: "Tamanho do pet shop",
  funcionarios: "Nº de funcionários",
  servicos: "Serviços oferecidos",
  sistema: "Sistema usado hoje",
  automatizacao: "Sistema traz clientes de volta automaticamente?",
  clientesPerdidos: "Sabe quem sumiu?",
  fidelizacao: "Programa de fidelidade/cashback",
  agenda: "Controle de agenda",
  crescimento: "Interesse em crescer",
  intencao: "Intenção de contratar",
}

// Traduz um value bruto (ex: "20a50") para o label da pergunta (ex: "R$ 20 mil a R$ 50 mil"),
// usando as próprias opções cadastradas em PERGUNTAS. Se não achar (ex: campo não é
// uma pergunta do quiz, ou o value não bate com nenhuma opção), devolve o value cru.
function traduzirValor(chave: string, value: string): string {
  const pergunta = PERGUNTAS[chave as EtapaId]
  const opcao = pergunta?.options.find((o) => o.value === value)
  return opcao ? `${opcao.emoji} ${opcao.label}` : value
}

function formatarValorResposta(chave: string, valor: unknown): string {
  if (Array.isArray(valor)) {
    return valor.length ? valor.map((v) => traduzirValor(chave, String(v))).join(", ") : "—"
  }
  if (valor === null || valor === undefined || valor === "") return "—"
  return traduzirValor(chave, String(valor))
}

function renderRespostasHtml(respostas: RespostasDiagnostico | undefined): string {
  if (!respostas || Object.keys(respostas).length === 0) return ""

  const linhas = Object.entries(respostas)
    .filter(([, valor]) => valor !== null && valor !== undefined && valor !== "" && !(Array.isArray(valor) && valor.length === 0))
    .map(
      ([chave, valor]) => `
        <tr style="border-bottom:1px solid #f3f4f6;">
          <td style="padding:10px 0;color:#6b7280;font-size:13px;width:45%;vertical-align:top;">
            ${RESPOSTA_LABEL[chave] ?? chave}
          </td>
          <td style="padding:10px 0;color:#1a1a1a;font-size:13px;">
            ${formatarValorResposta(chave, valor)}
          </td>
        </tr>`
    )
    .join("")

  return `
    <div style="margin-top:20px;">
      <p style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.02em;margin:0 0 8px;">
        📋 Respostas do quiz
      </p>
      <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;padding:4px 12px;">
        ${linhas}
      </table>
    </div>`
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
          </table>
          ${renderRespostasHtml(respostas)}
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