import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const COOKIE_NOME = "qr_admin"

function assinar(valor: string) {
  return createHmac("sha256", process.env.ADMIN_PASSWORD ?? "").update(valor).digest("hex")
}

// Valor guardado no cookie. Trocar ADMIN_PASSWORD invalida todas as sessões.
export function tokenSessao() {
  return assinar("qr-admin-v1")
}

export function senhaCorreta(tentativa: string) {
  const senha = process.env.ADMIN_PASSWORD
  if (!senha) return false
  return timingSafeEqual(Buffer.from(assinar(tentativa)), Buffer.from(assinar(senha)))
}

export async function estaAutenticado() {
  if (!process.env.ADMIN_PASSWORD) return false
  const valor = (await cookies()).get(COOKIE_NOME)?.value
  if (!valor) return false
  const a = Buffer.from(valor)
  const b = Buffer.from(tokenSessao())
  return a.length === b.length && timingSafeEqual(a, b)
}