"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  Check,
  MessageCircle,
  PawPrint,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { linkWhatsapp } from "@/lib/whatsapp"
import {
  PERGUNTAS,
  obterEtapas,
  calcularEstimativa,
  calcularScore,
  formatarMoeda,
  type RespostasDiagnostico,
  type EtapaId,
} from "@/lib/diagnostico"

// Preço único do Bitzy — não varia conforme as respostas do diagnóstico.
const PRECO_MENSAL = 55.9

type Tela = "hero" | "precapture" | "quiz" | "result" | "leadform" | "thanks"

interface LeadDraft {
  nome: string
  nomePetshop: string
  whatsapp: string
  email: string
  cidadeEstado: string
}

const LEAD_DRAFT_VAZIO: LeadDraft = {
  nome: "",
  nomePetshop: "",
  whatsapp: "",
  email: "",
  cidadeEstado: "",
}

const SESSION_KEY = "bitzy_diagnostico_progresso"
const LEAD_ID_KEY = "bitzy_diagnostico_lead_id"

function formatarTelefone(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function DiagnosticoApp() {
  const [tela, setTela] = useState<Tela>("hero")
  const [etapaIndex, setEtapaIndex] = useState(0)
  const [respostas, setRespostas] = useState<RespostasDiagnostico>({})
  const [leadDraft, setLeadDraft] = useState<LeadDraft>(LEAD_DRAFT_VAZIO)
  const [whatsError, setWhatsError] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const leadIdRef = useRef<string>("")
  const parcialEnviadoRef = useRef(false)
  const carregouProgressoRef = useRef(false)

  // Carrega progresso salvo (se a pessoa recarregar a página no meio do quiz)
  // e garante um ID de lead estável para esta sessão do navegador.
  useEffect(() => {
    try {
      let id = sessionStorage.getItem(LEAD_ID_KEY)
      if (!id) {
        id = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        sessionStorage.setItem(LEAD_ID_KEY, id)
      }
      leadIdRef.current = id

      const salvo = sessionStorage.getItem(SESSION_KEY)
      if (salvo) {
        const dados = JSON.parse(salvo)
        if (dados.tela && dados.tela !== "thanks") {
          setTela(dados.tela)
          setEtapaIndex(dados.etapaIndex || 0)
          setRespostas(dados.respostas || {})
          setLeadDraft(dados.leadDraft || LEAD_DRAFT_VAZIO)
        }
      }
    } catch {
      // sessionStorage indisponível — segue sem retomar progresso
    } finally {
      carregouProgressoRef.current = true
    }
  }, [])

  // Persiste progresso a cada mudança relevante (depois do carregamento inicial).
  useEffect(() => {
    if (!carregouProgressoRef.current) return
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ tela, etapaIndex, respostas, leadDraft })
      )
    } catch {
      // best-effort
    }
  }, [tela, etapaIndex, respostas, leadDraft])

  const etapas = obterEtapas(respostas)
  const estimativa = calcularEstimativa(respostas)

  function irPara(novaTela: Tela) {
    setTela(novaTela)
  }

  function avancarEtapa() {
    if (etapaIndex < etapas.length - 1) {
      setEtapaIndex((i) => i + 1)
    } else {
      setTela("result")
    }
  }

  function voltarEtapa() {
    setEtapaIndex((i) => Math.max(0, i - 1))
  }

  // Envia o lead parcial uma única vez por sessão, assim que o WhatsApp for
  // válido — recupera contato de quem abandona o diagnóstico sem lotar o
  // e-mail com um disparo a cada campo perdendo o foco.
  async function enviarLeadParcial(draft: LeadDraft) {
    if (parcialEnviadoRef.current) return
    const digits = draft.whatsapp.replace(/\D/g, "")
    if (digits.length < 10) return
    parcialEnviadoRef.current = true

    try {
      await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "parcial",
          leadId: leadIdRef.current,
          nome: draft.nome,
          nomePetshop: draft.nomePetshop,
          whatsapp: draft.whatsapp,
          estimativaMensal: estimativa.mensal,
          scoreInterno: calcularScore(respostas),
        }),
      })
    } catch {
      // não bloqueia o fluxo do usuário caso o envio falhe
    }
  }

  async function enviarLeadCompleto(draft: LeadDraft) {
    await fetch("/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "completo",
        leadId: leadIdRef.current,
        nome: draft.nome,
        nomePetshop: draft.nomePetshop,
        whatsapp: draft.whatsapp,
        email: draft.email,
        cidadeEstado: draft.cidadeEstado,
        estimativaMensal: estimativa.mensal,
        estimativaAnual: estimativa.anual,
        scoreInterno: calcularScore(respostas),
        respostas,
      }),
    })
  }

  async function handlePrecaptureSubmit(draft: LeadDraft) {
    const digits = draft.whatsapp.replace(/\D/g, "")
    if (digits.length < 10) {
      setWhatsError(true)
      return
    }
    setWhatsError(false)
    setEnviando(true)
    setLeadDraft(draft)
    await enviarLeadParcial(draft)
    setEnviando(false)
    setTela("quiz")
    setEtapaIndex(0)
  }

  async function handleLeadFormSubmit(draft: LeadDraft) {
    const digits = draft.whatsapp.replace(/\D/g, "")
    if (digits.length < 10) {
      setWhatsError(true)
      return
    }
    setWhatsError(false)
    setEnviando(true)
    setLeadDraft(draft)
    await enviarLeadCompleto(draft)
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ tela: "thanks" }))
    } catch {}
    setEnviando(false)
    setTela("thanks")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="pt-6 px-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading font-bold text-xl">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm">
              B
            </span>
            Bitzy
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-muted-foreground border border-border rounded-full px-3 py-1">
            Diagnóstico gratuito
          </span>
        </div>
      </header>

      {tela === "hero" && <TelaHero onIniciar={() => irPara("precapture")} />}

      {tela === "precapture" && (
        <TelaPrecaptura
          draft={leadDraft}
          whatsError={whatsError}
          enviando={enviando}
          onSubmit={handlePrecaptureSubmit}
        />
      )}

      {tela === "quiz" && (
        <TelaQuiz
          etapaId={etapas[Math.min(etapaIndex, etapas.length - 1)]}
          etapaIndex={etapaIndex}
          totalEtapas={etapas.length}
          respostas={respostas}
          onResponder={(id, valor) => setRespostas((r) => ({ ...r, [id]: valor }))}
          onAvancar={avancarEtapa}
          onVoltar={etapaIndex > 0 ? voltarEtapa : undefined}
        />
      )}

      {tela === "result" && (
        <TelaResultado
          respostas={respostas}
          estimativa={estimativa}
          onQuerofalar={() => irPara("leadform")}
        />
      )}

      {tela === "leadform" && (
        <TelaLeadForm
          draft={leadDraft}
          whatsError={whatsError}
          enviando={enviando}
          onWhatsBlur={(draft) => {
            setLeadDraft(draft)
            enviarLeadParcial(draft)
          }}
          onSubmit={handleLeadFormSubmit}
        />
      )}

      {tela === "thanks" && <TelaAgradecimento draft={leadDraft} />}
    </div>
  )
}

/* ============================================================
   TELA: HERO
============================================================ */
function TelaHero({ onIniciar }: { onIniciar: () => void }) {
  return (
    <section className="pt-10 pb-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 border-2 border-primary/20 text-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          Diagnóstico gratuito · leva menos de 2 minutos
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance mb-6">
          Seu pet shop poderia estar faturando mais?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 text-pretty">
          Responda algumas perguntas rápidas e descubra quanto seu pet shop pode ganhar a mais
          organizando clientes, agenda, vendas e relacionamento com o Bitzy.
        </p>
        <Button
          size="lg"
          onClick={onIniciar}
          className="rounded-full text-lg px-10 py-7 shadow-lg hover:scale-105 transition-transform"
        >
          Calcular meu potencial →
        </Button>
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {["CRM inteligente", "Agenda", "Estoque", "Cashback", "Cupons", "App para tutores"].map(
            (item) => (
              <span
                key={item}
                className="text-sm text-muted-foreground bg-card border border-border rounded-full px-4 py-1.5"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   TELA: PRÉ-CAPTURA (antes do quiz)
============================================================ */
function TelaPrecaptura({
  draft,
  whatsError,
  enviando,
  onSubmit,
}: {
  draft: LeadDraft
  whatsError: boolean
  enviando: boolean
  onSubmit: (draft: LeadDraft) => void
}) {
  const [local, setLocal] = useState(draft)

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Antes de começar, quem é você?</h2>
          <p className="text-sm text-muted-foreground">
            Assim já deixamos seu diagnóstico pronto para envio no final.
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(local)
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="pre-nome">Nome</Label>
            <Input
              id="pre-nome"
              required
              placeholder="Seu nome"
              value={local.nome}
              onChange={(e) => setLocal((l) => ({ ...l, nome: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pre-petshop">Nome do pet shop</Label>
            <Input
              id="pre-petshop"
              required
              placeholder="Nome do seu pet shop"
              value={local.nomePetshop}
              onChange={(e) => setLocal((l) => ({ ...l, nomePetshop: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pre-whats">WhatsApp</Label>
            <Input
              id="pre-whats"
              required
              type="tel"
              placeholder="(00) 00000-0000"
              value={local.whatsapp}
              onChange={(e) =>
                setLocal((l) => ({ ...l, whatsapp: formatarTelefone(e.target.value) }))
              }
            />
            {whatsError && (
              <p className="text-xs text-destructive">Confira o número, ele parece incompleto.</p>
            )}
          </div>
          <Button type="submit" disabled={enviando} className="w-full rounded-full py-6 text-base">
            {enviando ? "Enviando…" : "Começar diagnóstico →"}
          </Button>
          <p className="text-xs text-center text-muted-foreground pt-1">
            Leva menos de 2 minutos. Seus dados ficam salvos mesmo se você sair no meio.
          </p>
        </form>
      </div>
    </section>
  )
}

/* ============================================================
   TELA: QUIZ (perguntas)
============================================================ */
function TelaQuiz({
  etapaId,
  etapaIndex,
  totalEtapas,
  respostas,
  onResponder,
  onAvancar,
  onVoltar,
}: {
  etapaId: EtapaId
  etapaIndex: number
  totalEtapas: number
  respostas: RespostasDiagnostico
  onResponder: (id: EtapaId, valor: string | string[] | null) => void
  onAvancar: () => void
  onVoltar?: () => void
}) {
  const pergunta = PERGUNTAS[etapaId]
  const atual = respostas[etapaId as keyof RespostasDiagnostico]
  const isMulti = pergunta.type === "multi"
  const isCustom = pergunta.type === "single_custom"
  const percentual = ((etapaIndex + 1) / totalEtapas) * 100

  const precisaBotaoContinuar = isMulti || isCustom
  const podeContinuar = isMulti
    ? Array.isArray(atual) && atual.length > 0
    : isCustom
      ? Boolean(atual || respostas.faturamentoCustom)
      : true

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Diagnóstico do seu pet shop
            </span>
            <span className="text-xs font-semibold text-primary">
              Etapa {etapaIndex + 1} de {totalEtapas}
            </span>
          </div>
          <div className="relative">
            <Progress value={percentual} className="h-2" />
            <PawPrint
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-primary transition-all"
              style={{ left: `calc(${percentual}% - 8px)` }}
              fill="currentColor"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-center text-balance mb-1">
            {pergunta.title}
          </h2>
          {pergunta.subtitle && (
            <p className="text-sm text-center text-muted-foreground mb-4">{pergunta.subtitle}</p>
          )}

          <div className="flex flex-col gap-2.5 mt-5 mb-4">
            {pergunta.options.map((opt) => {
              const selecionado = isMulti
                ? Array.isArray(atual) && atual.includes(opt.value)
                : atual === opt.value

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    if (isMulti) {
                      const arr = Array.isArray(atual) ? [...atual] : []
                      const i = arr.indexOf(opt.value)
                      if (i >= 0) arr.splice(i, 1)
                      else arr.push(opt.value)
                      onResponder(etapaId, arr)
                    } else if (isCustom) {
                      onResponder(etapaId, opt.value)
                      onResponder("faturamentoCustom" as EtapaId, "")
                    } else {
                      onResponder(etapaId, opt.value)
                      onAvancar()
                    }
                  }}
                  className={`flex items-center gap-3 w-full text-left rounded-2xl border-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                    selecionado
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <span className="text-lg shrink-0">{opt.emoji}</span>
                  <span>{opt.label}</span>
                  {selecionado && <Check className="w-4 h-4 ml-auto shrink-0" />}
                </button>
              )
            })}
          </div>

          {isCustom && (
            <div className="mb-4">
              <Label htmlFor="faturamento-custom" className="text-xs uppercase tracking-wide">
                ou digite um valor aproximado (R$)
              </Label>
              <Input
                id="faturamento-custom"
                inputMode="numeric"
                placeholder="Ex: 75000"
                className="mt-1.5"
                value={respostas.faturamentoCustom || ""}
                onChange={(e) => {
                  onResponder("faturamentoCustom" as EtapaId, e.target.value)
                  if (e.target.value) onResponder(etapaId, null)
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            {onVoltar ? (
              <button
                type="button"
                onClick={onVoltar}
                className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
            ) : (
              <span />
            )}
            {precisaBotaoContinuar && (
              <Button onClick={onAvancar} disabled={!podeContinuar} className="rounded-full px-6">
                Continuar
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   TELA: RESULTADO
============================================================ */
function TelaResultado({
  respostas,
  estimativa,
  onQuerofalar,
}: {
  respostas: RespostasDiagnostico
  estimativa: { mensal: number; anual: number }
  onQuerofalar: () => void
}) {
  const precoMensalLabel = PRECO_MENSAL.toFixed(2).replace(".", ",")
  const precoDia = (PRECO_MENSAL / 30).toFixed(2).replace(".", ",")

  const oportunidades = [
    {
      icon: "🔁",
      title: "+ Clientes que voltam",
      text:
        respostas.clientesPerdidos === "nao" || respostas.clientesPerdidos === "mais_ou_menos"
          ? "Hoje você não sabe quem sumiu — CRM e lembretes automáticos recuperam esses clientes."
          : "CRM e lembretes automáticos para recuperar clientes que não compram há algum tempo.",
    },
    {
      icon: "📅",
      title: "+ Agendamentos",
      text:
        respostas.agenda && respostas.agenda !== "sistema"
          ? "Sua agenda hoje é manual — organizar banho, tosa e vacinas num só lugar evita furos e no-shows."
          : "Organização da agenda de banho, tosa e vacinas em um só lugar.",
    },
    {
      icon: "🎁",
      title: "+ Fidelização",
      text:
        respostas.fidelizacao === "nao" || respostas.fidelizacao === "tentou_nao_funcionou"
          ? "Sem programa de fidelidade hoje — cashback e cupons dão um motivo concreto para o cliente voltar."
          : "Cashback e cupons para estimular novas compras.",
    },
    {
      icon: "📊",
      title: "+ Mais controle",
      text: "Estoque, vendas e relacionamento com clientes centralizados em um só sistema.",
    },
  ]

  const funcionalidades = [
    { icon: "🧠", title: "CRM Inteligente", text: "Saiba quem são seus clientes e quem está sumido." },
    { icon: "📅", title: "Agenda", text: "Organize banho, tosa, vacinas e outros serviços." },
    { icon: "📦", title: "Estoque", text: "Controle produtos e evite perder vendas por falta de estoque." },
    { icon: "💸", title: "Cashback", text: "Transforme uma compra em motivo para o cliente voltar." },
    { icon: "🎟️", title: "Cupons", text: "Crie campanhas para estimular novas compras." },
    { icon: "🔔", title: "Lembretes", text: "O Bitzy ajuda você a lembrar o cliente de voltar." },
    { icon: "📱", title: "App para tutores", text: "Seus clientes acompanham o pet e se relacionam com sua loja." },
    { icon: "🛒", title: "Vendas", text: "Mais controle sobre suas vendas e sua operação." },
  ]

  return (
    <>
      <section className="px-4 pt-4 pb-14">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-foreground/80 mb-3">
            Diagnóstico concluído
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            🚀 Seu pet shop tem potencial para crescer
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Com base nas informações que você forneceu, identificamos oportunidades para aumentar
            seu faturamento.
          </p>

          <div className="max-w-md mx-auto bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl shadow-2xl p-8 mb-12">
            <p className="text-xs uppercase tracking-wide opacity-80 mb-3">
              Potencial estimado de faturamento adicional
            </p>
            <p className="font-heading text-4xl md:text-5xl font-bold text-accent">
              +R$ {formatarMoeda(estimativa.mensal)}
              <span className="text-base font-sans font-medium opacity-80">/mês</span>
            </p>
            <p className="text-sm opacity-80 mt-2">
              +R$ {formatarMoeda(estimativa.anual)} por ano
            </p>
            <p className="text-xs opacity-60 mt-5 pt-4 border-t border-primary-foreground/20">
              Estimativa ilustrativa baseada nas informações fornecidas — não é uma promessa de
              resultado.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {oportunidades.map((o) => (
              <div key={o.title} className="bg-card border border-border rounded-2xl p-5 text-left">
                <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-lg mb-3">
                  {o.icon}
                </div>
                <p className="font-bold text-sm mb-1">{o.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 bg-muted/40">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-lg mx-auto mb-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
              O que o Bitzy faz
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-balance">
              Tudo o que seu pet shop precisa, num só lugar
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {funcionalidades.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary hover:-translate-y-0.5 transition-all"
              >
                <div className="text-xl mb-2.5">{f.icon}</div>
                <p className="font-bold text-sm mb-1">{f.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-foreground text-background rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Quanto custa o Bitzy?</h3>
              <p className="text-background/70 text-sm">
                Por menos que uma pizza por dia, seu pet shop tem acesso a tudo isso:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-2.5">
                {[
                  "CRM inteligente",
                  "Agenda de banho e tosa",
                  "Agenda de vacinas",
                  "Controle de estoque",
                  "Controle de vendas",
                  "Cashback",
                  "Cupons de desconto",
                  "Lembretes automáticos",
                  "Aplicativo para seus clientes",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-background/90">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <div className="bg-background/10 border border-background/15 rounded-2xl p-7 text-center">
                <p className="font-heading text-4xl font-bold">
                  R$ {precoMensalLabel}
                  <span className="text-sm font-sans font-normal text-background/70">/mês</span>
                </p>
                <p className="text-xs text-accent mt-2 mb-5">
                  ≈ R$ {precoDia}/dia — menos que uma pizza
                </p>
                <div className="flex items-center justify-between text-xs text-background/70 pt-4 border-t border-background/15">
                  <span>Investimento no Bitzy</span>
                  <strong className="text-accent">R$ {precoMensalLabel}/mês</strong>
                </div>
                <div className="flex items-center justify-between text-xs text-background/70 mt-2">
                  <span>Potencial estimado</span>
                  <strong className="text-accent">+R$ {formatarMoeda(estimativa.mensal)}/mês</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center">
        <div className="container mx-auto max-w-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-balance">
            Pronto para parar de perder clientes sem perceber?
          </h3>
          <p className="text-muted-foreground mb-8">
            Fale com a equipe do Bitzy e veja como aplicar isso no seu pet shop.
          </p>
          <Button
            size="lg"
            onClick={onQuerofalar}
            className="rounded-full text-lg px-10 py-7 bg-green-600 hover:bg-green-700 text-white shadow-lg"
          >
            Quero falar com o Bitzy →
          </Button>
        </div>
      </section>
    </>
  )
}

/* ============================================================
   TELA: FORMULÁRIO FINAL (lead completo)
============================================================ */
function TelaLeadForm({
  draft,
  whatsError,
  enviando,
  onWhatsBlur,
  onSubmit,
}: {
  draft: LeadDraft
  whatsError: boolean
  enviando: boolean
  onWhatsBlur: (draft: LeadDraft) => void
  onSubmit: (draft: LeadDraft) => void
}) {
  const [local, setLocal] = useState(draft)

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Vamos preparar seu diagnóstico completo</h2>
          <p className="text-sm text-muted-foreground">
            Deixe seus dados e nossa equipe te chama pelo WhatsApp.
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(local)
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="lead-nome">Nome</Label>
            <Input
              id="lead-nome"
              required
              placeholder="Seu nome"
              value={local.nome}
              onChange={(e) => setLocal((l) => ({ ...l, nome: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lead-petshop">Nome do pet shop</Label>
            <Input
              id="lead-petshop"
              required
              placeholder="Nome do seu pet shop"
              value={local.nomePetshop}
              onChange={(e) => setLocal((l) => ({ ...l, nomePetshop: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lead-whats">WhatsApp</Label>
            <Input
              id="lead-whats"
              required
              type="tel"
              placeholder="(00) 00000-0000"
              value={local.whatsapp}
              onChange={(e) =>
                setLocal((l) => ({ ...l, whatsapp: formatarTelefone(e.target.value) }))
              }
              onBlur={() => onWhatsBlur(local)}
            />
            {whatsError && (
              <p className="text-xs text-destructive">Confira o número, ele parece incompleto.</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lead-email">E-mail</Label>
            <Input
              id="lead-email"
              type="email"
              required
              placeholder="voce@petshop.com"
              value={local.email}
              onChange={(e) => setLocal((l) => ({ ...l, email: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lead-cidade">Cidade/Estado</Label>
            <Input
              id="lead-cidade"
              required
              placeholder="Ex: Campinas/SP"
              value={local.cidadeEstado}
              onChange={(e) => setLocal((l) => ({ ...l, cidadeEstado: e.target.value }))}
            />
          </div>
          <Button
            type="submit"
            disabled={enviando}
            className="w-full rounded-full py-6 text-base bg-green-600 hover:bg-green-700 text-white"
          >
            {enviando ? "Enviando…" : "Quero falar com o Bitzy"}
          </Button>
          <p className="text-xs text-center text-muted-foreground pt-1">
            Ao enviar, você concorda em ser contatado por WhatsApp e e-mail.
          </p>
        </form>
      </div>
    </section>
  )
}

/* ============================================================
   TELA: AGRADECIMENTO
============================================================ */
function TelaAgradecimento({ draft }: { draft: LeadDraft }) {
  const mensagem = `Olá, sou ${draft.nome || ""}, da ${draft.nomePetshop || ""}. Fiz o diagnóstico do Bitzy e gostaria de entender como posso aumentar o faturamento do meu pet shop.`

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md">
        <div className="w-16 h-16 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Recebemos seu diagnóstico!</h2>
        <p className="text-muted-foreground mb-8">
          Clique abaixo para continuar a conversa diretamente no WhatsApp com a equipe do Bitzy.
        </p>
        <a
          href={linkWhatsapp(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-4 font-bold shadow-lg transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> Continuar no WhatsApp
        </a>
        <div className="mt-8 pt-6 border-t border-border">
          <a
            href="/"
            className="text-sm font-semibold text-muted-foreground hover:text-primary underline underline-offset-4"
          >
            Conhecer mais sobre o Bitzy →
          </a>
        </div>
      </div>
    </section>
  )
}