"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Star, Crown, Zap, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const CUPONS_VALIDOS = ["FUNDADOR50A", "FUNDADOR50B", "FUNDADOR50C", "FUNDADOR50D"]

const planos = [
  {
    id: "mensal",
    icon: Zap,
    label: "Mensal",
    preco: "R$99",
    periodo: "/mês",
    descricao: "Flexibilidade total, cancele quando quiser.",
    destaque: false,
    cor: "border-border/50 hover:border-primary/40",
    corIcone: "bg-primary/10 text-primary",
    badge: null,
  },
  {
    id: "trimestral",
    icon: Star,
    label: "Trimestral",
    preco: "R$79",
    periodo: "/mês",
    descricao: "Fechando 3 meses. Economize R$60.",
    destaque: false,
    cor: "border-border/50 hover:border-secondary/40",
    corIcone: "bg-secondary/10 text-secondary",
    badge: null,
  },
  {
    id: "semestral",
    icon: Star,
    label: "Semestral",
    preco: "R$69",
    periodo: "/mês",
    descricao: "Fechando 6 meses. Economize R$180.",
    destaque: true,
    cor: "border-primary/60 ring-2 ring-primary/20",
    corIcone: "bg-primary/10 text-primary",
    badge: "Mais popular",
  },
  {
    id: "fundador",
    icon: Crown,
    label: "Clube Fundadores",
    preco: "R$49,99",
    periodo: "/mês",
    descricao: "Por 6 meses. Apenas com cupom exclusivo. Limite de 20 pet shops por região.",
    destaque: false,
    cor: "border-amber-400/60 hover:border-amber-400/80",
    corIcone: "bg-amber-100 text-amber-600",
    badge: "Convite exclusivo",
  },
]

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
  "SP","SE","TO",
]

type Etapa = "planos" | "formulario" | "sucesso"

interface FormData {
  // Básico
  nome: string
  descricao: string
  localizacao: string
  endereco: string
  cidade: string
  estado: string
  // Contato
  telefone: string
  whatsapp: string
  instagram: string
  website: string
  // Configurações
  descontoFavorito: string
  limiteCupons: string
}

const formInicial: FormData = {
  nome: "",
  descricao: "",
  localizacao: "",
  endereco: "",
  cidade: "",
  estado: "",
  telefone: "",
  whatsapp: "",
  instagram: "",
  website: "",
  descontoFavorito: "",
  limiteCupons: "",
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-foreground">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-border/50 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
      />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-primary border-b border-border/40 pb-2 mt-2">
      {children}
    </p>
  )
}

export default function CadastroClube() {
  const [etapa, setEtapa] = useState<Etapa>("planos")
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null)
  const [cupom, setCupom] = useState("")
  const [cupomErro, setCupomErro] = useState("")
  const [form, setForm] = useState<FormData>(formInicial)
  const [formErro, setFormErro] = useState("")
  const [enviando, setEnviando] = useState(false)

  function selecionarPlano(id: string) {
    setPlanoSelecionado(id)
    setCupom("")
    setCupomErro("")
  }

  function avancarParaFormulario() {
    if (!planoSelecionado) return
    if (planoSelecionado === "fundador") {
      const c = cupom.toUpperCase().trim()
      if (!CUPONS_VALIDOS.includes(c)) {
        setCupomErro("Cupom inválido. Verifique e tente novamente.")
        return
      }
    }
    setCupomErro("")
    setEtapa("formulario")
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function formatarTelefone(value: string) {
    const nums = value.replace(/\D/g, "").slice(0, 11)
    if (nums.length <= 2) return `(${nums}`
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`
    if (nums.length <= 10) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`
  }

  async function handleSubmit() {
    const { nome, endereco, cidade, estado } = form
    if (!nome || !endereco || !cidade || !estado) {
      setFormErro("Preencha todos os campos obrigatórios (marcados com *).")
      return
    }
    const desconto = Number(form.descontoFavorito)
    if (form.descontoFavorito && (isNaN(desconto) || desconto < 5)) {
      setFormErro("O desconto favorito deve ser de no mínimo 5%.")
      return
    }
    setFormErro("")
    setEnviando(true)
    try {
      const res = await fetch("/api/cadastro-clube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          plano: planoSelecionado,
          cupom: planoSelecionado === "fundador" ? cupom.toUpperCase().trim() : "",
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setFormErro(data.error || "Erro ao enviar. Tente novamente.")
        return
      }
      setEtapa("sucesso")
    } catch {
      setFormErro("Erro de conexão. Tente novamente.")
    } finally {
      setEnviando(false)
    }
  }

  const planoAtual = planos.find((p) => p.id === planoSelecionado)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* Voltar */}
        <Link href="/#clube-bitzy" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar ao site
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 inline-block">🐾</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Cadastre seu Pet Shop no Clube Bitzy
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Escolha o plano ideal e comece a fidelizar seus clientes ainda esta semana.
          </p>
        </div>

        {/* ETAPA 1 — Planos */}
        {etapa === "planos" && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {planos.map((plano) => {
                const Icon = plano.icon
                const selecionado = planoSelecionado === plano.id
                return (
                  <button
                    key={plano.id}
                    onClick={() => selecionarPlano(plano.id)}
                    className={`text-left rounded-[1.5rem] border-2 p-6 transition-all duration-200 relative bg-card shadow-sm ${plano.cor} ${
                      selecionado ? "ring-2 ring-primary ring-offset-2 border-primary" : ""
                    } ${plano.id === "fundador" ? "sm:col-span-2" : ""}`}
                  >
                    {plano.badge && (
                      <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                        plano.id === "fundador"
                          ? "bg-amber-100 text-amber-700 border border-amber-300"
                          : "bg-primary/10 text-primary border border-primary/20"
                      }`}>
                        {plano.badge}
                      </span>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${plano.corIcone}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1 flex-wrap">
                          <span className="text-2xl font-bold">{plano.preco}</span>
                          <span className="text-muted-foreground text-sm">{plano.periodo}</span>
                        </div>
                        <p className="font-semibold text-foreground mt-0.5">{plano.label}</p>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{plano.descricao}</p>
                      </div>
                      {selecionado && (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Cupom — só Fundador */}
            {planoSelecionado === "fundador" && (
              <div className="max-w-md mx-auto space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Digite seu cupom exclusivo
                </label>
                <input
                  type="text"
                  value={cupom}
                  onChange={(e) => { setCupom(e.target.value.toUpperCase()); setCupomErro("") }}
                  placeholder="Ex: FUNDADOR50A"
                  className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-mono tracking-widest bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    cupomErro ? "border-red-400" : "border-border/50 focus:border-primary/50"
                  }`}
                />
                {cupomErro && <p className="text-red-500 text-sm">{cupomErro}</p>}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                size="lg"
                disabled={!planoSelecionado}
                onClick={avancarParaFormulario}
                className="rounded-full px-10 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Continuar com {planoAtual ? planoAtual.label : "plano selecionado"} →
              </Button>
            </div>
          </div>
        )}

        {/* ETAPA 2 — Formulário */}
        {etapa === "formulario" && (
          <div className="max-w-2xl mx-auto space-y-6">

            {/* Resumo do plano */}
            <Card className="rounded-2xl p-5 border-2 border-primary/20 bg-primary/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                {planoAtual && <planoAtual.icon className="w-5 h-5 text-primary" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{planoAtual?.label}</p>
                <p className="text-muted-foreground text-sm">{planoAtual?.preco}{planoAtual?.periodo} · {planoAtual?.descricao}</p>
              </div>
              <button onClick={() => setEtapa("planos")} className="text-xs text-primary hover:underline font-medium flex-shrink-0">
                Alterar
              </button>
            </Card>

            <Card className="rounded-2xl border-2 border-border/50 p-8 space-y-6 bg-card">

              {/* Informações Básicas */}
              <SectionTitle>Informações Básicas</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <InputField label="Nome do Pet Shop" name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Pet Shop da Maria" required />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Descrição</label>
                  <textarea
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                    placeholder="Fale um pouco sobre seu pet shop..."
                    rows={3}
                    className="w-full rounded-xl border-2 border-border/50 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField label="Localização (bairro/referência)" name="localizacao" value={form.localizacao} onChange={handleChange} placeholder="Ex: Centro, próximo ao parque" />
                </div>
                <div className="sm:col-span-2">
                  <InputField label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número" required />
                </div>
                <InputField label="Cidade" name="cidade" value={form.cidade} onChange={handleChange} placeholder="Ex: São Paulo" required />
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    Estado<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-border/50 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                  >
                    <option value="">Selecione</option>
                    {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
              </div>

              {/* Contato */}
              <SectionTitle>Contato</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Telefone</label>
                  <input
                    type="text"
                    name="telefone"
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: formatarTelefone(e.target.value) })}
                    placeholder="(00) 0000-0000"
                    className="w-full rounded-xl border-2 border-border/50 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">WhatsApp</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: formatarTelefone(e.target.value) })}
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-xl border-2 border-border/50 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Instagram</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                    <input
                      type="text"
                      name="instagram"
                      value={form.instagram}
                      onChange={handleChange}
                      placeholder="seupetshop"
                      className="w-full rounded-xl border-2 border-border/50 pl-8 pr-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
                <InputField label="Website" name="website" value={form.website} onChange={handleChange} placeholder="www.seupetshop.com.br" />
              </div>

              {/* Configurações */}
              <SectionTitle>Configurações</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">
                    Desconto Favorito (%) <span className="text-muted-foreground font-normal">mín. 5%</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="descontoFavorito"
                      value={form.descontoFavorito}
                      onChange={handleChange}
                      min={5}
                      max={100}
                      placeholder="Ex: 10"
                      className="w-full rounded-xl border-2 border-border/50 px-4 py-3 pr-10 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">Limite de Cupons Ativos</label>
                  <input
                    type="number"
                    name="limiteCupons"
                    value={form.limiteCupons}
                    onChange={handleChange}
                    min={1}
                    placeholder="Ex: 50"
                    className="w-full rounded-xl border-2 border-border/50 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

            </Card>

            {formErro && <p className="text-red-500 text-sm text-center">{formErro}</p>}

            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={enviando}
              className="w-full rounded-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
            >
              {enviando
                ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Enviando...</>
                : "Finalizar cadastro 🚀"
              }
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Sem taxa de adesão · Cancele quando quiser · Seus dados são usados apenas para o cadastro
            </p>
          </div>
        )}

        {/* ETAPA 3 — Sucesso */}
        {etapa === "sucesso" && (
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-[2.5rem] p-12 overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <span className="text-6xl inline-block animate-bounce">🎉</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
                  PARABÉNS, BEM VINDO AO CLUBE BITZY!
                </h2>
                <p className="text-primary-foreground/90 text-lg leading-relaxed">
                  Entraremos em contato para cadastrar seus cupons em <strong>1 dia útil</strong>.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                  <span className="text-primary-foreground font-semibold text-sm">Cadastro recebido com sucesso</span>
                </div>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-5 font-semibold hover:scale-105 transition-all">
                Voltar ao site
              </Button>
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}