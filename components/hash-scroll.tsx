"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.replace("#", "")

    function rolar(elemento: HTMLElement) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const existente = document.getElementById(id)
    if (existente) {
      rolar(existente)
      return
    }

    // Elemento ainda não existe no DOM (streaming/hydration em andamento) —
    // observa mudanças até ele aparecer, em vez de arriscar um timeout fixo.
    const observer = new MutationObserver(() => {
      const elemento = document.getElementById(id)
      if (elemento) {
        rolar(elemento)
        observer.disconnect()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Failsafe: para de observar depois de um tempo, mesmo se não achar nada.
    const timeout = setTimeout(() => observer.disconnect(), 3000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [pathname])

  return null
}