"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.replace("#", "")

    const scroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        return true
      }
      return false
    }

    // Tenta imediatamente; se o elemento ainda não existir, tenta após hydration
    if (!scroll()) {
      const timer = setTimeout(scroll, 300)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}