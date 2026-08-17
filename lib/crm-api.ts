const API_URL = process.env.NEXT_PUBLIC_CRM_API_URL ?? "http://localhost:3333/api/v1"

export interface PlanoCRM {
  id: string
  nome: string
  descricao: string
  precoMensal: string // Decimal do Prisma chega como string
  precoAnual: string
}

export async function listarPlanosCRM(): Promise<PlanoCRM[]> {
  const res = await fetch(`${API_URL}/billing/planos`, { cache: "no-store" })
  if (!res.ok) throw new Error("Não foi possível carregar os planos.")
  return res.json()
}

export type MetodoPagamentoCRM = "PIX" | "CREDIT_CARD"

export interface RegistrarCheckoutInput {
  petshopNome: string
  cidade?: string
  estado?: string
  donoNome: string
  email: string
  senha: string
  planoId: string
  cpfCnpj: string
  metodoPagamento: MetodoPagamentoCRM
}

export interface RegistrarCheckoutResponse {
  petshopId: string
  assinaturaId: string
  checkoutUrl: string
}

export async function registrarCheckoutCRM(input: RegistrarCheckoutInput): Promise<RegistrarCheckoutResponse> {
  const res = await fetch(`${API_URL}/billing/registrar-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const erro = await res.json().catch(() => null)
    throw new Error(erro?.message ?? "Não foi possível processar sua assinatura. Tente novamente.")
  }
  return res.json()
}