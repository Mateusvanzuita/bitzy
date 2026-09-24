"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { COOKIE_NOME, senhaCorreta, tokenSessao } from "@/lib/admin-auth"

export async function entrar(formData: FormData) {
  const senha = String(formData.get("senha") ?? "")

  if (!senhaCorreta(senha)) {
    await new Promise((r) => setTimeout(r, 1000)) // atrasa tentativas por força bruta
    redirect("/admin/qr?erro=1")
  }

  ;(await cookies()).set(COOKIE_NOME, tokenSessao(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })
  redirect("/admin/qr")
}

export async function sair() {
  ;(await cookies()).set(COOKIE_NOME, "", { path: "/admin", maxAge: 0 })
  redirect("/admin/qr")
}