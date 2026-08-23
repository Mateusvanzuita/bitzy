"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buscarPlanoPorSlugCRM, registrarCheckoutCRM, type PlanoCRM } from "@/lib/crm-api"

interface CrmCheckoutDialogProps {
  children: ReactNode
  /** Slug do plano a assinar — precisa bater com o mesmo slug usado no card de preço da página. */
  slug?: string
}

export function CrmCheckoutDialog({ children, slug = "bitzy" }: CrmCheckoutDialogProps) {
  const [aberto, setAberto] = useState(false)
  const [plano, setPlano] = useState<PlanoCRM | null>(null)
  const [carregandoPlano, setCarregandoPlano] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const [petshopNome, setPetshopNome] = useState("")
  const [donoNome, setDonoNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [cpfCnpj, setCpfCnpj] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")

  useEffect(() => {
    if (aberto && !plano) {
      setCarregandoPlano(true)
      buscarPlanoPorSlugCRM(slug)
        .then(setPlano)
        .catch(() => setErro("Não foi possível carregar o plano. Tente novamente em instantes."))
        .finally(() => setCarregandoPlano(false))
    }
  }, [aberto, plano, slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!plano) return
    setErro(null)
    setEnviando(true)
    try {
      const resultado = await registrarCheckoutCRM({
        petshopNome,
        donoNome,
        email,
        senha,
        cpfCnpj: cpfCnpj.replace(/\D/g, ""),
        cidade: cidade || undefined,
        estado: estado || undefined,
        planoId: plano.id,
        metodoPagamento: "CREDIT_CARD",
      })
      window.location.href = resultado.checkoutUrl
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.")
      setEnviando(false)
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assinar o Bitzy CRM</DialogTitle>
          <DialogDescription>
            {plano
              ? `Plano ${plano.nome} — R$${Number(plano.precoMensal).toFixed(2).replace(".", ",")}/mês. Sem fidelidade.`
              : "Carregando informações do plano…"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="petshopNome">Nome do pet shop</Label>
            <Input id="petshopNome" required value={petshopNome} onChange={(e) => setPetshopNome(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="donoNome">Seu nome</Label>
            <Input id="donoNome" required value={donoNome} onChange={(e) => setDonoNome(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="senha">Crie uma senha</Label>
            <Input
              id="senha"
              type="password"
              required
              minLength={8}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cpfCnpj">CPF ou CNPJ</Label>
            <Input
              id="cpfCnpj"
              required
              placeholder="Só números"
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="estado">Estado</Label>
              <Input id="estado" maxLength={2} value={estado} onChange={(e) => setEstado(e.target.value.toUpperCase())} />
            </div>
          </div>

          {erro && <p className="text-sm text-destructive">{erro}</p>}

          <DialogFooter>
            <Button
              type="submit"
              className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white"
              disabled={enviando || carregandoPlano || !plano}
            >
              {enviando ? "Redirecionando…" : "Ir para pagamento"}
            </Button>
          </DialogFooter>
          <p className="text-center text-xs text-muted-foreground">
            Pagamento via cartão de crédito. Sua conta é criada automaticamente assim que o pagamento for confirmado — você recebe o acesso por e-mail.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}