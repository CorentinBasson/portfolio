"use client"

import { useEffect } from "react"

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = "/admin/index.html"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirection vers l&apos;interface d&apos;administration...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Si la redirection ne fonctionne pas, <a href="/admin/index.html" className="text-primary underline">cliquez ici</a>
        </p>
      </div>
    </div>
  )
}


