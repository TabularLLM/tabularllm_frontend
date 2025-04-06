import React from "react"

export default async function InsightLayout({ children }: { children: React.ReactNode }) {
    
    return (
      <main className="flex flex-1">
        {children}
      </main> 
    )
  }