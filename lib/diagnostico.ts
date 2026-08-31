// Lógica pura do diagnóstico de potencial de faturamento (funil /diagnostico).
// Mantida isolada da UI para facilitar ajustes de regra de negócio sem mexer nos componentes.

export interface RespostasDiagnostico {
  faturamento?: string
  faturamentoCustom?: string
  tamanho?: string
  funcionarios?: string
  servicos?: string[]
  sistema?: string
  automatizacao?: string
  clientesPerdidos?: string
  fidelizacao?: string
  agenda?: string
  crescimento?: string
  intencao?: string
}

export interface OpcaoPergunta {
  emoji: string
  label: string
  value: string
}

export interface Pergunta {
  title: string
  subtitle?: string
  type: "single" | "multi" | "single_custom"
  options: OpcaoPergunta[]
}

export const ETAPAS_BASE = [
  "faturamento",
  "tamanho",
  "funcionarios",
  "servicos",
  "sistema",
  "clientesPerdidos",
  "fidelizacao",
  "agenda",
  "crescimento",
  "intencao",
] as const

export type EtapaId = (typeof ETAPAS_BASE)[number] | "automatizacao"

export const PERGUNTAS: Record<EtapaId, Pergunta> = {
  faturamento: {
    title: "Quanto seu pet shop fatura aproximadamente por mês?",
    type: "single_custom",
    options: [
      { emoji: "💵", label: "Até R$ 20 mil", value: "ate20" },
      { emoji: "💵", label: "R$ 20 mil a R$ 50 mil", value: "20a50" },
      { emoji: "💵", label: "R$ 50 mil a R$ 100 mil", value: "50a100" },
      { emoji: "💵", label: "R$ 100 mil a R$ 200 mil", value: "100a200" },
      { emoji: "💵", label: "Acima de R$ 200 mil", value: "acima200" },
      { emoji: "🤐", label: "Prefiro não informar", value: "nao_informar" },
    ],
  },
  tamanho: {
    title: "Qual é aproximadamente o tamanho do seu pet shop?",
    type: "single",
    options: [
      { emoji: "📐", label: "Até 30 m²", value: "ate30" },
      { emoji: "📐", label: "31–60 m²", value: "31a60" },
      { emoji: "📐", label: "61–100 m²", value: "61a100" },
      { emoji: "📐", label: "101–200 m²", value: "101a200" },
      { emoji: "📐", label: "Mais de 200 m²", value: "mais200" },
    ],
  },
  funcionarios: {
    title: "Quantas pessoas trabalham no seu pet shop?",
    type: "single",
    options: [
      { emoji: "👤", label: "Só eu", value: "so_eu" },
      { emoji: "👥", label: "2–3", value: "2a3" },
      { emoji: "👥", label: "4–6", value: "4a6" },
      { emoji: "👥", label: "7–10", value: "7a10" },
      { emoji: "🏢", label: "Mais de 10", value: "mais10" },
    ],
  },
  servicos: {
    title: "Quais serviços seu pet shop oferece?",
    subtitle: "Selecione todos que se aplicam",
    type: "multi",
    options: [
      { emoji: "🛁", label: "Banho e tosa", value: "banho_tosa" },
      { emoji: "💉", label: "Vacinação", value: "vacinacao" },
      { emoji: "🐶", label: "Venda de produtos", value: "venda_produtos" },
      { emoji: "🩺", label: "Consultas", value: "consultas" },
      { emoji: "✂️", label: "Tosa", value: "tosa" },
      { emoji: "🏠", label: "Hotel/creche", value: "hotel_creche" },
      { emoji: "➕", label: "Outro", value: "outro" },
    ],
  },
  sistema: {
    title: "Hoje você usa algum sistema para administrar o pet shop?",
    type: "single",
    options: [
      { emoji: "✅", label: "Sim, uso um sistema completo", value: "completo" },
      { emoji: "⚠️", label: "Sim, mas é muito limitado", value: "limitado" },
      { emoji: "📊", label: "Uso planilhas", value: "planilhas" },
      { emoji: "📓", label: "Uso WhatsApp + caderno", value: "whatsapp_caderno" },
      { emoji: "🚫", label: "Não uso nenhum sistema", value: "nenhum" },
    ],
  },
  automatizacao: {
    title: "O seu sistema ajuda você a trazer clientes de volta automaticamente?",
    type: "single",
    options: [
      { emoji: "✅", label: "Sim", value: "sim" },
      { emoji: "❌", label: "Não", value: "nao" },
      { emoji: "🤔", label: "Não sei", value: "nao_sei" },
    ],
  },
  clientesPerdidos: {
    title:
      "Você consegue saber quais clientes estão há muito tempo sem comprar ou agendar um serviço?",
    type: "single",
    options: [
      { emoji: "✅", label: "Sim", value: "sim" },
      { emoji: "❌", label: "Não", value: "nao" },
      { emoji: "🤷", label: "Mais ou menos", value: "mais_ou_menos" },
    ],
  },
  fidelizacao: {
    title: "Seu pet shop trabalha com algum programa de fidelidade ou cashback?",
    type: "single",
    options: [
      { emoji: "✅", label: "Sim", value: "sim" },
      { emoji: "❌", label: "Não", value: "nao" },
      { emoji: "😕", label: "Já tentei, mas não funcionou", value: "tentou_nao_funcionou" },
    ],
  },
  agenda: {
    title: "Como você controla hoje os agendamentos de banho, tosa e outros serviços?",
    type: "single",
    options: [
      { emoji: "💻", label: "Sistema", value: "sistema" },
      { emoji: "💬", label: "WhatsApp", value: "whatsapp" },
      { emoji: "📝", label: "Agenda de papel", value: "papel" },
      { emoji: "📊", label: "Planilha", value: "planilha" },
      { emoji: "➕", label: "Outro", value: "outro" },
    ],
  },
  crescimento: {
    title:
      "Se você pudesse aumentar o faturamento sem precisar aumentar o espaço físico, teria interesse?",
    type: "single",
    options: [
      { emoji: "🚀", label: "Sim, quero crescer", value: "quero_crescer" },
      { emoji: "🤔", label: "Quero entender como", value: "quero_entender" },
      { emoji: "📈", label: "Já estou crescendo, mas quero acelerar", value: "quero_acelerar" },
    ],
  },
  intencao: {
    title:
      "Se o Bitzy conseguisse gerar pelo menos R$ 2.000 a mais por mês, pagando menos que o preço de uma pizza por dia, você usaria?",
    type: "single",
    options: [
      { emoji: "🔥", label: "SIM, quero aumentar meu faturamento", value: "sim_quero" },
      { emoji: "👀", label: "Quero ver como funciona", value: "quero_ver_como" },
      { emoji: "🧐", label: "Preciso entender melhor", value: "preciso_entender" },
    ],
  },
}

export function obterEtapas(respostas: RespostasDiagnostico): EtapaId[] {
  const etapas: EtapaId[] = [...ETAPAS_BASE]
  if (respostas.sistema === "completo" || respostas.sistema === "limitado") {
    const idx = etapas.indexOf("sistema")
    etapas.splice(idx + 1, 0, "automatizacao")
  }
  return etapas
}

export interface Estimativa {
  mensal: number
  anual: number
}

export function calcularEstimativa(respostas: RespostasDiagnostico): Estimativa {
  const baseByFaturamento: Record<string, number> = {
    ate20: 1500,
    "20a50": 2000,
    "50a100": 3000,
    "100a200": 5000,
    acima200: 8000,
    nao_informar: 3000,
  }
  let base = baseByFaturamento[respostas.faturamento ?? ""] ?? 3000

  if (respostas.faturamentoCustom) {
    const v = parseFloat(String(respostas.faturamentoCustom).replace(/\D/g, ""))
    if (!isNaN(v) && v > 0) {
      if (v < 20000) base = 1500
      else if (v < 50000) base = 2000
      else if (v < 100000) base = 3000
      else if (v < 200000) base = 5000
      else base = 8000
    }
  }

  let multiplicador = 1
  if (
    ["planilhas", "whatsapp_caderno", "nenhum"].includes(respostas.sistema ?? "") ||
    respostas.automatizacao === "nao" ||
    respostas.automatizacao === "nao_sei"
  ) {
    multiplicador += 0.15
  }
  if (respostas.clientesPerdidos === "nao" || respostas.clientesPerdidos === "mais_ou_menos") {
    multiplicador += 0.1
  }
  if (respostas.fidelizacao === "nao" || respostas.fidelizacao === "tentou_nao_funcionou") {
    multiplicador += 0.1
  }
  if (["whatsapp", "papel", "planilha", "outro"].includes(respostas.agenda ?? "")) {
    multiplicador += 0.1
  }

  const funcMultiplicador: Record<string, number> = {
    so_eu: 1,
    "2a3": 1.05,
    "4a6": 1.15,
    "7a10": 1.25,
    mais10: 1.35,
  }
  multiplicador *= funcMultiplicador[respostas.funcionarios ?? ""] ?? 1

  let mensal = base * multiplicador
  mensal = Math.max(2000, mensal)
  mensal = Math.min(mensal, 12000)
  mensal = Math.round(mensal / 100) * 100

  return { mensal, anual: mensal * 12 }
}

export type ScoreInterno = "quente" | "morno" | "frio"

export function calcularScore(respostas: RespostasDiagnostico): ScoreInterno {
  let pontos = 0
  if (["50a100", "100a200", "acima200"].includes(respostas.faturamento ?? "")) pontos++
  if (respostas.funcionarios && respostas.funcionarios !== "so_eu") pontos++
  if (respostas.servicos?.includes("banho_tosa")) pontos++
  if (["planilhas", "whatsapp_caderno", "nenhum", "limitado"].includes(respostas.sistema ?? ""))
    pontos++
  if (["quero_crescer", "quero_acelerar"].includes(respostas.crescimento ?? "")) pontos++
  if (respostas.intencao === "sim_quero") pontos++

  if (pontos >= 4) return "quente"
  if (pontos >= 2) return "morno"
  return "frio"
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 0 })
}